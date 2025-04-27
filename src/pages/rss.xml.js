import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../consts";

export async function GET(context) {
  const blogPosts = await getCollection("blog", ({ data }) => !data.hidden);
  
  // Only include blog posts
  const allPosts = blogPosts.map(post => ({
    ...post.data,
    link: `/${post.slug}/`,
    category: 'blog'
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: allPosts
  });
}
