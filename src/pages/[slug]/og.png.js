import { getCollection } from "astro:content";
import { generateOgImageForPost } from "../../utils/generateOgImage";

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

export const prerender = true;
