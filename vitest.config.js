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
    },
    // Show verbose output with detailed test case listings
    reporter: 'verbose',
    outputFile: {
      json: './test-results.json'
    },
    // Configure code coverage
    coverage: {
      provider: 'v8', // Use the default Node.js provider
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: [
        'src/utils/**/*.{js,ts}', 
        'src/components/**/*.{js,ts,jsx,tsx,astro}'
      ],
      exclude: [
        '**/*.test.{js,ts}', 
        '**/*.spec.{js,ts}', 
        '**/index.{js,ts}',
        '**/node_modules/**'
      ],
      all: true, // Report coverage for all files in included directories, not just imported ones
    }
  }
});