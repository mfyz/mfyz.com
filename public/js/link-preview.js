/**
 * Link Preview Cards
 * Shows a preview card on hover for internal blog links and GitHub repo links
 */

(function () {
  let previewCard = null;
  let currentLink = null;
  let showTimeout = null;
  let hideTimeout = null;

  function createPreviewCard() {
    const card = document.createElement("div");
    card.className = "link-preview";
    card.innerHTML = `
      <img class="link-preview-image" alt="" />
      <div class="link-preview-content">
        <h3 class="link-preview-title"></h3>
        <p class="link-preview-desc"></p>
      </div>
    `;
    document.body.appendChild(card);
    return card;
  }

  function showPreview(link) {
    const title = link.dataset.previewTitle;
    const desc = link.dataset.previewDesc;
    const slug = link.dataset.previewSlug;
    const type = link.dataset.previewType;

    if (!previewCard) {
      previewCard = createPreviewCard();
    }

    const titleEl = previewCard.querySelector(".link-preview-title");
    const descEl = previewCard.querySelector(".link-preview-desc");
    const imageEl = previewCard.querySelector(".link-preview-image");
    const contentEl = previewCard.querySelector(".link-preview-content");

    if (type === "github") {
      // GitHub repo preview - use Socialify image as the entire card
      const repoPath = slug
        .replace(/^https?:\/\/github\.com\//, "")
        .replace(/\/$/, "");
      const isDark = document.documentElement.classList.contains("dark");
      const theme = isDark ? "Dark" : "Light";
      const socialifyUrl =
        `https://socialify.git.ci/${repoPath}/image` +
        `?description=1&forks=1&language=1&name=1&owner=1&pattern=Plus&stargazers=1&theme=${theme}`;
      imageEl.src = socialifyUrl;
      imageEl.style.display = "block";
      // Hide text content - the Socialify image is a complete card
      contentEl.style.display = "none";
      previewCard.classList.add("github-preview");
    } else {
      // Internal link preview
      if (!title || !desc) return;

      titleEl.textContent = title;
      descEl.textContent = desc;

      if (slug) {
        const ogImageUrl = `${slug}${slug.endsWith("/") ? "" : "/"}og.png`;
        imageEl.src = ogImageUrl;
        imageEl.style.display = "block";
      } else {
        imageEl.style.display = "none";
      }
      contentEl.style.display = "";
      previewCard.classList.remove("github-preview");
    }

    // Position the card
    positionCard(link);

    // Show with fade-in
    requestAnimationFrame(() => {
      previewCard.classList.add("visible");
    });
  }

  function positionCard(link) {
    const linkRect = link.getBoundingClientRect();
    const cardWidth = 480;
    const cardHeight = previewCard.offsetHeight || 300;
    const gap = 8;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = linkRect.left;
    let top = linkRect.bottom + gap;

    // Adjust horizontal position if card would overflow viewport
    if (left + cardWidth > viewportWidth - 16) {
      left = viewportWidth - cardWidth - 16;
    }
    if (left < 16) {
      left = 16;
    }

    // If card would overflow bottom, position above the link
    if (top + cardHeight > viewportHeight - 16) {
      top = linkRect.top - cardHeight - gap;
    }

    // If still overflowing, position at top of viewport
    if (top < 16) {
      top = 16;
    }

    previewCard.style.left = `${left}px`;
    previewCard.style.top = `${top}px`;
  }

  function hidePreview() {
    if (previewCard) {
      previewCard.classList.remove("visible");
    }
    currentLink = null;
  }

  function handleMouseEnter(e) {
    const link = e.currentTarget;

    // Clear any pending hide
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }

    // If already showing this link, do nothing
    if (currentLink === link) return;

    currentLink = link;

    // Clear any pending show
    if (showTimeout) {
      clearTimeout(showTimeout);
    }

    // Show immediately (no delay for instant feel)
    showPreview(link);
  }

  function handleMouseLeave() {
    // Clear any pending show
    if (showTimeout) {
      clearTimeout(showTimeout);
      showTimeout = null;
    }

    // Hide with slight delay to allow mouse to move to card
    hideTimeout = setTimeout(hidePreview, 100);
  }

  // Initialize on DOM ready
  function init() {
    const links = document.querySelectorAll(
      "a.internal-link[data-preview-title], a.github-link[data-preview-type='github']"
    );

    links.forEach(link => {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    // Re-position card on scroll or resize
    window.addEventListener("scroll", () => {
      if (currentLink && previewCard?.classList.contains("visible")) {
        positionCard(currentLink);
      }
    });

    window.addEventListener("resize", () => {
      if (currentLink && previewCard?.classList.contains("visible")) {
        positionCard(currentLink);
      }
    });
  }

  // Run on page load and after view transitions
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Re-initialize after Astro view transitions
  document.addEventListener("astro:page-load", init);
})();
