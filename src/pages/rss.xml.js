import rss from "@astrojs/rss";
import { SITE } from "../consts";
import { getPosts } from "../utils/getPosts.ts";

// Shared RSS generation function for both English and Turkish feeds
export async function generateRssFeed(context, languageFilter) {
  const blogPosts = await getPosts({
    language: languageFilter || 'all',
    includeHidden: false,
    sorted: true
  });
  
  // Map posts to RSS items format
  const items = blogPosts.map(post => ({
    ...post.data,
    link: `/${post.slug}/`,
    pubDate: new Date(post.data.date),
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
