import { SITE } from "../consts";

// User-agent: Googlebot
// Disallow: /nogooglebot/

const robots = `
User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", `${SITE.website}/`).href}
`.trim();

export const GET = () =>
  new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
