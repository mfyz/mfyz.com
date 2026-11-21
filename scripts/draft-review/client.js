import { mountWidgets, restoreRange, widgetRect } from "./widgets.js";

function rememberScroll(content, token, round, status) {
  const key = `draft-review-scroll:${token}`;
  const headings = () => [...content.querySelectorAll("h2, h3, h4, h5, h6")];
  const blocks = () => [...content.children].filter(element => element.getClientRects().length);
  const viewportOffset = () => window.visualViewport?.offsetTop ?? 0;
  const blockKey = element => {
    const media = element.matches("iframe[src], img[src]") ? element : element.querySelector(":scope > img[src]");
    const label = media?.getAttribute("src") || element.textContent.trim().slice(0, 96);
    return label ? `${element.localName}:${label}` : null;
  };
  let checkpoint;
  let pinned = false;
  let keepCheckpoint = false;
  let restoring = false;

  function capture() {
    const visibleTop = viewportOffset();
    const heading = headings().findLast(element =>
      element.getClientRects().length && element.getBoundingClientRect().top <= visibleTop
    );
    const block = blocks().find(element => {
      const rect = element.getBoundingClientRect();
      return rect.bottom > visibleTop && rect.top < visibleTop + 80;
    });
    const anchor = block && blockKey(block);
    return {
      top: window.scrollY + visibleTop,
      heading: heading?.textContent.trim(),
      offset: heading ? visibleTop - heading.getBoundingClientRect().top : 0,
      ...(anchor && { block: anchor, blockOffset: visibleTop - block.getBoundingClientRect().top }),
    };
  }

  function save(position) {
    checkpoint = position;
    try {
      sessionStorage.setItem(key, JSON.stringify({ ...position, round, pinned }));
    } catch {
      // Scroll restoration is optional when browser storage is unavailable.
    }
  }

  function syncHistory(top) {
    const state = history.state;
    if (Number.isFinite(state?.scrollY) && state.scrollY !== top) {
      // Astro reads these coordinates while setting up its navigation router.
      history.replaceState({ ...state, scrollY: top }, "");
    }
  }

  function saveForReload() {
    if (!pinned && !keepCheckpoint && !restoring) save(capture());
    if (checkpoint) syncHistory(Math.max(0, checkpoint.top - viewportOffset()));
  }

  function restore(saved) {
    let frame;
    const events = new AbortController();
    const observer = new ResizeObserver(scheduleRestore);
    restoring = true;
    history.scrollRestoration = "manual";

    function scheduleRestore() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = undefined;
        const matches = saved.block ? blocks().filter(element => blockKey(element) === saved.block) : [];
        const heading = saved.heading &&
          headings().find(element => element.textContent.trim() === saved.heading);
        let visibleTop = saved.top;
        if (matches.length === 1) {
          visibleTop = window.scrollY + matches[0].getBoundingClientRect().top + saved.blockOffset;
        } else if (heading) {
          const anchoredTop = window.scrollY + heading.getBoundingClientRect().top + saved.offset;
          if (Math.abs(anchoredTop - saved.top) <= window.innerHeight / 2) visibleTop = anchoredTop;
        }
        const top = Math.max(0, visibleTop - viewportOffset());
        syncHistory(top);
        if (Math.abs(window.scrollY - top) > 1) window.scrollTo({ top, behavior: "instant" });
      });
    }

    function stop() {
      restoring = false;
      events.abort();
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    }

    const interaction = new AbortController();
    const release = () => {
      keepCheckpoint = false;
      interaction.abort();
      stop();
    };
    for (const type of ["wheel", "touchstart", "pointerdown", "keydown"]) {
      window.addEventListener(type, release, { signal: interaction.signal, passive: true, capture: true });
    }
    for (const type of ["load", "scroll", "resize"]) {
      window.addEventListener(type, scheduleRestore, { signal: events.signal, passive: true });
    }
    for (const type of ["scroll", "resize"]) {
      window.visualViewport?.addEventListener(type, scheduleRestore, { signal: events.signal, passive: true });
    }
    observer.observe(content);
    observer.observe(document.body);
    scheduleRestore();
    setTimeout(stop, 2500);
  }

  try {
    const saved = JSON.parse(sessionStorage.getItem(key));
    if (saved && Number.isFinite(saved.top)) {
      checkpoint = saved;
      pinned = status === "submitted" && saved.round === round && saved.pinned === true;
      keepCheckpoint = saved.pinned === true;
      restore(saved);
    }
  } catch {
    // Keep the browser's normal scroll behavior.
  }

  window.addEventListener("pagehide", saveForReload);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) saveForReload();
  });
  return {
    capture,
    saveForReload,
    advance(nextRound) {
      round = nextRound;
      pinned = false;
      if (!restoring) {
        keepCheckpoint = false;
        save(capture());
      }
    },
    pin(position = capture()) {
      if (pinned) return;
      pinned = true;
      save(position);
      saveForReload();
    },
    unpin() {
      pinned = false;
      keepCheckpoint = false;
    },
  };
}

