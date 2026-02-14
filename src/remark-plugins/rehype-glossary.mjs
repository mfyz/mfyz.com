import { visit } from 'unist-util-visit';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

let glossaryCache = null;

function loadGlossary() {
  if (glossaryCache) return glossaryCache;

  const filePath = join(process.cwd(), 'src/data/glossary.json');
  const raw = readFileSync(filePath, 'utf-8');
  glossaryCache = JSON.parse(raw);
  return glossaryCache;
}

// Tags whose children should never be wrapped
const SKIP_TAGS = new Set(['a', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'script', 'style']);

// Tags where we allow glossary wrapping
const ALLOW_PARENT_TAGS = new Set(['p', 'li', 'td', 'th', 'blockquote', 'span', 'em', 'strong', 'div']);

/**
 * Check if a node is inside a skip tag by walking ancestors
 */
function isInsideSkipTag(ancestors) {
  for (const ancestor of ancestors) {
    if (ancestor.type === 'element' && SKIP_TAGS.has(ancestor.tagName)) {
      return true;
    }
  }
  return false;
}

/**
 * Check if the immediate parent is an allowed tag for wrapping
 */
function hasAllowedParent(ancestors) {
  if (ancestors.length === 0) return false;
  const parent = ancestors[ancestors.length - 1];
  return parent.type === 'element' && ALLOW_PARENT_TAGS.has(parent.tagName);
}

/**
 * Build a regex that matches any glossary term as a whole word.
 * Sorts terms by length (longest first) so "Tailwind CSS" matches before "CSS".
 */
function buildTermRegex(terms) {
  const sorted = [...terms].sort((a, b) => b.length - a.length);
  const escaped = sorted.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  // Word boundary matching — handles terms with special chars like "CI/CD" and "Next.js"
  return new RegExp(`(?<=^|[\\s.,;:!?("'\`])(?:${escaped.join('|')})(?=$|[\\s.,;:!?)"'\`])`, 'g');
}

/**
 * Rehype plugin that wraps the first occurrence of each glossary term
 * in a <span> with data attributes for client-side popovers.
 */
export function rehypeGlossary() {
  return (tree) => {
    const glossary = loadGlossary();
    const terms = Object.keys(glossary);
    if (terms.length === 0) return;

    const regex = buildTermRegex(terms);
    const matched = new Set(); // Track which terms have been wrapped (first occurrence only)

    visit(tree, 'text', (node, index, parent) => {
      // Build ancestor chain by walking up
      if (!parent || index === undefined) return;

      // Collect ancestors via the visitor
      const ancestors = [];
      visit(tree, (n, _i, p) => {
        if (n === node) return false; // stop
      });

      // Simpler approach: check parent chain directly
      // visit with ancestors
    });

    // Use visitParents-style approach by tracking ancestors manually
    function walkNode(node, ancestors) {
      if (node.type === 'text') {
        if (isInsideSkipTag(ancestors)) return;
        if (!hasAllowedParent(ancestors)) return;

        const parent = ancestors[ancestors.length - 1];
        if (!parent || !parent.children) return;

        const idx = parent.children.indexOf(node);
        if (idx === -1) return;

        const text = node.value;
        regex.lastIndex = 0;

        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
          const term = match[0];
          // Find the glossary key (case-sensitive lookup first, then case-insensitive)
          const glossaryKey = terms.find(t => t === term) || terms.find(t => t.toLowerCase() === term.toLowerCase());
          if (!glossaryKey) continue;
          if (matched.has(glossaryKey)) continue;

          matched.add(glossaryKey);

          // Text before the match
          if (match.index > lastIndex) {
            parts.push({ type: 'text', value: text.slice(lastIndex, match.index) });
          }

          // The wrapped term
          parts.push({
            type: 'element',
            tagName: 'span',
            properties: {
              className: ['glossary-term'],
              'data-glossary-term': glossaryKey,
              'data-glossary-desc': glossary[glossaryKey],
            },
            children: [{ type: 'text', value: term }],
          });

          lastIndex = match.index + term.length;
        }

        if (parts.length > 0) {
          // Add remaining text
          if (lastIndex < text.length) {
            parts.push({ type: 'text', value: text.slice(lastIndex) });
          }
          // Replace the text node with the split parts
          parent.children.splice(idx, 1, ...parts);
        }

        return;
      }

      if (node.type === 'element' && node.children) {
        // Process children in reverse so splicing doesn't affect indices
        for (let i = node.children.length - 1; i >= 0; i--) {
          walkNode(node.children[i], [...ancestors, node]);
        }
      }

      if (node.type === 'root' && node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          walkNode(node.children[i], [...ancestors, node]);
        }
      }
    }

    walkNode(tree, []);
  };
}
