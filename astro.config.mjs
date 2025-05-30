// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { visualizer } from "rollup-plugin-visualizer"
import { transformerNotationHighlight } from "@shikijs/transformers";
import vercel from "@astrojs/vercel";
import remarkToc from 'remark-toc'
import { remarkEmoticons } from './src/remark-plugins/remark-emoticons.mjs'

// https://astro.build/config
export default defineConfig({
  site: "https://mfyz.com",
  integrations: [mdx({remarkPlugins: [remarkToc, remarkEmoticons]}), sitemap(), react(), tailwind()],
  markdown: {
    remarkPlugins: [remarkToc, remarkEmoticons],
    shikiConfig: {
      themes: {
        light: "dracula",
        dark: "dracula",
      },
      transformers: [transformerNotationHighlight()],
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@content': '/src/content',
        '@utils': '/src/utils',
        '@styles': '/src/styles'
      }
    },
    plugins: [
      visualizer({
        emitFile: true,
        filename: "stats.html",
      })
    ]
  },
  output: "static",
  adapter: vercel(),
});
