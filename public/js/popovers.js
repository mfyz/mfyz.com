/**
 * Popovers — Link Preview Cards + Glossary Term Tooltips
 * Shared positioning and hover logic for both popover types.
 */

(function () {
  // ── Shared state ──────────────────────────────────────────────
  let activeCard = null; // Currently visible card element
  let activeTrigger = null; // Element that triggered the card
  let hideTimeout = null;

  // ── Shared helpers ────────────────────────────────────────────

  function positionCard(trigger, card, cardWidth) {
    const rect = trigger.getBoundingClientRect();
    const gap = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cardHeight = card.offsetHeight || 200;

    let left = rect.left;
    let top = rect.bottom + gap;

    if (left + cardWidth > vw - 16) left = vw - cardWidth - 16;
    if (left < 16) left = 16;
    if (top + cardHeight > vh - 16) top = rect.top - cardHeight - gap;
    if (top < 16) top = 16;

    card.style.left = left + "px";
    card.style.top = top + "px";
  }

  function hideActive() {
    if (activeCard) activeCard.classList.remove("visible");
    activeTrigger = null;
    activeCard = null;
  }

  function scheduleHide() {
    hideTimeout = setTimeout(hideActive, 100);
  }

  function cancelHide() {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
  }

  // ── Link Preview Cards ────────────────────────────────────────

  let linkPreviewCard = null;

  function getLinkPreviewCard() {
    if (linkPreviewCard) return linkPreviewCard;
    const card = document.createElement("div");
    card.className = "link-preview";
    card.innerHTML =
      '<img class="link-preview-image" alt="" />' +
      '<div class="link-preview-content">' +
      '<h3 class="link-preview-title"></h3>' +
      '<p class="link-preview-desc"></p>' +
      "</div>";
    card.addEventListener("mouseenter", cancelHide);
    card.addEventListener("mouseleave", scheduleHide);
    document.body.appendChild(card);
    linkPreviewCard = card;
    return card;
  }

  function showLinkPreview(link) {
    var title = link.dataset.previewTitle;
    var desc = link.dataset.previewDesc;
    var slug = link.dataset.previewSlug;
    if (!title || !desc) return;

    cancelHide();
    if (activeTrigger && activeTrigger !== link) hideActive();

    var card = getLinkPreviewCard();
    card.querySelector(".link-preview-title").textContent = title;
    card.querySelector(".link-preview-desc").textContent = desc;

    var img = card.querySelector(".link-preview-image");
    if (slug) {
      img.src = slug + (slug.endsWith("/") ? "" : "/") + "og.png";
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }

    positionCard(link, card, 480);
    activeTrigger = link;
    activeCard = card;
    requestAnimationFrame(function () {
      card.classList.add("visible");
    });
  }

  // ── Glossary Popovers ─────────────────────────────────────────

  let glossaryCard = null;

  function getGlossaryCard() {
    if (glossaryCard) return glossaryCard;
    var card = document.createElement("div");
    card.className = "glossary-popover";
    card.innerHTML =
      '<div class="glossary-popover-term"></div>' +
      '<div class="glossary-popover-desc"></div>';
    card.addEventListener("mouseenter", cancelHide);
    card.addEventListener("mouseleave", scheduleHide);
    document.body.appendChild(card);
    glossaryCard = card;
    return card;
  }

  function showGlossary(span) {
    var term = span.dataset.glossaryTerm;
    var desc = span.dataset.glossaryDesc;
    if (!term || !desc) return;

    cancelHide();
    if (activeTrigger && activeTrigger !== span) hideActive();

    var card = getGlossaryCard();
    card.querySelector(".glossary-popover-term").textContent = term;
    card.querySelector(".glossary-popover-desc").innerHTML = desc;

    positionCard(span, card, 320);
    activeTrigger = span;
    activeCard = card;
    requestAnimationFrame(function () {
      card.classList.add("visible");
    });
  }

  // ── Event wiring ──────────────────────────────────────────────

  function init() {
    // Link previews
    document
      .querySelectorAll("a.internal-link[data-preview-title]")
      .forEach(function (link) {
        link.addEventListener("mouseenter", function () {
          showLinkPreview(link);
        });
        link.addEventListener("mouseleave", scheduleHide);
      });

    // Glossary terms
    document
      .querySelectorAll("span.glossary-term[data-glossary-term]")
      .forEach(function (span) {
        span.addEventListener("mouseenter", function () {
          showGlossary(span);
        });
        span.addEventListener("mouseleave", scheduleHide);
      });
  }

  // Reposition on scroll/resize
  window.addEventListener("scroll", function () {
    if (activeTrigger && activeCard) {
      var w = activeCard === glossaryCard ? 320 : 480;
      positionCard(activeTrigger, activeCard, w);
    }
  });
  window.addEventListener("resize", function () {
    if (activeTrigger && activeCard) {
      var w = activeCard === glossaryCard ? 320 : 480;
      positionCard(activeTrigger, activeCard, w);
    }
  });

  // Init on load + Astro view transitions
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  document.addEventListener("astro:page-load", init);
})();
