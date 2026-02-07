/**
 * Prebuild script: generates short URL redirects in vercel.json.
 *
 * Reads all blog posts, generates a deterministic 4-char hash per slug,
 * checks for collisions, and writes redirect rules to vercel.json.
 *
 * Run before `astro build` via: node scripts/generate-redirects.js
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";
import { shortHash } from "../src/utils/shortHash.js";

const CONTENT_DIR = "src/content/blog";
const VERCEL_JSON = "vercel.json";

/** Extract frontmatter slug from a markdown file */
function extractSlug(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return null;

  const slugMatch = fmMatch[1].match(/^slug:\s*["']?(.+?)["']?\s*$/m);
  if (!slugMatch) return null;

  return slugMatch[1];
}

/** Recursively collect all .md/.mdx files */
function collectFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectFiles(full));
    } else if ([".md", ".mdx"].includes(extname(full))) {
      files.push(full);
    }
  }
  return files;
}

// Collect all slugs
const files = collectFiles(CONTENT_DIR);
const slugs = [];

for (const file of files) {
  const slug = extractSlug(file);
  if (slug) slugs.push(slug);
}

// Generate hashes and check for collisions
const hashMap = new Map(); // hash -> slug
const collisions = [];

for (const slug of slugs) {
  const hash = shortHash(slug);
  if (hashMap.has(hash) && hashMap.get(hash) !== slug) {
    collisions.push({ hash, slug, existing: hashMap.get(hash) });
  }
  hashMap.set(hash, slug);
}

if (collisions.length > 0) {
  console.error("Short hash collisions detected!");
  for (const c of collisions) {
    console.error(`  "${c.hash}" -> "${c.slug}" conflicts with "${c.existing}"`);
  }
  process.exit(1);
}

// Read existing vercel.json and merge redirects
const vercelConfig = JSON.parse(readFileSync(VERCEL_JSON, "utf-8"));

const redirects = Array.from(hashMap.entries()).map(([hash, slug]) => ({
  source: `/s/${hash}`,
  destination: `/${slug}/`,
  permanent: true,
}));

vercelConfig.redirects = redirects;

writeFileSync(VERCEL_JSON, JSON.stringify(vercelConfig, null, "\t") + "\n");

console.log(`Generated ${redirects.length} short URL redirects in ${VERCEL_JSON}`);
