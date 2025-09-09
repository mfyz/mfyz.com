import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Mermaid from "./Mermaid.astro";

describe("Mermaid component functionality", () => {
  let container;

  beforeEach(async () => {
    container = await AstroContainer.create();

    // Mock the dynamic import for mermaid
    global.window = {
      mermaidLoaded: false,
      initializeMermaid: vi.fn(),
    };

    // Mock document for the DOM operations
    global.document = {
      documentElement: {
        classList: {
          contains: vi.fn().mockReturnValue(false), // Mock light mode
        },
      },
      readyState: "complete",
      addEventListener: vi.fn(),
      querySelectorAll: vi.fn().mockReturnValue([]),
    };
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
  });

  it("should render with basic mermaid content", async () => {
    const chartContent = `
graph TD
    A[Start] --> B[End]
    `;

    const result = await container.renderToString(Mermaid, {
      slots: { default: chartContent },
    });

    // Check basic structure is rendered
    expect(result).toContain("mermaid-container");
    expect(result).toContain("mermaid-diagram");
    expect(result).toContain("data-mermaid");
    expect(result).toContain("Loading diagram...");

    // Check that the chart content is properly stored in data attribute
    expect(result).toMatch(
      /data-mermaid="[^"]*graph TD[^"]*A\[Start\][^"]*B\[End\][^"]*"/
    );
  });

  it("should render with title when provided", async () => {
    const chartContent = `
graph LR
    A --> B
    `;

    const result = await container.renderToString(Mermaid, {
      props: {
        title: "Test Diagram",
      },
      slots: { default: chartContent },
    });

    expect(result).toContain("Test Diagram");
    expect(result).toContain(
      "text-sm font-medium text-gray-600 dark:text-gray-400"
    );
  });

  it("should render without title when not provided", async () => {
    const chartContent = `
pie title "Test Pie"
    "A" : 45
    "B" : 55
    `;

    const result = await container.renderToString(Mermaid, {
      slots: { default: chartContent },
    });

    // Should not contain title styling when no title is provided
    expect(result).not.toMatch(/<h4[^>]*>/);
    expect(result).toContain("mermaid-diagram");
  });

  it("should handle empty content gracefully", async () => {
    const result = await container.renderToString(Mermaid, {
      slots: { default: "" },
    });

    expect(result).toContain("mermaid-container");
    expect(result).toContain("mermaid-diagram");
    expect(result).toContain("data-mermaid");
  });

  it("should strip HTML tags from slot content", async () => {
    const chartContentWithHtml = `
<p>graph TD</p>
<span>A[Start] --> B[End]</span>
    `;

    const result = await container.renderToString(Mermaid, {
      slots: { default: chartContentWithHtml },
    });

    // Should strip HTML and preserve only text content
    expect(result).toMatch(
      /data-mermaid="[^"]*graph TD[^"]*A\[Start\][^"]*B\[End\][^"]*"/
    );
    expect(result).not.toContain("<p>");
    expect(result).not.toContain("<span>");
  });

  it("should generate unique diagram IDs", async () => {
    const chartContent = "graph TD\n    A --> B";

    const result1 = await container.renderToString(Mermaid, {
      slots: { default: chartContent },
    });

    const result2 = await container.renderToString(Mermaid, {
      slots: { default: chartContent },
    });

    // Extract IDs from both results
    const id1Match = result1.match(/id="(mermaid-[^"]+)"/);
    const id2Match = result2.match(/id="(mermaid-[^"]+)"/);

    expect(id1Match).toBeTruthy();
    expect(id2Match).toBeTruthy();
    expect(id1Match[1]).not.toBe(id2Match[1]); // IDs should be different
  });

  it("should include proper CSS classes for styling", async () => {
    const chartContent = "flowchart LR\n    A --> B";

    const result = await container.renderToString(Mermaid, {
      slots: { default: chartContent },
    });

    // Check for essential CSS classes
    expect(result).toContain("mermaid-container my-8");
    expect(result).toContain("bg-white dark:bg-gray-900");
    expect(result).toContain("rounded-lg p-4 shadow-sm");
    expect(result).toContain("border border-gray-200 dark:border-gray-700");
  });

  it("should include loading spinner", async () => {
    const chartContent = "sequenceDiagram\n    A->>B: Hello";

    const result = await container.renderToString(Mermaid, {
      slots: { default: chartContent },
    });

    expect(result).toContain("animate-spin");
    expect(result).toContain("Loading diagram...");
    expect(result).toContain("svg"); // Loading spinner SVG
  });

  it("should handle complex mermaid syntax", async () => {
    const complexChart = `
sequenceDiagram
    participant A as Alice
    participant B as Bob
    A->>+B: Hello Bob, how are you?
    B-->>-A: Great!
    Note over A,B: This is a note
    `;

    const result = await container.renderToString(Mermaid, {
      props: { title: "Complex Sequence" },
      slots: { default: complexChart },
    });

    expect(result).toContain("Complex Sequence");
    expect(result).toContain("mermaid-diagram");
    // Check that complex syntax is preserved in data attribute
    expect(result).toMatch(
      /data-mermaid="[^"]*sequenceDiagram[^"]*participant[^"]*"/
    );
  });

  it("should maintain whitespace in chart definitions", async () => {
    const chartWithSpacing = `
    graph TD
        A[Start] --> B{Decision}
        B -->|Yes| C[Action 1]
        B -->|No| D[Action 2]
        C --> E[End]
        D --> E
    `;

    const result = await container.renderToString(Mermaid, {
      slots: { default: chartWithSpacing },
    });

    // Should preserve the essential structure and spacing
    expect(result).toMatch(
      /data-mermaid="[^"]*graph TD[^"]*A\[Start\][^"]*B\{Decision\}[^"]*"/
    );
  });
});
