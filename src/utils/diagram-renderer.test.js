import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";

const source = readFileSync(
  new URL("../../public/js/mermaid.js", import.meta.url),
  "utf8"
);

function setup(html, mount) {
  const dom = new JSDOM(html, { runScripts: "outside-only" });
  dom.window.setTimeout = () => {};
  dom.window.console.warn = vi.fn();
  if (mount) dom.window.pele = { mount };
  dom.window.eval(source);
  return dom;
}

function successfulMount(element) {
  element.innerHTML = '<svg class="pele" viewBox="0 0 200 100"></svg>';
  return { destroy: vi.fn() };
}

describe("Pele integration", () => {
  it("preserves init directives and ordinary comments", () => {
    const dom = setup("");
    for (const text of [
      '%%{init: {"flowchart": {"curve": "basis"}}}%%\nflowchart TD\nA --> B',
      "%% A useful source comment\nflowchart TD\nA --> B",
    ]) {
      expect(dom.window.extractMermaidStyling(text).chartDefinition).toBe(text);
    }
    expect(dom.window.isPieChart('pie showData\n"A": 1')).toBe(true);
    expect(dom.window.isPieChart("flowchart TD\nA[pie title]")).toBe(false);
    dom.window.close();
  });

  it("retains data > HTML > Mermaid formatting precedence", () => {
    const dom = setup(
      '<div><!-- width="500" align="right" --><pre data-width="420" data-border><code></code></pre></div>'
    );
    const result = dom.window.getDiagramStyling(
      dom.window.document.querySelector("pre"),
      '%% width=600 height=300 center scale=2.7 scalePos=55\npie title Day\n"A": 1'
    );
    expect({ ...result.styling }).toEqual({
      width: "420px",
      height: "300px",
      align: "right",
      border: true,
      scale: "2.7",
      scalePos: "55",
    });
    expect(result.chartDefinition).toMatch(/^pie/);
    dom.window.close();
  });

  it("mounts each block once across overlapping lifecycle events and cleans up", async () => {
    const destroy = vi.fn();
    const mount = vi.fn(element => ({ ...successfulMount(element), destroy }));
    const dom = setup(
      '<pre data-language="mermaid"><code>flowchart TD\nA --> B</code></pre>',
      mount
    );
    await Promise.all([
      dom.window.initMermaidDiagrams(),
      dom.window.initMermaidDiagrams(),
    ]);
    expect(mount).toHaveBeenCalledTimes(1);
    expect(
      dom.window.document.querySelectorAll(".mermaid-container")
    ).toHaveLength(1);
    dom.window.document.dispatchEvent(
      new dom.window.Event("astro:before-swap")
    );
    expect(destroy).toHaveBeenCalledTimes(1);
    dom.window.close();
  });

  it("retains the source and copy controls with a visible error if rendering fails", async () => {
    const destroy = vi.fn();
    const dom = setup(
      '<div class="code-block-wrapper"><div class="code-buttons-group"></div><pre data-language="mermaid"><code>unsupportedDiagram</code></pre></div>',
      () => ({ error: new Error("unsupported"), destroy })
    );
    await dom.window.initMermaidDiagrams();
    expect(dom.window.document.querySelector("pre").textContent).toBe(
      "unsupportedDiagram"
    );
    expect(
      dom.window.document.querySelector(".diagram-error").textContent
    ).toContain("original Mermaid source");
    expect(
      dom.window.document.querySelector(".code-buttons-group").style.display
    ).toBe("");
    expect(dom.window.document.querySelector(".mermaid-container")).toBeNull();
    expect(destroy).toHaveBeenCalledOnce();
    dom.window.close();
  });

  it("reports failed library loading and leaves source available", async () => {
    const dom = setup(
      '<pre data-language="mermaid"><code>flowchart TD\nA --> B</code></pre>'
    );
    const task = dom.window.initMermaidDiagrams();
    dom.window.document
      .querySelector("script")
      .dispatchEvent(new dom.window.Event("error"));
    await task;
    expect(dom.window.document.querySelector("pre")).not.toBeNull();
    expect(dom.window.document.querySelector(".diagram-error")).not.toBeNull();
    dom.window.close();
  });

  it("fits scaled legacy pies and discloses the formatting difference", async () => {
    const dom = setup(
      '<pre data-language="mermaid"><code>%% width=550 height=400 center border scale=2.7 scalePos=55\npie title Day\n"A": 1</code></pre>',
      successfulMount
    );
    await dom.window.initMermaidDiagrams();
    const container = dom.window.document.querySelector(".mermaid-container");
    expect(container.style.width).toBe("550px");
    expect(container.style.marginLeft).toBe("auto");
    expect(container.querySelector(".diagram-card").style.height).toBe("400px");
    expect(
      container.querySelector(".diagram-compatibility-note").textContent
    ).toContain("not applied");
    expect(container.querySelector("svg").style.transform).toBe("");
    dom.window.close();
  });
});
