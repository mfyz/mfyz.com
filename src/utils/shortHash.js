/**
 * Deterministic short hash for blog post slugs.
 * Used by both the prebuild redirect generator and Astro pages (social.xml).
 */

function djb2(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Generate a 4-character base36 short hash from a slug.
 * Deterministic: same slug always produces the same hash.
 *
 * @param {string} slug - The blog post slug
 * @returns {string} A 4-character alphanumeric hash
 */
export function shortHash(slug) {
  return djb2(slug).toString(36).slice(0, 4);
}