export async function mountReview(content, token) {
  if (!content) return;
  const path = location.pathname.replace(/\/$/, "") || "/";
  const url = `/__draft-review?page=${encodeURIComponent(path)}`;
  const headers = { "X-Draft-Review": token };
  const getRound = () => fetch(url, { headers, cache: "no-store", signal: AbortSignal.timeout(3500) });
  let initial;
  for (const delay of [0, 500, 1500]) {
    if (delay) await new Promise(resolve => setTimeout(resolve, delay));
    try {
      initial = await getRound();
      if (initial.ok) break;
      if (initial.status === 404 && initial.headers.get("Content-Type")?.includes("application/json")) return;
    } catch {
      // Astro can restart while this page is loading.
    }
  }
  if (!initial?.ok) return;
  const { round: initialRound, status, alternatives: initialAlternatives, assetRevision } = await initial.json();
  let round = initialRound;
  let alternatives = initialAlternatives ?? [];
  const scrollMemory = rememberScroll(content, token, round, status);
  const storageKey = () => `draft-review:${token}:${round}`;

  function loadItems() {
    try {
      return JSON.parse(sessionStorage.getItem(storageKey())) ?? [];
    } catch {
      return [];
    }
  }

  let items = loadItems();

  const host = document.createElement("div");
  const ui = host.attachShadow({ mode: "open" });
  ui.innerHTML = `
    <style>
      :host { all: initial; color-scheme: light dark; }
      .bar, .selection, .changes {
        background: Canvas; color: CanvasText; border: 1px solid GrayText;
        border-radius: 12px; padding: 8px; box-shadow: 0 4px 20px #0003;
        font: 14px system-ui, sans-serif; position: fixed; z-index: 2147483646;
      }
      .bar, .selection { display: flex; align-items: center; gap: 6px; }
      .bar, .changes { left: 50%; transform: translateX(-50%); }
      .bar {
        bottom: calc(14px + env(safe-area-inset-bottom)); white-space: nowrap;
        max-width: calc(100vw - 32px);
      }
      .mobile-label { display: none; }
      @media (max-width: 600px) {
        .desktop-label { display: none; }
        .mobile-label { display: inline; }
      }
      @media (max-width: 360px) {
        .bar button { padding-inline: 5px; font-size: 12px; }
      }
      .changes {
        bottom: calc(75px + env(safe-area-inset-bottom));
        box-sizing: border-box; width: min(400px, calc(100vw - 20px));
        max-height: 45vh; overflow: auto;
      }
      .selection { z-index: 2147483647; }
      .selection form { display: grid; gap: 8px; width: min(350px, calc(100vw - 36px)); }
      [hidden] { display: none !important; }
      button, textarea { font: inherit; color: inherit; }
      button {
        background: Canvas; border: 1px solid GrayText; border-radius: 7px;
        min-height: 36px; padding: 5px 10px; cursor: pointer;
      }
      button:disabled { opacity: .5; cursor: default; }
      button.count { border-color: color-mix(in srgb, GrayText 38%, Canvas); }
      button.pick[aria-pressed=true] { background: #fff4b9; color: #252018; }
      button.primary { background: #285cc3; color: white; border-color: #285cc3; }
      button.send { background: #f59e0b; color: #241400; border-color: #d97706; }
      button.danger { background: #b4232e; color: white; border-color: #b4232e; }
      .working {
        display: flex; align-items: center; gap: 7px;
        min-height: 30px; padding-inline: 12px; font-weight: 600;
      }
      .bar[data-working="true"] {
        border: 1px solid #d97706; border-radius: 999px;
        transform: translateX(-50%) scale(1.5); transform-origin: bottom center;
      }
      .working-ring {
        position: fixed; inset: 0; z-index: 2147483645; pointer-events: none;
        padding: 4px; border-radius: 30px;
        background: conic-gradient(from var(--draft-review-angle, 0deg),
          #f59e0b, #f59e0b22 48%, #f59e0b);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        animation: review-border 1.6s linear infinite;
      }
      .spinner {
        width: 12px; height: 12px; border: 2px solid #d9770655;
        border-top-color: #d97706; border-radius: 50%;
        animation: review-spin .8s linear infinite;
      }
      @keyframes review-spin { to { transform: rotate(360deg); } }
      @keyframes review-border { to { --draft-review-angle: 360deg; } }
      @media (prefers-reduced-motion: reduce) {
        .spinner, .working-ring { animation: none; }
      }
      textarea { box-sizing: border-box; width: 100%; font-size: 16px; padding: 6px; }
      .actions { display: flex; justify-content: flex-end; gap: 6px; }
      form .actions { flex-wrap: wrap; }
      .note { padding: 8px; border-bottom: 1px solid GrayText; overflow-wrap: anywhere; }
      .note:last-child { border-bottom: 0; }
      .note blockquote, .note p { margin: 6px 0; }
      .error { padding: 8px; color: light-dark(#ad1e27, #ff9da3); }
      .outline {
        position: fixed; box-sizing: border-box; pointer-events: none; z-index: 2147483644;
        border: 2px solid #e6a007; background: #ffd96530; border-radius: 3px;
      }
      .options { max-height: min(33vh, 260px); overflow: auto; display: grid; gap: 6px; }
      .options button { text-align: left; white-space: pre-wrap; }
      .options button[aria-pressed="true"] { border-color: #8053c0; background: #e8d8ff; color: #311650; }
      .alternatives-action { border-color: #8053c0; }
      .outline[data-kind="alternatives"] { border-color: #8053c0; background: #ba8eff40; }
      .outline[data-kind="delete"] { border-color: #b4232e; background: #ff7d7d30; }
      .outline[data-kind="selection"] { border-color: #f3c751; background: #fff4b930; }
    </style>
    <section class="changes" aria-label="Review changes" hidden>
      <div class="error" role="alert" hidden></div>
      <div class="notes"></div>
    </section>
    <div class="working-ring" aria-hidden="true" hidden></div>
    <div class="bar" role="region" aria-label="Draft review">
      <button type="button" class="pick" aria-label="Pick element" aria-pressed="false" title="Pick an element inside a mockup or diagram"><span class="desktop-label" aria-hidden="true">🎯</span> <span class="pick-label desktop-label">Pick element</span><span class="mobile-label">Pick</span></button>
      <button type="button" class="count" aria-expanded="false"><span aria-hidden="true">📝</span> <span class="count-label desktop-label">0 changes</span><span class="mobile-label count-compact">0</span></button>
      <button type="button" class="send" disabled><span aria-hidden="true">📤</span> <span class="send-label">Send Feedback</span></button>
      <div class="working" role="status" hidden><span class="spinner" aria-hidden="true"></span> Agent working…</div>
    </div>
    <div class="outlines" aria-hidden="true"></div>
    <div class="selection" aria-label="Selection tools" hidden>
      <div class="actions pick-tools">
        <button type="button" class="comment" title="Enter"><span aria-hidden="true">💬</span> Comment</button>
        <button type="button" class="alternatives-action">Alternatives</button>
        <button type="button" class="delete danger" title="Delete or Backspace"><span aria-hidden="true">🗑️</span> Delete</button>
      </div>
      <form hidden>
        <div class="options" role="group" aria-label="Alternatives" hidden></div>
        <textarea aria-label="Comment" placeholder="Leave a comment" rows="3" maxlength="3000" required></textarea>
        <div class="actions">
          <button type="button" class="remove-comment danger" aria-label="Delete comment" title="Delete comment" hidden><span aria-hidden="true">🗑️</span></button>
          <button type="button" class="cancel"><span aria-hidden="true">✖️</span> Cancel</button>
          <button type="submit" class="primary" title="⌘ Enter"><span aria-hidden="true">✅</span> Save</button>
        </div>
      </form>
    </div>`;
  document.body.append(host);

  const style = document.createElement("style");
  style.textContent = `
    @property --draft-review-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
    ::highlight(draft-review-alternatives) { background: #cfaff9; color: #231034; }
    ::highlight(draft-review-comment) { background: #ffd965a6; }
    ::highlight(draft-review-delete) { background: #ff7d7da6; text-decoration: line-through; }
    ::highlight(draft-review-selection), .draft-review-active ::selection {
      background: #fff4b9; color: #252018;
    }`;
  document.head.append(style);
  content.classList.add("draft-review-active");

  const highlights = globalThis.CSS?.highlights;
  const count = ui.querySelector(".count");
  const countLabel = ui.querySelector(".count-label");
  const countCompact = ui.querySelector(".count-compact");
  const send = ui.querySelector(".send");
  const sendLabel = ui.querySelector(".send-label");
  const workingStatus = ui.querySelector(".working");
  const workingRing = ui.querySelector(".working-ring");
  const bar = ui.querySelector(".bar");
  const changes = ui.querySelector(".changes");
  const notes = ui.querySelector(".notes");
  const error = ui.querySelector(".error");
  const tools = ui.querySelector(".selection");
  const buttons = ui.querySelector(".pick-tools");
  const form = ui.querySelector("form");
  const options = ui.querySelector(".options");
  const comment = ui.querySelector("textarea");
  const removeComment = ui.querySelector(".remove-comment");
  const pickButton = ui.querySelector(".pick");
  const pickLabel = ui.querySelector(".pick-label");
  const outlines = ui.querySelector(".outlines");
  const commentRanges = new Map();
  const elementMarks = new Map();
  let state = status;
  let selection;
  let selectionRange;
  let selectionElement;
  let composing = false;
  let submitting = false;
  let manualPick = false;
  let editing;
  let editorKind = "comment";
  let activeAlternative;
  let selectedOption = null;
  let picking = false;
  let submitGesture;
  const widgets = mountWidgets(content, {
    onPick: pickElement,
    onSelection: selectWidgetText,
    onKeyDown: handleKeyDown,
    onLoad: render,
    onScroll: reposition,
    isOpen: () => state === "open",
  });

  function setPicking(active) {
    picking = active;
    pickButton.setAttribute("aria-pressed", String(active));
    pickLabel.textContent = active ? "Tap an element" : "Pick element";
    widgets.setPicking(active);
  }

  function pickElement(item, target) {
    setPicking(false);
    if (state !== "open" || submitting || !item) return;
    const sameTarget = note => note.widget === item.widget && note.selector === item.selector &&
      note.source === item.source && note.start === item.start &&
      (item.start === undefined || note.quote === item.quote);
    const pending = alternatives.find(sameTarget);
    if (pending) return openAlternatives(pending);
    const existing = items.find(note => ["comment", "alternatives"].includes(note.kind) && sameTarget(note));
    selectElement(item, target);
    if (existing) {
      editing = existing;
      openComment(existing.kind);
    }
  }

  function selectElement(item, target) {
    clearSelection();
    showElementSelection(item, target);
  }

  function showElementSelection(item, target) {
    selection = item;
    selectionElement = target;
    tools.hidden = false;
    render();
    positionTools();
  }

  function selectWidgetText(frame, item, target) {
    if (state !== "open" || submitting || composing) return;
    if (!item) {
      if (selectionElement?.native && selectionElement.frame === frame) clearSelection();
      return;
    }
    if (picking) setPicking(false);
    selectionRange = undefined;
    paint("selection", []);
    showElementSelection(item, target);
  }

  function paint(name, ranges) {
    if (!highlights) return;
    const highlight = new Highlight(...ranges);
    highlight.priority = name === "selection" ? 0 : 1;
    highlights.set(`draft-review-${name}`, highlight);
  }

  function describe(range) {
    const before = document.createRange();
    before.selectNodeContents(content);
    before.setEnd(range.startContainer, range.startOffset);
    const start = before.toString().length;
    const text = content.textContent;
    const quote = range.toString();
    return {
      quote,
      start,
      prefix: text.slice(Math.max(0, start - 60), start),
      suffix: text.slice(start + quote.length, start + quote.length + 60),
    };
  }

  function anchor({ start, quote, prefix, suffix }) {
    const original = restoreRange(content, start, quote);
    if (original) return original;
    const text = content.textContent;
    const at = text.indexOf(quote);
    if (at < 0) return null;
    if (text.indexOf(quote, at + 1) === -1) return restoreRange(content, at, quote);
    const context = `${prefix ?? ""}${quote}${suffix ?? ""}`;
    const located = text.indexOf(context);
    return located >= 0 && text.indexOf(context, located + 1) === -1
      ? restoreRange(content, located + (prefix?.length ?? 0), quote) : null;
  }

  function setChanges(open) {
    changes.hidden = !open;
    count.setAttribute("aria-expanded", String(open));
  }

  function showError(message) {
    error.textContent = message;
    error.hidden = !message;
    if (message) setChanges(true);
  }

  function render() {
    const working = state === "submitted";
    countLabel.textContent = `${items.length} ${items.length === 1 ? "change" : "changes"}` +
      (alternatives.length ? ` · ${alternatives.length} ${alternatives.length === 1 ? "option set" : "option sets"}` : "");
    count.setAttribute("aria-label", countLabel.textContent);
    countCompact.textContent = String(items.length) +
      (alternatives.length ? ` · ${alternatives.length}` : "");
    bar.dataset.working = String(working);
    send.hidden = count.hidden = pickButton.hidden = working;
    workingStatus.hidden = !working;
    workingRing.hidden = !working;
    send.disabled = state !== "open" || !items.length || submitting || composing;
    pickButton.disabled = state !== "open" || submitting || composing;
    sendLabel.textContent = submitting ? "Sending…" : {
      open: "Send Feedback",
      submitted: "Feedback sent",
      expired: "Review expired",
      closed: "Review closed",
    }[state];
    notes.replaceChildren();
    commentRanges.clear();
    elementMarks.clear();
    outlines.replaceChildren();
    const marked = { comment: [], delete: [], alternatives: [] };
    items.forEach((item, index) => {
      const response = item.kind === "alternative-response";
      const range = !response && !item.selector ? anchor(item) : null;
      const target = !response && item.selector ? widgets.findTarget(item) : null;
      if (target) markElement(target, item.kind);
      if (range) {
        marked[item.kind].push(range);
        if (item.kind !== "delete") commentRanges.set(item, range);
      }
      const note = document.createElement("div");
      note.className = "note";
      const quote = document.createElement("blockquote");
      quote.textContent = `“${item.quote.trim()}”`;
      const message = document.createElement("p");
      message.textContent = item.kind === "delete" ? "Delete this text"
        : item.kind === "alternatives" ? item.comment || "Requested alternatives"
        : response && item.option !== null
          ? `Selected: ${alternatives.find(choice => choice.id === item.id)?.options[item.option] ?? ""}`
          : item.comment;
      note.append(quote, message);
      if (state === "open") {
        if (range || target) {
          const edit = document.createElement("button");
          edit.type = "button";
          edit.textContent = "✏️ Edit";
          edit.setAttribute("aria-label", `Edit comment ${index + 1}`);
          edit.disabled = composing || submitting;
          edit.addEventListener("click", () => {
            if (range) {
              range.startContainer.parentElement.scrollIntoView({ block: "center" });
              editComment(item, range);
            } else {
              (target.frame ?? target.element).scrollIntoView({ block: "center" });
              pickElement(item, target);
            }
          });
          note.append(edit);
        }
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "danger";
        remove.textContent = "🗑️ Remove";
        remove.setAttribute("aria-label", `Remove change ${index + 1}`);
        remove.disabled = composing || submitting;
        remove.addEventListener("click", () => removeItem(item));
        note.append(remove);
      }
      notes.append(note);
    });
    for (const choice of alternatives) {
      const range = choice.selector ? null : anchor(choice);
      const target = choice.selector ? widgets.findTarget(choice) : null;
      if (target) markElement(target, "alternatives");
      if (range) {
        marked.alternatives.push(range);
        commentRanges.set(choice, range);
      }
      const note = document.createElement("div");
      note.className = "note";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "alternatives-action";
      button.textContent = `Alternatives for “${choice.quote.trim().slice(0, 100)}”`;
      button.disabled = state !== "open" || submitting || composing;
      button.addEventListener("click", () => openAlternatives(choice, { scroll: true }));
      note.append(button);
      notes.append(note);
    }
    if (!items.length && !alternatives.length) notes.textContent = "No changes yet.";
    paint("alternatives", marked.alternatives);
    paint("comment", marked.comment);
    paint("delete", marked.delete);
    if (selectionElement) markElement(selectionElement, "selection");
    positionMarks();
  }

  function markElement(target, kind) {
    const outline = document.createElement("div");
    outline.className = "outline";
    outline.dataset.kind = kind;
    elementMarks.set(outline, target);
    outlines.append(outline);
  }

  function positionMarks() {
    for (const [outline, target] of elementMarks) {
      const rect = widgetRect(target);
      outline.hidden = !rect.width || !rect.height;
      Object.assign(outline.style, {
        left: `${rect.left}px`, top: `${rect.top}px`,
        width: `${rect.width}px`, height: `${rect.height}px`,
      });
    }
  }

  function reposition() {
    positionMarks();
    positionTools();
  }

  function persist() {
    try {
      if (state === "submitted") sessionStorage.removeItem(storageKey());
      else sessionStorage.setItem(storageKey(), JSON.stringify(items));
    } catch {
      // Keep the current in-memory draft.
    }
    render();
  }

  function positionTools() {
    if (tools.hidden) return;
    const rect = selectionElement ? widgetRect(selectionElement) : (selectionRange?.getBoundingClientRect() ?? count.getBoundingClientRect());
    const viewport = window.visualViewport;
    const top = viewport?.offsetTop ?? 0;
    const bottom = top + (viewport?.height ?? innerHeight);
    const left = viewport?.offsetLeft ?? 0;
    const right = left + (viewport?.width ?? innerWidth);
    const preferredTop = rect.bottom + 8;
    tools.style.top = `${Math.max(top + 8, preferredTop + tools.offsetHeight <= bottom - 8
      ? preferredTop : Math.min(rect.top - tools.offsetHeight - 8, bottom - tools.offsetHeight - 8))}px`;
    tools.style.left = `${Math.max(left + 8, Math.min(
      (rect.left + rect.right - tools.offsetWidth) / 2, right - tools.offsetWidth - 8
    ))}px`;
  }

  function clearSelection() {
    const innerSelection = selectionElement?.native
      ? selectionElement.element.ownerDocument.getSelection() : null;
    selection = undefined;
    selectionRange = undefined;
    selectionElement = undefined;
    composing = false;
    editing = undefined;
    activeAlternative = undefined;
    selectedOption = null;
    manualPick = false;
    comment.value = "";
    form.hidden = true;
    buttons.hidden = false;
    tools.hidden = true;
    paint("selection", []);
    const native = window.getSelection();
    if (native?.anchorNode && content.contains(native.anchorNode)) native.removeAllRanges();
    innerSelection?.removeAllRanges();
    render();
  }

  function select(range, clicked = false) {
    const quote = range.toString();
    if (!quote.trim() || quote.length > 8000) return;
    manualPick = clicked;
    selectionRange = range.cloneRange();
    selection = describe(range);
    paint("selection", [selectionRange]);
    tools.hidden = false;
    positionTools();
  }

  document.addEventListener("selectionchange", () => {
    if (state !== "open" || composing || submitting || picking || selectionElement) return;
    const native = window.getSelection();
    if (!native?.rangeCount || native.isCollapsed) {
      if (selection && !manualPick) clearSelection();
      return;
    }
    const range = native.getRangeAt(0);
    if (content.contains(range.startContainer) && content.contains(range.endContainer)) {
      select(range);
    } else if (selection) {
      clearSelection();
    }
  });

  content.addEventListener("click", event => {
    if (state !== "open" || composing || submitting || picking || event.defaultPrevented) return;
    const native = window.getSelection();
    if (native?.rangeCount && !native.isCollapsed) return;
    // CSS highlights do not receive DOM events. Hit-test the marked text rectangles.
    for (const [item, range] of [...commentRanges].reverse()) {
      const hit = [...range.getClientRects()].some(rect =>
        event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom
      );
      if (hit) {
        event.preventDefault();
        return item.options ? openAlternatives(item) : editComment(item, range);
      }
    }
    const line = event.target.closest("p, li, h2, h3, h4, h5, h6, pre, td, th, figcaption");
    if (!line || !content.contains(line)) return;
    const control = event.target.closest("a, button, input, summary, [contenteditable], [role=button]");
    if (control) {
      const headingLink = /^H[2-6]$/.test(line.tagName) && line.id &&
        control.getAttribute("href") === `#${line.id}`;
      if (!headingLink) return;
      event.preventDefault();
    }
    const range = document.createRange();
    range.selectNodeContents(line);
    select(range, true);
  });

  document.addEventListener("pointerdown", event => {
    if (event.composedPath().includes(host)) return;
    setChanges(false);
    if (selection && !composing) clearSelection();
  });

  function openComment(kind = "comment", focus = true) {
    if (!selection || state !== "open") return;
    composing = true;
    editorKind = kind;
    options.hidden = kind !== "alternative-response";
    comment.required = kind === "comment";
    comment.setAttribute("aria-label", kind === "comment" ? "Comment" : "Direction (optional)");
    comment.placeholder = kind === "comment" ? "Leave a comment"
      : kind === "alternatives" ? "What should the alternatives aim for?"
        : "Add direction to your choice or ask for another set";
    buttons.hidden = true;
    form.hidden = false;
    comment.value = editing?.comment ?? "";
    removeComment.hidden = !editing;
    render();
    positionTools();
    if (focus) comment.focus({ preventScroll: true });
  }

  function editComment(item, range) {
    setChanges(false);
    select(range, true);
    editing = item;
    openComment(item.kind);
  }

  function openAlternatives(choice, { scroll = false } = {}) {
    if (state !== "open" || submitting || composing) return;
    setChanges(false);
    clearSelection();
    selection = choice;
    selectionRange = choice.selector ? null : anchor(choice);
    selectionElement = choice.selector ? widgets.findTarget(choice) : null;
    if (scroll) {
      const element = selectionRange?.startContainer.parentElement ??
        selectionElement?.frame ?? selectionElement?.element;
      element?.scrollIntoView({ block: "center", behavior: "instant" });
    }

    activeAlternative = choice;
    editing = items.find(item => item.kind === "alternative-response" && item.id === choice.id);
    selectedOption = editing?.option ?? null;
    options.replaceChildren(...choice.options.map((text, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = text;
      button.setAttribute("aria-pressed", String(index === selectedOption));
      button.addEventListener("click", () => {
        selectedOption = selectedOption === index ? null : index;
        [...options.children].forEach((item, option) =>
          item.setAttribute("aria-pressed", String(option === selectedOption)));
      });
      return button;
    }));
    tools.hidden = false;
    openComment("alternative-response", false);
  }

  function removeItem(item) {
    if (state !== "open" || submitting || !items.includes(item)) return;
    items.splice(items.indexOf(item), 1);
    if (item === editing) clearSelection();
    persist();
  }

  function addItem(kind, text = "") {
    if (!selection || state !== "open") return;
    if (items.length >= 40) {
      clearSelection();
      return showError("Send this round before adding more than 40 changes.");
    }
    items.push({ ...selection, kind, comment: text });
    clearSelection();
    showError("");
    persist();
  }

  function handleKeyDown(event) {
    if (event.defaultPrevented) return;
    if (event.key === "Escape" && picking) return setPicking(false);
    if (!selection) return;
    if (event.key === "Escape") {
      if (!composing || !comment.value.trim()) {
        event.preventDefault();
        clearSelection();
      }
      return;
    }
    if (composing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
        event.composedPath().includes(host) ||
        event.target.closest?.("input, textarea, select, button, [contenteditable]")) return;
    if (event.key === "Enter") {
      event.preventDefault();
      openComment();
    }
    if (["Delete", "Backspace"].includes(event.key)) {
      event.preventDefault();
      addItem("delete");
    }
  }
  document.addEventListener("keydown", handleKeyDown);

  window.addEventListener("scroll", reposition, { capture: true, passive: true });
  window.addEventListener("resize", reposition);
  window.visualViewport?.addEventListener("resize", reposition);
  window.visualViewport?.addEventListener("scroll", reposition);
  pickButton.addEventListener("click", () => {
    clearSelection();
    setChanges(false);
    setPicking(!picking);
  });
  count.addEventListener("click", () => setChanges(changes.hidden));
  buttons.addEventListener("mousedown", event => event.preventDefault());
  ui.querySelector(".comment").addEventListener("click", () => openComment());
  ui.querySelector(".alternatives-action").addEventListener("click", () => openComment("alternatives"));
  ui.querySelector(".delete").addEventListener("click", () => addItem("delete"));
  ui.querySelector(".cancel").addEventListener("click", clearSelection);
  removeComment.addEventListener("click", () => removeItem(editing));
  comment.addEventListener("keydown", event => {
    if (event.key === "Enter" && event.metaKey && !event.isComposing) {
      event.preventDefault();
      form.requestSubmit();
    }
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const text = comment.value.trim();
    if (editorKind === "alternative-response") {
      if (selectedOption === null && !text) {
        comment.focus();
        return;
      }
      const { id, quote } = activeAlternative;
      if (!editing && items.length >= 40) return showError("Send this round before adding more than 40 changes.");
      const response = { kind: "alternative-response", id, option: selectedOption, comment: text, quote };
      if (editing) items[items.indexOf(editing)] = response;
      else items.push(response);
      clearSelection();
      showError("");
      persist();
      return;
    }
    if (editorKind === "comment" && !text) return;
    if (!editing) return addItem(editorKind, text);
    editing.comment = text;
    clearSelection();
    persist();
  });

  send.addEventListener("pointerdown", () => {
    if (!send.disabled) submitGesture = { time: performance.now(), position: scrollMemory.capture() };
  });
  send.addEventListener("pointercancel", () => { submitGesture = undefined; });
  send.addEventListener("click", async () => {
    if (send.disabled) return;
    const tappedPosition = submitGesture && performance.now() - submitGesture.time < 1500
      ? submitGesture.position : undefined;
    scrollMemory.pin(tappedPosition);
    submitGesture = undefined;
    submitting = true;
    render();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ round, items }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      state = result.status;
      setPicking(false);
      showError("");
      setChanges(false);
      clearSelection();
      persist();
    } catch (exception) {
      scrollMemory.unpin();
      showError(exception.message || "Could not send feedback. Try again.");
    } finally {
      submitting = false;
      render();
    }
    if (state === "submitted") void checkRound();
  });

  function revealNewAlternatives() {
    const newSets = alternatives.filter(choice => choice.updatedRound === round);
    if (state !== "open" || newSets.length !== 1) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const choice = newSets[0];
      const target = choice.selector && widgets.findTarget(choice);
      const rect = target ? widgetRect(target) : (!choice.selector && anchor(choice)?.getBoundingClientRect());
      if (!selection && rect?.bottom > 0 && rect.top < innerHeight) openAlternatives(choice);
    }));
  }

  async function advanceRound(current) {
    if (current.assetRevision !== assetRevision) return false;
    const preview = await fetch(location.href, { cache: "no-store", signal: AbortSignal.timeout(3500) });
    if (!preview.ok) throw new Error("The updated draft is still loading.");
    const latest = document.createElement("template");
    latest.innerHTML = await preview.text();
    const latestRevision = latest.content.querySelector("[data-draft-review-content]")?.dataset.draftReviewContent;
    if (!latestRevision || latestRevision !== content.dataset.draftReviewContent) return false;

    round = current.round;
    state = current.status;
    alternatives = current.alternatives ?? [];
    items = loadItems();
    scrollMemory.advance(round);
    setPicking(false);
    setChanges(false);
    clearSelection();
    widgets.restore([...items, ...alternatives].filter(item => item.selector));
    revealNewAlternatives();
    return true;
  }

  widgets.restore([...items, ...alternatives].filter(item => item.selector));
  render();
  revealNewAlternatives();
  const pollDelay = () => state === "submitted" ? 650 : 4000;
  let roundCheck;
  let checking = false;
  async function checkRound() {
    if (checking || (state !== "open" && state !== "submitted")) return;
    clearTimeout(roundCheck);
    checking = true;
    try {
      const response = await getRound();
      if (response.status === 404 && response.headers.get("Content-Type")?.includes("application/json") &&
          (await response.json()).error === "Review session not found.") {
        state = "closed";
        setPicking(false);
        clearSelection();
        return;
      }
      if (response.ok) {
        const current = await response.json();
        if (current.round !== round) {
          if (!(await advanceRound(current))) {
            scrollMemory.saveForReload();
            return location.reload();
          }
        } else if (current.status !== state) {
          state = current.status;
          if (state === "submitted") scrollMemory.pin();
          setPicking(false);
          clearSelection();
          persist();
        }
      }
    } catch {
      // The dev server may briefly restart while the draft is edited.
    } finally {
      checking = false;
    }
    if (state === "open" || state === "submitted") {
      roundCheck = setTimeout(checkRound, pollDelay());
    }
  }
  window.addEventListener("pageshow", checkRound);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) checkRound();
  });
  roundCheck = setTimeout(checkRound, pollDelay());
}
