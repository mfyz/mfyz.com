const widgets = "iframe[src], img[src], svg, .mermaid-diagram";

function selectorFor(element, root) {
  const parts = [];
  for (let node = element; node && node !== root; node = node.parentElement) {
    if (node.id && !node.hasAttribute("data-draft-review-widget")) {
      const id = "#" + CSS.escape(node.id);
      if (root.querySelectorAll(id).length === 1) return [id, ...parts].join(" > ");
    }
    const tag = CSS.escape(node.localName);
    const siblings = [...node.parentElement.children].filter(child => child.localName === node.localName);
    parts.unshift(siblings.length === 1 ? tag : `${tag}:nth-of-type(${siblings.indexOf(node) + 1})`);
  }
  return parts.length ? `:scope > ${parts.join(" > ")}` : ":scope";
}

function sameSiteSrc(element) {
  const raw = element.getAttribute("src");
  if (!raw) return null;
  const url = new URL(raw, document.baseURI);
  return url.origin === location.origin ? url : null;
}

export function widgetRect({ element, frame, range }) {
  const rect = (range ?? element).getBoundingClientRect();
  if (!frame) return rect;
  const outer = frame.getBoundingClientRect();
  const left = outer.left + frame.clientLeft;
  const top = outer.top + frame.clientTop;
  const x = Math.max(left, left + rect.left);
  const y = Math.max(top, top + rect.top);
  const right = Math.min(left + frame.clientWidth, left + rect.right);
  const bottom = Math.min(top + frame.clientHeight, top + rect.bottom);
  return new DOMRect(x, y, Math.max(0, right - x), Math.max(0, bottom - y));
}

export function restoreRange(element, start, quote) {
  if (element.textContent.slice(start, start + quote.length) !== quote) return null;
  const doc = element.ownerDocument;
  const walker = doc.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const range = doc.createRange();
  const end = start + quote.length;
  let offset = 0;
  let started = false;
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const next = offset + node.length;
    if (!started && start < next) {
      range.setStart(node, start - offset);
      started = true;
    }
    if (started && end <= next) {
      range.setEnd(node, end - offset);
      return range;
    }
    offset = next;
  }
  return null;
}

