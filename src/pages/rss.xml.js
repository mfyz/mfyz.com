import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../consts";

// Shared RSS generation function for both English and Turkish feeds
export async function generateRssFeed(context, languageFilter) {
  const blogPosts = await getCollection("blog", ({ data, id }) => {
    // Skip hidden posts
    if (data.hidden) return false;

    // Check if the post is in the Turkish directory
    const isTurkishPath = id.startsWith('tr/');
    const hasTurkishLang = data.lang === 'tr';
    const isTurkishPost = isTurkishPath || hasTurkishLang;

    // For English feed, exclude Turkish posts
    if (languageFilter === 'en') {
      return !isTurkishPost;
    }

    // For Turkish feed, only include Turkish posts
    if (languageFilter === 'tr') {
      return isTurkishPost;
    }

    return true; // Include all if no filter specified
  });
  
  // Map posts to RSS items format
  const items = blogPosts.map(post => ({
    ...post.data,
    link: `/${post.slug}/`,
    category: 'blog'
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Generate feed with appropriate title based on language
  const title = languageFilter === 'tr' ? `${SITE.title} (Türkçe)` : SITE.title;
  
  return rss({
    title,
    description: languageFilter === 'tr' ? SITE.descriptionTr : SITE.description,
    site: context.site,
    items
  });
}

// English RSS feed (default)
export async function GET(context) {
  return generateRssFeed(context, 'en');
}
