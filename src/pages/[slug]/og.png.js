import { getCollection } from "astro:content";
import { generateOgImageForPost } from "../../utils/generateOgImage.js";

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.hidden);

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

// Set to true to ensure static generation at build time
export const prerender = true;