export function mountWidgets(content, { onPick, onSelection, onKeyDown, onLoad, onScroll, isOpen }) {
  const frames = new Map();
  const overlays = new Map();
  const connected = new WeakSet();
  const lastSelections = new WeakMap();
  let picking = false;

  function pick(event, widget, root, frame, element = event.target) {
    if (!picking || !root?.contains(element)) return;
    const native = root.ownerDocument.getSelection();
    if (native?.rangeCount && !native.isCollapsed) return;
    const label = element.getAttribute("alt") || element.getAttribute("aria-label") || element.getAttribute("title") ||
      element.textContent.trim() || element.getAttribute("class") || element.localName;
    const source = sameSiteSrc(widget);
    event.preventDefault();
    event.stopImmediatePropagation();
    onPick({
      quote: label.replace(/\s+/g, " ").slice(0, 240),
      widget: selectorFor(widget, content),
      selector: selectorFor(element, root),
      ...(source && { source: source.pathname }),
    }, { element, frame });
  }

  function readTextSelection(widget, frame, root) {
    const doc = root.ownerDocument;
    const native = doc.getSelection();
    const previous = lastSelections.get(doc);
    if (!native?.rangeCount || native.isCollapsed) {
      if (previous) {
        lastSelections.delete(doc);
        onSelection(frame);
      }
      return;
    }
    const range = native.getRangeAt(0);
    if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) return;
    const ancestor = range.commonAncestorContainer;
    const element = ancestor.nodeType === Node.ELEMENT_NODE ? ancestor : ancestor.parentElement;
    const quote = range.toString();
    if (!quote.trim() || quote.length > 8000) return;
    if (previous && range.compareBoundaryPoints(Range.START_TO_START, previous) === 0 &&
        range.compareBoundaryPoints(Range.END_TO_END, previous) === 0) return;
    lastSelections.set(doc, range.cloneRange());
    const before = doc.createRange();
    before.selectNodeContents(element);
    before.setEnd(range.startContainer, range.startOffset);
    onSelection(frame, {
      quote,
      start: before.toString().length,
      widget: selectorFor(widget, content),
      selector: selectorFor(element, root),
      source: sameSiteSrc(widget)?.pathname,
    }, { element, frame, range: range.cloneRange(), native: true });
  }

  function connect(widget, frame) {
    const attach = () => {
      const doc = frameDocument(frame);
      if (!doc || doc.URL === "about:blank" || connected.has(doc)) return;
      connected.add(doc);
      doc.addEventListener("scroll", onScroll, { capture: true, passive: true });
      doc.addEventListener("keydown", onKeyDown);
      if (widget === frame && doc.body) {
        const style = doc.createElement("style");
        style.textContent = "::selection { background: #fff4b9; color: #252018; }";
        doc.head.append(style);
      }
      onLoad();
    };
    frame.addEventListener("load", attach);
    if (frameDocument(frame)?.readyState === "complete") attach();
  }

  function frameDocument(frame) {
    try {
      const doc = frame.contentDocument;
      return doc?.URL !== "about:blank" ? doc : null;
    } catch {
      return null;
    }
  }

  function positionOverlays() {
    for (const [frame, overlay] of overlays) {
      const rect = frame.getBoundingClientRect();
      Object.assign(overlay.style, {
        left: `${rect.left + frame.clientLeft}px`, top: `${rect.top + frame.clientTop}px`,
        width: `${frame.clientWidth}px`, height: `${frame.clientHeight}px`,
      });
    }
  }

  function showOverlays() {
    for (const [widget, frame] of frames) {
      if (overlays.has(frame)) continue;
      const overlay = document.createElement("div");
      Object.assign(overlay.style, { position: "fixed", zIndex: "2147483643", cursor: "crosshair" });
      overlay.setAttribute("aria-hidden", "true");
      overlay.addEventListener("click", event => {
        const doc = frameDocument(frame);
        if (!doc) return;
        const hit = doc.elementFromPoint(event.offsetX, event.offsetY);
        pick(event, widget, doc.body ?? doc.documentElement, frame, hit);
      });
      overlays.set(frame, overlay);
      document.body.append(overlay);
    }
    positionOverlays();
  }

  function prepareFrame(widget) {
    if (frames.has(widget)) return;
    const source = sameSiteSrc(widget);
    if (!source) return;
    if (widget.localName === "iframe") {
      if (widget.hasAttribute("sandbox") && !widget.sandbox.contains("allow-same-origin")) {
        // Local demo markup stays script-disabled. Leave other sandboxed embeds as-is.
        if (!source.pathname.startsWith("/demos/") || widget.sandbox.length || widget.hasAttribute("srcdoc")) return;
        // Set the permission before insertion. WebKit retains the old origin
        // while a live sandboxed frame is being navigated.
        const replacement = widget.cloneNode(false);
        replacement.sandbox.add("allow-same-origin");
        replacement.loading = "eager";
        widget.replaceWith(replacement);
        widget = replacement;
      }
      frames.set(widget, widget);
      connect(widget, widget);
      return;
    }
    if (!source.pathname.endsWith(".svg")) return;
    // The image keeps its layout and visuals. A script-disabled copy provides DOM hit testing.
    const frame = document.createElement("iframe");
    frame.sandbox.add("allow-same-origin");
    frame.setAttribute("aria-hidden", "true");
    frame.tabIndex = -1;
    frame.src = source.href;
    const wrapper = widget.parentElement;
    if (getComputedStyle(wrapper).position === "static") wrapper.style.position = "relative";
    Object.assign(frame.style, {
      position: "absolute", opacity: "0", zIndex: "1", border: "0",
      margin: "0", padding: "0", pointerEvents: "none",
    });
    const position = () => Object.assign(frame.style, {
      left: `${widget.offsetLeft}px`, top: `${widget.offsetTop}px`,
      width: `${widget.offsetWidth}px`, height: `${widget.offsetHeight}px`,
    });
    wrapper.append(frame);
    position();
    const observer = new ResizeObserver(() => {
      position();
      positionOverlays();
    });
    observer.observe(widget);
    frames.set(widget, frame);
    connect(widget, frame);
  }

  function findTarget(item) {
    try {
      const widget = content.querySelector(item.widget);
      if (!widget || (item.source && sameSiteSrc(widget)?.pathname !== item.source)) return null;
      const frame = frames.get(widget);
      const doc = frame && frameDocument(frame);
      if (frame && !doc) return null;
      const root = doc ? (doc.body ?? doc.documentElement) : widget;
      const element = item.selector === ":scope" ? root : root.querySelector(item.selector);
      if (!element) return null;
      if (item.start === undefined) return { element, frame };
      const range = restoreRange(element, item.start, item.quote);
      return range ? { element, frame, range } : null;
    } catch {
      return null;
    }
  }

  content.addEventListener("click", event => {
    if (!picking) return;
    const widget = event.target.closest(".mermaid-diagram") ??
      event.target.closest("svg, img[src], [data-draft-review-widget]");
    if (!widget || !content.contains(widget)) return;
    pick(event, widget, widget);
  }, true);
  window.addEventListener("scroll", positionOverlays, { capture: true, passive: true });
  window.addEventListener("resize", positionOverlays);

  // WebKit does not dispatch script handlers in a script-disabled sandbox.
  // Read the native selection from the parent while the review is open.
  let selectionCheck;
  function resumeSelectionCheck() {
    if (selectionCheck || !isOpen()) return;
    selectionCheck = setInterval(() => {
      if (!isOpen()) {
        clearInterval(selectionCheck);
        selectionCheck = undefined;
        return;
      }
      if (document.hidden || !frames.size) return;
      for (const [widget, frame] of frames) {
        if (widget !== frame) continue;
        const doc = frameDocument(frame);
        if (doc?.body) readTextSelection(widget, frame, doc.body);
      }
      onScroll();
    }, 140);
  }

  resumeSelectionCheck();

  return {
    findTarget,
    setPicking(enabled) {
      picking = enabled;
      if (enabled) {
        content.querySelectorAll(widgets).forEach(prepareFrame);
        showOverlays();
      } else {
        for (const overlay of overlays.values()) overlay.remove();
        overlays.clear();
      }
    },
    restore(items) {
      resumeSelectionCheck();
      content.querySelectorAll("iframe[src]").forEach(prepareFrame);
      for (const item of items) {
        if (!item.source) continue;
        try {
          const widget = content.querySelector(item.widget);
          if (widget?.matches("iframe[src], img[src]")) prepareFrame(widget);
        } catch {
          // A changed widget may no longer have the original selector.
        }
      }
    },
  };
}
