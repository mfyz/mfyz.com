/**
 * Mermaid Diagrams Enhancement Script
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
 * Process scale value - validates and cleans numeric scale values
 * @param {string} scaleValue - Raw scale value from parsing
 * @param {string} defaultValue - Default value to use if parsing fails
 * @returns {string} Processed scale value
 */
function processScaleValue(scaleValue, defaultValue = "1.8") {
  if (!scaleValue) {
    return defaultValue;
  }

  // Remove quotes and trim
  const cleanScale = scaleValue.replace(/["']/g, "").trim();

  // Validate that it's a valid decimal number
  // Allow: 1, 1.5, .5 but not: 10., abc, empty
  if (/^(\d+(\.\d+)?|\.\d+)$/.test(cleanScale)) {
    return cleanScale;
  }

  return defaultValue;
}

/**
 * Process scale position value - handles percentages and plain numbers
 * @param {string} scalePosValue - Raw scalePos value from parsing
 * @param {string} defaultValue - Default value to use if parsing fails
 * @returns {string} Processed scale position value
 */
function processScalePosValue(scalePosValue, defaultValue = "center") {
  if (!scalePosValue) {
    return defaultValue;
  }

  // Remove quotes and trim
  const cleanScalePos = scalePosValue.replace(/["']/g, "").trim();

  // Validate that it's a valid decimal number with optional %
  if (/^\d*\.?\d+%?$/.test(cleanScalePos)) {
    // Add % if it's missing
    return cleanScalePos.includes("%") ? cleanScalePos : cleanScalePos + "%";
  }

  return defaultValue;
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

  // Check if first line is a Mermaid comment with styling
  if (lines[0].trim().startsWith("%%")) {
    styling = parseMermaidComment(lines[0]);

    // Remove the styling comment from chart definition
    const remainingLines = lines.slice(1).join("\n").trim();
    chartDefinition = remainingLines || "";
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
  return chartDefinition.trim().toLowerCase().includes("pie title");
}

// ========== MERMAID DIAGRAMS MAIN SCRIPT ==========

// Initialize Mermaid diagrams
async function initMermaidDiagrams() {
  const allCodeBlocks = Array.from(document.querySelectorAll("pre code"));

  // Try multiple selectors to find mermaid blocks
  const selectors = [
    'pre[data-language="mermaid"] code',
    'pre code[class*="language-mermaid"]',
    'pre code[class*="mermaid"]',
    'pre code[data-language="mermaid"]',
    'pre[class*="language-mermaid"] code',
    'pre[class*="mermaid"] code',
  ];

  let mermaidBlocks = [];
  for (const selector of selectors) {
    const blocks = Array.from(document.querySelectorAll(selector));
    if (blocks.length > 0) {
      mermaidBlocks = blocks;
      break;
    }
  }

  // Fallback: look for code blocks that contain mermaid syntax
  if (mermaidBlocks.length === 0) {
    const potentialMermaidBlocks = allCodeBlocks.filter(block => {
      const text = block.textContent.trim().toLowerCase();
      return (
        text.startsWith("graph ") ||
        text.startsWith("flowchart ") ||
        text.startsWith("sequencediagram") ||
        text.startsWith("pie ") ||
        text.includes("participant ")
      );
    });

    if (potentialMermaidBlocks.length > 0) {
      mermaidBlocks = potentialMermaidBlocks;
    }
  }

  if (mermaidBlocks.length === 0) {
    return;
  }

  try {
    // Dynamically load Mermaid from CDN
    if (!window.mermaid) {
      // Create and load the script
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js";
      script.type = "module";

      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    // Initialize Mermaid with theme support
    const isDarkMode = document.documentElement.classList.contains("dark");

    mermaid.initialize({
      startOnLoad: false,
      theme: isDarkMode ? "dark" : "default",
      themeVariables: {
        primaryColor: "#8b5cf6",
        primaryBorderColor: "#7c3aed",
        secondaryColor: "#fbbf24",
        tertiaryColor: "#fff",
        background: isDarkMode ? "#1f2937" : "#ffffff",
        mainBkg: isDarkMode ? "#1f2937" : "#ffffff",
        secondBkg: isDarkMode ? "#374151" : "#f3f4f6",
        tertiaryBkg: isDarkMode ? "#4b5563" : "#e5e7eb",
        primaryTextColor: isDarkMode ? "#f3f4f6" : "#1f2937",
        lineColor: isDarkMode ? "#6b7280" : "#d1d5db",
        textColor: isDarkMode ? "#f3f4f6" : "#1f2937",
        mainContrastColor: isDarkMode ? "#f3f4f6" : "#1f2937",
        darkMode: isDarkMode,
      },
      flowchart: {
        htmlLabels: true,
        curve: "basis",
      },
      sequence: {
        diagramMarginX: 50,
        diagramMarginY: 30,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
      },
    });

    // Process each Mermaid code block
    for (let i = 0; i < mermaidBlocks.length; i++) {
      const codeElement = mermaidBlocks[i];
      const preElement = codeElement.parentElement;
      let chartDefinition = codeElement.textContent.trim();

      if (!chartDefinition) continue;

      try {
        // Store reference to button group for restoration if needed
        const codeBlockWrapper = preElement.parentElement;
        let buttonGroup = null;
        if (
          codeBlockWrapper &&
          codeBlockWrapper.classList.contains("code-block-wrapper")
        ) {
          buttonGroup = codeBlockWrapper.querySelector(".code-buttons-group");
        }

        // Parse styling attributes using our utility functions
        let customWidth = "";
        let customHeight = "";
        let customAlign = "";
        let showBorder = false;
        let customScale = "";
        let customScalePos = "";

        // Auto-detect pie charts for compact mode
        const isPieChartFlag = isPieChart(chartDefinition);

        // Method 1: Check for attributes in data attributes
        if (preElement.dataset.width) {
          customWidth =
            preElement.dataset.width.includes("%") ||
            preElement.dataset.width.includes("px")
              ? preElement.dataset.width
              : `${preElement.dataset.width}px`;
        }
        if (preElement.dataset.height) {
          customHeight =
            preElement.dataset.height.includes("%") ||
            preElement.dataset.height.includes("px")
              ? preElement.dataset.height
              : `${preElement.dataset.height}px`;
        }
        if (preElement.dataset.align) {
          customAlign = preElement.dataset.align;
        }
        if (preElement.dataset.border !== undefined) {
          showBorder = true;
        }
        if (preElement.dataset.scale) {
          customScale = preElement.dataset.scale;
        }
        if (preElement.dataset.scalePos) {
          customScalePos = preElement.dataset.scalePos;
        }

        // Method 2: Parse styling from HTML comment before the pre element
        let previousNode = preElement.previousSibling;
        while (
          previousNode &&
          previousNode.nodeType === 3 &&
          !previousNode.textContent.trim()
        ) {
          // Skip whitespace text nodes
          previousNode = previousNode.previousSibling;
        }

        if (previousNode && previousNode.nodeType === 8) {
          // Comment node - use our parser utility
          const comment = previousNode.textContent.trim();
          const htmlAttributes = parseHtmlComment(comment);

          if (htmlAttributes.width && !customWidth) {
            customWidth = htmlAttributes.width;
          }
          if (htmlAttributes.height && !customHeight) {
            customHeight = htmlAttributes.height;
          }
          if (htmlAttributes.align && !customAlign) {
            customAlign = htmlAttributes.align;
          }
          if (htmlAttributes.border && !showBorder) {
            showBorder = htmlAttributes.border;
          }
          if (htmlAttributes.scale && !customScale) {
            customScale = htmlAttributes.scale;
          }
          if (htmlAttributes.scalePos && !customScalePos) {
            customScalePos = htmlAttributes.scalePos;
          }
        }

        // Method 3: Parse styling from first line of code using our utility
        const {
          chartDefinition: cleanChartDefinition,
          styling: mermaidAttributes,
        } = extractMermaidStyling(chartDefinition);

        if (cleanChartDefinition) {
          chartDefinition = cleanChartDefinition;
        }

        // Apply Mermaid comment attributes with precedence
        if (mermaidAttributes.width && !customWidth) {
          customWidth = mermaidAttributes.width;
        }
        if (mermaidAttributes.height && !customHeight) {
          customHeight = mermaidAttributes.height;
        }
        if (mermaidAttributes.align && !customAlign) {
          customAlign = mermaidAttributes.align;
        }
        if (mermaidAttributes.border && !showBorder) {
          showBorder = mermaidAttributes.border;
        }
        if (mermaidAttributes.scale && !customScale) {
          customScale = mermaidAttributes.scale;
        }
        if (mermaidAttributes.scalePos && !customScalePos) {
          customScalePos = mermaidAttributes.scalePos;
        }

        // Create container for the diagram
        const diagramContainer = document.createElement("div");
        diagramContainer.className =
          "mermaid-container my-8 w-full overflow-x-auto";

        // Apply custom width if specified
        if (customWidth) {
          diagramContainer.style.width = customWidth;
          diagramContainer.style.maxWidth = customWidth;
        }

        // Apply alignment if specified
        if (customAlign === "center") {
          // Only center if we have a custom width, otherwise it doesn't make sense
          if (customWidth) {
            diagramContainer.style.margin = "2rem auto";
            diagramContainer.style.display = "block";
            diagramContainer.classList.remove("w-full");
          }
        } else if (customAlign === "left") {
          if (customWidth) {
            diagramContainer.style.marginLeft = "0";
            diagramContainer.style.marginRight = "auto";
            diagramContainer.classList.remove("w-full");
          }
        } else if (customAlign === "right") {
          if (customWidth) {
            diagramContainer.style.marginLeft = "auto";
            diagramContainer.style.marginRight = "0";
            diagramContainer.classList.remove("w-full");
          }
        }

        const diagramWrapper = document.createElement("div");
        let wrapperClasses = "mermaid-diagram rounded-lg min-h-[100px]";

        // Apply border and padding styling
        if (showBorder) {
          wrapperClasses +=
            " border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900 p-4";
        } else {
          wrapperClasses += " bg-transparent";
        }

        // Force left alignment for the content inside the wrapper
        if (!customAlign || (customAlign && !customWidth)) {
          wrapperClasses += " text-left";
        }

        diagramWrapper.className = wrapperClasses;

        // Apply custom height if specified
        if (customHeight) {
          diagramWrapper.style.height = customHeight;
          diagramWrapper.style.minHeight = customHeight;
        }

        // Generate unique ID for this diagram
        const uniqueId = `mermaid-diagram-${i}-${Date.now()}`;

        // Render the diagram first (before replacing the element)
        const { svg } = await mermaid.render(uniqueId, chartDefinition);

        // Only if rendering succeeds, replace the code block
        diagramWrapper.innerHTML = svg;
        diagramContainer.appendChild(diagramWrapper);
        preElement.parentNode.replaceChild(diagramContainer, preElement);

        // Hide copy/wrap buttons now that we've successfully replaced the element
        if (buttonGroup) {
          buttonGroup.style.display = "none";
        }

        // Make SVG responsive (unless custom height is specified)
        const svgElement = diagramWrapper.querySelector("svg");
        if (svgElement) {
          if (!customHeight) {
            svgElement.removeAttribute("height");
            svgElement.style.height = "auto";
          }
          if (!customWidth) {
            svgElement.style.maxWidth = "100%";
          }

          // Apply custom dimensions directly to SVG if specified
          if (customWidth) {
            svgElement.style.width = customWidth;
            svgElement.style.maxWidth = customWidth; // Override Mermaid's max-width
          }
          if (customHeight) {
            svgElement.style.height = customHeight;
            svgElement.style.maxHeight = customHeight; // Override Mermaid's max-height
          }

          // Ensure left alignment when no explicit centering is requested
          if (!customAlign || (customAlign && !customWidth)) {
            svgElement.style.display = "block";
            svgElement.style.marginLeft = "0";
            svgElement.style.marginRight = "auto";
          }

          // Apply compact mode for pie charts automatically using our utility
          if (isPieChartFlag) {
            // Parse and apply custom scale using our utility
            const scaleValue = processScaleValue(customScale, "1.8");

            // Parse and apply custom scale position using our utility
            const scalePosValue = processScalePosValue(
              customScalePos,
              "center"
            );

            // Scale up the pie chart content and crop the whitespace
            svgElement.style.transform = `scale(${scaleValue})`;
            svgElement.style.transformOrigin = `${scalePosValue} center`;

            // Adjust the container to hide overflow
            const container = svgElement.parentElement;
            if (container) {
              container.style.overflow = "hidden";
            }
          }
        }
      } catch (error) {
        console.warn(
          `Mermaid rendering failed for diagram ${i + 1}, falling back to code block:`,
          error
        );

        // Don't replace anything - keep the original code block
      }
    }
  } catch (error) {
    console.warn(
      "Failed to load Mermaid library, code blocks will remain as code blocks:",
      error
    );

    // Restore copy/wrap buttons for all mermaid code blocks since they'll stay as code blocks
    mermaidBlocks.forEach(codeElement => {
      const preElement = codeElement.parentElement;
      const codeBlockWrapper = preElement.parentElement;
      if (
        codeBlockWrapper &&
        codeBlockWrapper.classList.contains("code-block-wrapper")
      ) {
        const buttonGroup = codeBlockWrapper.querySelector(
          ".code-buttons-group"
        );
        if (buttonGroup && buttonGroup.style.display === "none") {
          buttonGroup.style.display = "";
        }
      }
    });
  }
}

// Initialize on first load
document.addEventListener("DOMContentLoaded", initMermaidDiagrams);

// Re-initialize on Astro page transitions
document.addEventListener("astro:page-load", initMermaidDiagrams);

// Fallback - try to initialize after a short delay
setTimeout(initMermaidDiagrams, 1000);
