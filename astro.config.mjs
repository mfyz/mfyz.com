// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { visualizer } from "rollup-plugin-visualizer"
import { transformerNotationHighlight } from "@shikijs/transformers";
import remarkToc from 'remark-toc'
import { remarkEmoticons } from './src/remark-plugins/remark-emoticons.mjs'
import { rehypeLinkPreview } from './src/remark-plugins/rehype-link-preview.mjs'

// Define shared Shiki configuration
const shikiConfig = {
  themes: {
    light: "dracula",
    dark: "dracula",
  },
  transformers: [transformerNotationHighlight()],
};

// https://astro.build/config
export default defineConfig({
  site: "https://mfyz.com",
  server: {
    port: parseInt(process.env.PORT || '6543'),
    host: true
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkToc, remarkEmoticons],
      rehypePlugins: [rehypeLinkPreview],
      syntaxHighlight: 'shiki',
      shikiConfig: shikiConfig, // Add Shiki config to MDX
    }),
    sitemap(),
    tailwind()
  ],
  markdown: {
    remarkPlugins: [remarkToc, remarkEmoticons],
    rehypePlugins: [rehypeLinkPreview],
    shikiConfig: shikiConfig, // Reuse same config for consistency
  },
  vite: {
    server: {
      host: true,
      allowedHosts: ["r.mfyz.net", "1411-2600-4040-9c38-ac00-edcd-e47b-422d-a90d.ngrok-free.app", "mfyzcom.loca.lt", ".mfyz.net", "localhost"],
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
  output: "static",
  adapter: undefined
});
