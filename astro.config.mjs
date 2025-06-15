// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { visualizer } from "rollup-plugin-visualizer"
import { transformerNotationHighlight } from "@shikijs/transformers";
import remarkToc from 'remark-toc'
import { remarkEmoticons } from './src/remark-plugins/remark-emoticons.mjs'

// https://astro.build/config
export default defineConfig({
  site: "https://mfyz.com",
  integrations: [mdx({remarkPlugins: [remarkToc, remarkEmoticons]}), sitemap(), tailwind()],
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
    server: {
      allowedHosts: ["1411-2600-4040-9c38-ac00-edcd-e47b-422d-a90d.ngrok-free.app"],
    },
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
  output: "static"
});
