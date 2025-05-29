import { defineConfig } from 'vitest/config';
import { getViteConfig } from 'astro/config';

export default defineConfig({
  ...getViteConfig(),
  test: {
    globals: true,
    environment: 'node',
    exclude: ['**/node_modules/**', '**/e2e/**', '**/.astro/**', '**/dist/**'],
    deps: {
      // Handle .astro files with the Astro package
      inline: ['astro']
    },
    transformMode: {
      web: [/\.[jt]sx?$/]
    }
  }
});