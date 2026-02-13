import { visit } from 'unist-util-visit';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';

let postMapCache = null;

/**
 * Build a map of blog posts by slug
 * This reads the content directory directly without relying on Astro APIs
 */
async function buildPostMap() {
  if (postMapCache) return postMapCache;

  const postMap = new Map();
  const contentDir = join(process.cwd(), 'src/content/blog');

  async function scanDirectory(dir, prefix = '') {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        await scanDirectory(fullPath, prefix ? `${prefix}/${entry.name}` : entry.name);
      } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        // Extract slug from filename (remove date prefix and extension)
        const slug = entry.name
          .replace(/^\d{4}-\d{2}-\d{2}-/, '') // Remove YYYY-MM-DD-
          .replace(/\.(md|mdx)$/, ''); // Remove extension

        try {
          const content = await readFile(fullPath, 'utf-8');
          const { data } = matter(content);

          // Skip hidden posts
          if (data.hidden) continue;

          // Store with both forms
          postMap.set(`/${slug}`, data);
          postMap.set(`/${slug}/`, data);
        } catch (err) {
          // Skip files that can't be parsed
        }
      }
    }
  }

  await scanDirectory(contentDir);
  postMapCache = postMap;
  return postMap;
}

/**
 * Rehype plugin to add preview data attributes to internal blog post links
 * This enables hover preview cards without external API calls
 */
export function rehypeLinkPreview() {
  return async (tree) => {
    const postMap = await buildPostMap();

    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a') return;

      const href = node.properties?.href;
      if (!href) return;

      // Only process internal links (start with /, not //, not http)
      if (typeof href !== 'string' || !href.startsWith('/') || href.startsWith('//')) {
        return;
      }

      // Look up the post
      const post = postMap.get(href);
      if (!post) return;

      // Add preview data attributes
      node.properties['data-preview-title'] = post.title || '';
      node.properties['data-preview-desc'] = post.description || '';

      // Add image if available
      if (post.imageURL) {
        node.properties['data-preview-image'] = post.imageURL;
      }

      // Add a class to mark it as an internal link with preview
      const existingClass = node.properties.className || [];
      node.properties.className = Array.isArray(existingClass)
        ? [...existingClass, 'internal-link']
        : [existingClass, 'internal-link'];
    });
  };
}
