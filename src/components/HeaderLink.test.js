import { describe, it, expect, beforeEach } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import HeaderLink from "./HeaderLink.astro";

describe("HeaderLink functionality", () => {
  it(`should render correctly with all props`, async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(HeaderLink, {
      request: new Request("https://example.com"),
      props: {
        href: "/tr",
        "aria-label": "Blog link",
        target: "_blank",
        rel: "noopener",
      },
      slots: { default: "Link Text" },
    });
    // console.log('--> result', result)

    expect(result).toContain("Link Text");
    expect(result).toContain(`data-link-active="false"`);
    expect(result).toContain(`aria-label="Blog link"`);
    expect(result).toContain(`target="_blank"`);
    expect(result).toContain(`rel="noopener"`);
  });

  it(`should render correct styling tags`, async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(HeaderLink, {
      request: new Request("https://example.com"),
      props: { href: "/tr" },
      slots: { default: "Link Text" },
    });

    expect(result).toContain("Link Text");
    expect(result).toContain(`inline-block`);
    expect(result).toContain(`dark:text-gray-300`);
    expect(result).toContain(`hover:text-primary`);
  });

  it(`should correctly determine active state`, async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(HeaderLink, {
      request: new Request("https://example.com/tr"),
      props: { href: "/tr" },
      slots: { default: "Link Text" },
    });

    expect(result).toContain("Link Text");
    expect(result).toContain(`data-link-active="true"`);
  });
});
