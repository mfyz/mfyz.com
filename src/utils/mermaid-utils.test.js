import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import vm from "node:vm";

// Exercise the shipped script instead of copies of its parser functions.
const source = readFileSync(
  new URL("../../public/js/mermaid.js", import.meta.url),
  "utf8"
);
const context = vm.createContext({
  document: { addEventListener() {} },
  setTimeout() {},
});
vm.runInContext(source, context);
const { parseMermaidComment, extractMermaidStyling, isPieChart } = context;

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
