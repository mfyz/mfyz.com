import { describe, it, expect } from "vitest";

// Inline the utility functions for testing
// These are extracted from the public/js/mermaid.js file

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

function isPieChart(chartDefinition) {
  return chartDefinition.trim().toLowerCase().includes("pie title");
}

describe("Mermaid Utility Functions", () => {
  describe("parseMermaidComment", () => {
    it("should parse basic width and height", () => {
      const result = parseMermaidComment("%% width=500 height=300");
      expect(result).toEqual({
        width: "500px",
        height: "300px",
      });
    });

    it("should handle width and height with units", () => {
      const result = parseMermaidComment("%% width=500px height=50%");
      expect(result).toEqual({
        width: "500px",
        height: "50%",
      });
    });

    it("should parse center alignment", () => {
      const result = parseMermaidComment("%% width=400 center");
      expect(result).toEqual({
        width: "400px",
        align: "center",
      });
    });

    it("should parse explicit alignment", () => {
      const result = parseMermaidComment("%% width=400 align=right");
      expect(result).toEqual({
        width: "400px",
        align: "right",
      });
    });

    it("should parse border flag", () => {
      const result = parseMermaidComment("%% width=400 border");
      expect(result).toEqual({
        width: "400px",
        border: true,
      });
    });

    it("should parse scale with decimal values", () => {
      const result = parseMermaidComment("%% scale=2.7");
      expect(result).toEqual({
        scale: "2.7",
      });
    });

    it("should parse scalePos with percentage", () => {
      const result = parseMermaidComment("%% scalePos=60%");
      expect(result).toEqual({
        scalePos: "60%",
      });
    });

    it("should parse quoted values", () => {
      const result = parseMermaidComment("%% width=\"500\" height='300'");
      expect(result).toEqual({
        width: "500px",
        height: "300px",
      });
    });

    it("should handle mixed attributes", () => {
      const result = parseMermaidComment(
        "%% width=600 height=400px center border scale=1.5 scalePos=75%"
      );
      expect(result).toEqual({
        width: "600px",
        height: "400px",
        align: "center",
        border: true,
        scale: "1.5",
        scalePos: "75%",
      });
    });

    it("should return empty object for non-comment lines", () => {
      const result = parseMermaidComment("graph TD");
      expect(result).toEqual({});
    });

    it("should return empty object for empty input", () => {
      const result = parseMermaidComment("");
      expect(result).toEqual({});
    });
  });

  describe("processScaleValue", () => {
    it("should return valid decimal values", () => {
      expect(processScaleValue("2.7")).toBe("2.7");
      expect(processScaleValue("1.5")).toBe("1.5");
      expect(processScaleValue("0.8")).toBe("0.8");
      expect(processScaleValue(".5")).toBe(".5");
      expect(processScaleValue("3")).toBe("3");
    });

    it("should clean quoted values", () => {
      expect(processScaleValue('"2.5"')).toBe("2.5");
      expect(processScaleValue("'1.8'")).toBe("1.8");
    });

    it("should return default for invalid values", () => {
      expect(processScaleValue("abc")).toBe("1.8");
      expect(processScaleValue("10.")).toBe("1.8");
      expect(processScaleValue("")).toBe("1.8");
      expect(processScaleValue(null)).toBe("1.8");
    });

    it("should use custom default value", () => {
      expect(processScaleValue("invalid", "2.0")).toBe("2.0");
    });
  });

  describe("processScalePosValue", () => {
    it("should handle percentage values", () => {
      expect(processScalePosValue("60%")).toBe("60%");
      expect(processScalePosValue("75%")).toBe("75%");
    });

    it("should add percentage to plain numbers", () => {
      expect(processScalePosValue("60")).toBe("60%");
      expect(processScalePosValue("75.5")).toBe("75.5%");
    });

    it("should clean quoted values", () => {
      expect(processScalePosValue('"60%"')).toBe("60%");
      expect(processScalePosValue("'75'")).toBe("75%");
    });

    it("should handle decimal percentages", () => {
      expect(processScalePosValue("67.5%")).toBe("67.5%");
      expect(processScalePosValue("67.5")).toBe("67.5%");
    });

    it("should return default for invalid values", () => {
      expect(processScalePosValue("abc")).toBe("center");
      expect(processScalePosValue("")).toBe("center");
      expect(processScalePosValue(null)).toBe("center");
    });

    it("should use custom default value", () => {
      expect(processScalePosValue("invalid", "50%")).toBe("50%");
    });
  });

  describe("extractMermaidStyling", () => {
    it("should extract styling from first line comment", () => {
      const chartContent =
        "%% width=500 height=300 center\ngraph TD\n  A --> B";
      const result = extractMermaidStyling(chartContent);

      expect(result.styling).toEqual({
        width: "500px",
        height: "300px",
        align: "center",
      });
      expect(result.chartDefinition).toBe("graph TD\n  A --> B");
    });

    it("should return original content if no styling comment", () => {
      const chartContent = "graph TD\n  A --> B";
      const result = extractMermaidStyling(chartContent);

      expect(result.styling).toEqual({});
      expect(result.chartDefinition).toBe("graph TD\n  A --> B");
    });

    it("should handle empty input", () => {
      const result = extractMermaidStyling("");

      expect(result.styling).toEqual({});
      expect(result.chartDefinition).toBe("");
    });

    it("should handle only comment line", () => {
      const result = extractMermaidStyling("%% width=400");

      expect(result.styling).toEqual({
        width: "400px",
      });
      expect(result.chartDefinition).toBe("");
    });
  });

  describe("isPieChart", () => {
    it("should detect pie charts", () => {
      expect(isPieChart("pie title My Pie Chart")).toBe(true);
      expect(isPieChart("PIE TITLE Another Chart")).toBe(true);
      expect(isPieChart("  pie title   Spaced Chart  ")).toBe(true);
    });

    it("should not detect non-pie charts", () => {
      expect(isPieChart("graph TD")).toBe(false);
      expect(isPieChart("flowchart LR")).toBe(false);
      expect(isPieChart("sequenceDiagram")).toBe(false);
      expect(isPieChart("some pie in the text")).toBe(false);
      expect(isPieChart("")).toBe(false);
    });
  });
});
