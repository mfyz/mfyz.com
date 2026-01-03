import { getCollection } from "astro:content";
import { generateOgImageForPost } from "../../utils/generateOgImage.js";

export async function getStaticPaths() {
  // Include all posts (including hidden) for static generation
  // This allows OG images to be pre-generated for hidden posts
  const posts = await getCollection("blog");

  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

export async function GET({ props }) {
  const image = await generateOgImageForPost(props);

  return new Response(image, {
    headers: { "Content-Type": "image/png" },
  });
}

// Enable prerendering to generate static OG images at build time
// Note: In production, hidden post OG images will be publicly accessible
// They're just images without context, so this is acceptable
export const prerender = true;
