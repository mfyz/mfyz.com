import { getCollection, type CollectionEntry } from "astro:content";

// We can't directly type the collection data structure with a custom type
// but we can type the data parameter in the filter function

/**
 * Interface for post filtering options
 */
interface PostFilterOptions {
  /** Filter by language ('en', 'tr', or 'all') */
  language?: "en" | "tr" | "all";
  /** Whether to include hidden posts */
  includeHidden?: boolean;
  /** Exclude a specific post by slug */
  excludeSlug?: string | null;
  /** Limit the number of posts returned */
  limit?: number | null;
  /** Whether to sort posts by date (newest first) */
  sorted?: boolean;
}

/**
 * Centralized function to get blog posts with various filtering options
 *
 * @param options - Configuration options
 * @returns Array of blog posts
 */
export async function getPosts({
  language = "all",
  includeHidden = false,
  excludeSlug = null,
  limit = null,
  sorted = true,
}: PostFilterOptions = {}): Promise<CollectionEntry<"blog">[]> {
  // Get posts with filters
  const posts = await getCollection("blog", ({ data, id, slug }) => {
    // Filter by hidden status
    if (!includeHidden && (data as any).hidden) return false;

    // Exclude specific slug if provided
    if (excludeSlug && slug === excludeSlug) return false;

    // Language filtering
    if (language !== "all") {
      // Check if the post is in the Turkish folder
      // Use type assertion for the id parameter since we know it's a string
      const isTurkishPath = (id as string).startsWith("tr/");
      // Safely check the lang property (it may not exist in all post frontmatter)
      const hasTurkishLang = (data as any).lang?.toLowerCase() === "tr";

      if (language === "tr") {
        // For Turkish posts, keep only those that are either in tr/ folder OR have lang: 'tr'
        if (!isTurkishPath && !hasTurkishLang) return false;
      } else if (language === "en") {
        // For English posts, filter out any that are in tr/ folder OR have lang: 'tr'
        if (isTurkishPath || hasTurkishLang) return false;
      }
    }

    return true; // Include if it passes all filters
  });

  // Sort posts by date if requested (newest first)
  const sortedPosts = sorted
    ? posts.sort(
        (a, b) =>
          new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
      )
    : posts;

  // Limit the number of posts if requested
  if (limit && typeof limit === "number") {
    return sortedPosts.slice(0, limit);
  }

  return sortedPosts;
}

/**
 * Helper function to get only English posts (with default sorting)
 */
export async function getEnglishPosts(
  options: Omit<PostFilterOptions, "language"> = {}
): Promise<CollectionEntry<"blog">[]> {
  return getPosts({ ...options, language: "en" });
}

/**
 * Helper function to get only Turkish posts (with default sorting)
 */
export async function getTurkishPosts(
  options: Omit<PostFilterOptions, "language"> = {}
): Promise<CollectionEntry<"blog">[]> {
  return getPosts({ ...options, language: "tr" });
}

/**
 * Helper function to get all posts, regardless of language
 */
export async function getAllPosts(
  options: Omit<PostFilterOptions, "language"> = {}
): Promise<CollectionEntry<"blog">[]> {
  return getPosts({ ...options, language: "all" });
}

/**
 * Interface for related posts options
 */
interface RelatedPostsOptions {
  /** Current post slug to exclude */
  slug: string;
  /** Filter by language */
  language?: "en" | "tr" | "all";
  /** Tags to match against for finding related posts */
  tags?: string[];
  /** Limit the number of related posts */
  limit?: number;
  /** Whether to randomize the order of related posts */
  randomize?: boolean;
  /** Whether posts must share at least one tag with the current post */
  requireMatchingTag?: boolean;
}

/**
 * Helper function to get related posts (same language, excluding current post)
 *
 * @param options - Options for finding related posts
 * @returns Array of related posts
 */
export async function getRelatedPosts({
  slug,
  language = "all",
  tags = [],
  limit = 6,
  randomize = true,
  requireMatchingTag = true,
}: RelatedPostsOptions): Promise<CollectionEntry<"blog">[]> {
  // First get posts with the same language, excluding the current post
  let relatedPosts = await getPosts({
    language,
    excludeSlug: slug,
    // Use a larger limit initially if we're going to filter by tags
    limit:
      requireMatchingTag && tags.length > 0 ? Math.max(limit * 3, 20) : limit,
  });

  // Filter by matching tags if tags are provided and matching is required
  if (requireMatchingTag && tags.length > 0) {
    relatedPosts = relatedPosts.filter(post => {
      const postTags = post.data.tags || [];
      // Check if at least one tag matches
      return tags.some(tag => postTags.includes(tag));
    });
  }

  // Randomize the posts if requested
  if (randomize) {
    relatedPosts = relatedPosts.sort(() => Math.random() - 0.5);
  }

  // Apply the final limit
  return relatedPosts.slice(0, limit);
}
