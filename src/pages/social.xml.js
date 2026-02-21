import rss from "@astrojs/rss";
import { SITE } from "../consts";
import { getPosts } from "../utils/getPosts.ts";
import { shortHash } from "../utils/shortHash.js";

// Social media RSS feed - only includes posts with social_post field
export async function GET(context) {
  const allPosts = await getPosts({
    language: "en",
    includeHidden: false,
    sorted: true,
  });

  // Filter to only posts that have social_post field
  const socialPosts = allPosts.filter(post => post.data.social_post);

  // Map posts to RSS items format with social_post as description
  const items = socialPosts
    .map(post => ({
      title: post.data.title,
      description: post.data.social_post,
      link: `/${post.slug}/`,
      pubDate: new Date(post.data.date),
      category: "blog",
      customData: `<short_url>${SITE.website}/s/${shortHash(post.slug)}</short_url>`,
    }))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: `${SITE.title} - Social Feed`,
    description: "Social media updates from mfyz.com",
    site: context.site,
    items,
  });
}
