/**
 * Code Blocks Enhancement Script
 *
 * This script attaches copy and word wrap toggle buttons to code blocks in the document.
 * It's loaded by the Layout.astro file and runs on each page load.
 */

// Initialize immediately and also on page transition with Astro
function initCodeBlocks() {
  const copyButtonLabel = "Copy";
  const wrapButtonLabel = "Wrap";
  const codeBlocks = Array.from(document.querySelectorAll("pre"));

  for (const codeBlock of codeBlocks) {
    // Skip if this code block already has buttons
    if (codeBlock.parentNode?.classList?.contains("code-block-wrapper")) {
      continue;
    }

    // Create wrapper for relative positioning
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.className = "code-block-wrapper";

    // Create button group container
    const buttonGroup = document.createElement("div");
    buttonGroup.className =
      "code-buttons-group absolute right-3 -top-3 flex rounded overflow-hidden";

    // Create word wrap toggle button (first in the group) - icon only
    const wrapButton = document.createElement("button");
    wrapButton.className =
      "wrap-code bg-gray-500 dark:bg-gray-700 hover:bg-gray-600 dark:hover:bg-gray-600 py-1 px-2 text-xs text-white font-medium rounded-l flex items-center justify-center";
    wrapButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M3 6h18"/><path d="M3 12h10"/><path d="M3 18h18"/><path d="M17 12v6"/><path d="M17 12l-4 4"/><path d="M17 12l4 4"/></svg>`;
    wrapButton.setAttribute("aria-label", wrapButtonLabel);
    wrapButton.setAttribute("aria-pressed", "false");
    wrapButton.setAttribute("title", "Toggle word wrap");

    // Create divider between buttons
    const divider = document.createElement("div");
    divider.className = "border-r border-gray-400 dark:border-gray-600";

    // Create copy button (second in the group) - icon with text
    const copyButton = document.createElement("button");
    copyButton.className =
      "copy-code bg-gray-500 dark:bg-gray-700 hover:bg-gray-600 dark:hover:bg-gray-600 py-1 px-2 text-xs text-white font-medium rounded-r flex items-center";
    copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 mr-0.5"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>${copyButtonLabel}`;
    copyButton.setAttribute(
      "aria-label",
      `${copyButtonLabel} code to clipboard`
    );
    copyButton.setAttribute("title", `${copyButtonLabel} code to clipboard`);

    // Make sure we have the code element
    const code = codeBlock.querySelector("code");
    if (!code) continue; // Skip if no code element found

    // Get the original code content
    const clone = code.cloneNode(true);
    const originalCode = clone.innerText;

    // Toggle word wrap on click
    wrapButton.addEventListener("click", () => {
      const isPressed = wrapButton.getAttribute("aria-pressed") === "true";
      const newPressedState = !isPressed;
      wrapButton.setAttribute("aria-pressed", newPressedState.toString());

      if (newPressedState) {
        code.classList.add("whitespace-pre-wrap");
        code.style.whiteSpace = "pre-wrap"; // Fallback for direct styling
        wrapButton.classList.add("active-button");
        wrapButton.classList.add("bg-blue-600", "dark:bg-blue-800");
        wrapButton.classList.remove("bg-gray-500", "dark:bg-gray-700");
      } else {
        code.classList.remove("whitespace-pre-wrap");
        code.style.whiteSpace = "pre"; // Fallback for direct styling
        wrapButton.classList.remove("active-button");
        wrapButton.classList.remove("bg-blue-600", "dark:bg-blue-800");
        wrapButton.classList.add("bg-gray-500", "dark:bg-gray-700");
      }
    });

    // Copy to clipboard on click
    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(originalCode);
      const originalContent = copyButton.innerHTML;
      copyButton.innerText = "Copied!";
      copyButton.setAttribute("disabled", "");
      copyButton.classList.add("copied");

      setTimeout(() => {
        copyButton.innerHTML = originalContent;
        copyButton.removeAttribute("disabled");
        copyButton.classList.remove("copied");
      }, 2000);
    });

    // Add buttons to button group
    buttonGroup.appendChild(wrapButton);
    buttonGroup.appendChild(divider);
    buttonGroup.appendChild(copyButton);

    // Add button group to wrapper
    wrapper.appendChild(buttonGroup);

    // Replace code block with wrapper containing code block and buttons
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);
  }
}

// Initialize on first load
document.addEventListener("DOMContentLoaded", initCodeBlocks);

// Re-initialize on Astro page transitions
document.addEventListener("astro:page-load", initCodeBlocks);

// Fallback - try to initialize after a short delay
setTimeout(initCodeBlocks, 500);
