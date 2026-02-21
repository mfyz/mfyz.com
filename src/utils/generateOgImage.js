import { Resvg } from "@resvg/resvg-js";
import postOgImage from "./og-template/post.js";

async function svgBufferToPngBuffer(svg) {
  const resvg = new Resvg(svg);
  const urls = resvg.imagesToResolve();
  for (const url of urls) {
    const res = await fetch(url);
    const buffer = Buffer.from(await res.arrayBuffer());
    resvg.resolveImage(url, buffer);
  }
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost({ post }) {
  const svg = await postOgImage(post);
  return svgBufferToPngBuffer(svg);
}
