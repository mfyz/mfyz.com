/**
 * Mermaid-compatible diagrams rendered with Pele
 *
 * Automatically detects code blocks with 'mermaid' language and converts them to diagrams
 * Includes built-in parsing utilities for styling attributes
 */

// ========== MERMAID PARSER UTILITIES ==========

/**
 * Parse styling attributes from a Mermaid comment line (starts with %%)
 * @param {string} commentLine - The comment line to parse
 * @returns {object} Parsed styling attributes
 */
function parseMermaidComment(commentLine) {
  if (!commentLine || !commentLine.trim().startsWith("%%")) {
    return {};
  }

  const line = commentLine.trim();
  const attributes = {};

  // Parse width (supports pixels, percentages, and plain numbers)
  const widthMatch = line.match(/width=["']?([^"'\s]+)["']?/i);
  if (widthMatch) {
    const width = widthMatch[1];
    attributes.width =
      width.includes("%") || width.includes("px") ? width : `${width}px`;
  }

  // Parse height (supports pixels, percentages, and plain numbers)
  const heightMatch = line.match(/height=["']?([^"'\s]+)["']?/i);
  if (heightMatch) {
    const height = heightMatch[1];
    attributes.height =
      height.includes("%") || height.includes("px") ? height : `${height}px`;
  }

  // Parse alignment
  const alignMatch = line.match(/align=["']?([^"'\s]+)["']?/i);
  if (alignMatch) {
    attributes.align = alignMatch[1];
  }

  // Check for center keyword
  if (line.match(/\bcenter\b/i)) {
    attributes.align = "center";
  }

  // Check for border keyword
  if (line.match(/\bborder\b/i)) {
    attributes.border = true;
  }

  // Parse scale (supports decimals like 2.7)
  const scaleMatch = line.match(/scale=["']?([\d.]+%?)["']?/i);
  if (scaleMatch) {
    attributes.scale = scaleMatch[1];
  }

  // Parse scalePos (supports percentages and decimals like 60% or 55)
  const scalePosMatch = line.match(/scalePos=["']?([\d.]+%?)["']?/i);
  if (scalePosMatch) {
    attributes.scalePos = scalePosMatch[1];
  }

  return attributes;
}

/**
 * Parse styling attributes from HTML comment content
 * @param {string} commentContent - The HTML comment content
 * @returns {object} Parsed styling attributes
 */
function parseHtmlComment(commentContent) {
  if (!commentContent) {
    return {};
  }

  const attributes = {};

  // Parse quoted attributes (e.g., width="500")
  const widthMatch = commentContent.match(/width=["']([^"']+)["']/i);
  if (widthMatch) {
    const width = widthMatch[1];
    attributes.width =
      width.includes("%") || width.includes("px") ? width : `${width}px`;
  }

  const heightMatch = commentContent.match(/height=["']([^"']+)["']/i);
  if (heightMatch) {
    const height = heightMatch[1];
    attributes.height =
      height.includes("%") || height.includes("px") ? height : `${height}px`;
  }

  const alignMatch = commentContent.match(/align=["']([^"']+)["']/i);
  if (alignMatch) {
    attributes.align = alignMatch[1];
  }

  // Check for border keyword
  if (commentContent.match(/\bborder\b/i)) {
    attributes.border = true;
  }

  // Parse scale and scalePos with improved regex
  const scaleMatch = commentContent.match(/scale=["']?([\d.]+%?)["']?/i);
  if (scaleMatch) {
    attributes.scale = scaleMatch[1];
  }

  const scalePosMatch = commentContent.match(/scalePos=["']?([\d.]+%?)["']?/i);
  if (scalePosMatch) {
    attributes.scalePos = scalePosMatch[1];
  }

  return attributes;
}

/**
 * Extract chart definition and styling from Mermaid code block content
 * @param {string} chartContent - Full chart content including potential styling comments
 * @returns {object} Object with chartDefinition and styling attributes
 */
function extractMermaidStyling(chartContent) {
  if (!chartContent) {
    return { chartDefinition: "", styling: {} };
  }

  const lines = chartContent.split("\n");
  let styling = {};
  let chartDefinition = chartContent;

  // Remove only our formatting comment, not Mermaid init directives or prose comments.
  if (lines[0].trim().startsWith("%%") && !lines[0].trim().startsWith("%%{")) {
    styling = parseMermaidComment(lines[0]);
    if (Object.keys(styling).length) {
      chartDefinition = lines.slice(1).join("\n").trim();
    }
  }

  return {
    chartDefinition,
    styling,
  };
}

/**
 * Detect if a chart is a pie chart
 * @param {string} chartDefinition - The Mermaid chart definition
 * @returns {boolean} True if it's a pie chart
 */
function isPieChart(chartDefinition) {
  return /^(?:%%[^\n]*\n\s*)*pie(?:\s|$)/i.test(chartDefinition.trim());
}

// ========== DIAGRAM RENDERING ==========

let pelePromise;
const mountedDiagrams = new Set();
const pendingBlocks = new WeakSet();
let diagramId = 0;

function loadPele() {
  if (window.pele) return Promise.resolve(window.pele);
  if (!pelePromise) {
    pelePromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/pele@1.13.0/dist/pele.global.js";
      script.onload = () => resolve(window.pele);
      script.onerror = () => {
        script.remove();
        pelePromise = undefined;
        reject(new Error("Could not load Pele"));
      };
      document.head.appendChild(script);
    });
  }
  return pelePromise;
}

function getDiagramStyling(preElement, source) {
  let previousNode = preElement.previousSibling;
  while (previousNode?.nodeType === 3 && !previousNode.textContent.trim()) {
    previousNode = previousNode.previousSibling;
  }
  const htmlStyling =
    previousNode?.nodeType === 8
      ? parseHtmlComment(previousNode.textContent)
      : {};
  const { chartDefinition, styling } = extractMermaidStyling(source);
  const attributes = { ...styling, ...htmlStyling };
  for (const key of ["width", "height", "align", "scale", "scalePos"]) {
    if (preElement.dataset[key]) {
      attributes[key] = preElement.dataset[key];
    }
  }
  if (preElement.dataset.border !== undefined) attributes.border = true;
  for (const key of ["width", "height"]) {
    if (attributes[key] && /^\d+(?:\.\d+)?$/.test(attributes[key])) {
      attributes[key] += "px";
    }
  }
  return { chartDefinition, styling: attributes };
}

function showDiagramError(preElement, error) {
  console.warn("Pele could not render this diagram; source retained:", error);
  if (preElement.previousElementSibling?.classList.contains("diagram-error"))
    return;
  const message = document.createElement("p");
  message.className = "diagram-error";
  message.textContent =
    "Diagram unavailable in Pele. The original Mermaid source is shown below.";
  preElement.before(message);
}

async function initMermaidDiagrams() {
  const blocks = [
    ...document.querySelectorAll(
      [
        'pre[data-language="mermaid"] code',
        "pre code.language-mermaid",
        'pre code[data-language="mermaid"]',
        "pre.language-mermaid code",
        "pre.mermaid code",
      ].join(",")
    ),
  ];
  // Older posts may not have language metadata. Avoid matching prose or examples
  // that merely mention a participant somewhere in a non-Mermaid code block.
  if (!blocks.length) {
    blocks.push(
      ...[...document.querySelectorAll("pre code")].filter(block =>
        /^(?:%%[^\n]*\n\s*)*(?:graph\s|flowchart\s|sequenceDiagram\b|pie\b)/i.test(
          block.textContent.trim()
        )
      )
    );
  }
  const pending = blocks.filter(block => !pendingBlocks.has(block));
  if (!pending.length) return;
  pending.forEach(block => pendingBlocks.add(block));
  let pele;
  try {
    pele = await loadPele();
    await document.fonts?.ready;
  } catch (error) {
    pending.forEach(block => {
      pendingBlocks.delete(block);
      if (block.isConnected) showDiagramError(block.parentElement, error);
    });
    return;
  }

  for (const codeElement of pending) {
    if (!codeElement.isConnected) continue;
    const preElement = codeElement.parentElement;
    const { chartDefinition, styling } = getDiagramStyling(
      preElement,
      codeElement.textContent.trim()
    );
    if (!chartDefinition) continue;
    const container = document.createElement("div");
    container.className = "mermaid-container";
    if (styling.width) container.style.width = styling.width;
    if (styling.width && ["left", "center", "right"].includes(styling.align)) {
      container.style.marginLeft = styling.align === "left" ? "0" : "auto";
      container.style.marginRight = styling.align === "right" ? "0" : "auto";
    }
    const wrapper = document.createElement("div");
    wrapper.className = "mermaid-diagram";
    if (styling.border) wrapper.classList.add("diagram-card");
    if (styling.height) wrapper.style.height = styling.height;
    container.appendChild(wrapper);
    const previousError = preElement.previousElementSibling;
    // Mount in the document so Pele measures the actual available width.
    preElement.before(container);
    let mounted;
    try {
      mounted = pele.mount(wrapper, chartDefinition, {
        idPrefix: `blog-diagram-${++diagramId}`,
        zoom: "auto",
        onRender: () => {
          const svg = wrapper.querySelector("svg");
          if (svg && styling.height) {
            svg.style.height = "100%";
            svg.style.maxHeight = "100%";
            svg.style.width = "100%";
          }
        },
      });
      if (mounted.error) throw mounted.error;
      mountedDiagrams.add(mounted);
      if (isPieChart(chartDefinition) && (styling.scale || styling.scalePos)) {
        const note = document.createElement("p");
        note.className = "diagram-compatibility-note";
        note.textContent =
          "This pie fits the complete chart. Legacy scale/scalePos cropping is not applied in Pele.";
        container.appendChild(note);
      }
      if (previousError?.classList.contains("diagram-error"))
        previousError.remove();
      const codeBlockWrapper = preElement.parentElement;
      preElement.replaceWith(container);
      if (codeBlockWrapper.classList.contains("code-block-wrapper")) {
        const buttons = codeBlockWrapper.querySelector(".code-buttons-group");
        if (buttons) buttons.style.display = "none";
      }
    } catch (error) {
      mounted?.destroy();
      container.remove();
      showDiagramError(preElement, error);
    }
  }
}

document.addEventListener("DOMContentLoaded", initMermaidDiagrams);
document.addEventListener("astro:page-load", initMermaidDiagrams);
document.addEventListener("astro:before-swap", () => {
  mountedDiagrams.forEach(diagram => diagram.destroy());
  mountedDiagrams.clear();
});
setTimeout(initMermaidDiagrams, 1000);
