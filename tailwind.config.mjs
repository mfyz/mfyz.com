/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}", "./public/js/**/*.js"],
  safelist: [
    // Code block button classes (dynamically added via JavaScript)
    'bg-gray-500', 'bg-gray-600', 'bg-gray-700', 'bg-blue-600', 'bg-blue-800',
    'dark:bg-gray-700', 'dark:bg-gray-600', 'dark:bg-blue-800',
    'hover:bg-gray-600', 'dark:hover:bg-gray-600',
    'py-1', 'px-2', 'text-xs', 'text-white', 'font-medium',
    'rounded-l', 'rounded-r', 'border-r', 'border-gray-400', 'dark:border-gray-600',
    'whitespace-pre-wrap', 'active-button', 'copied',
    'code-buttons-group', 'code-block-wrapper',
    // Mermaid classes
    'mermaid-container', 'mermaid-diagram'
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
      screens: {
        DEFAULT: "80rem",
      },
    },
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        "primary-light": "rgb(var(--primary-light) / <alpha-value>)",
        "primary-dark": "rgb(var(--primary-dark) / <alpha-value>)",
        "primary-bright": "rgb(var(--primary-bright) / <alpha-value>)",
      },
      fontFamily: {
        primary: ["Rubik", "sans-serif"],
        secondary: ["Georgia", "serif"], // IMPORTANT: Keep Georgia for headings - core design element
        mono: ["Monaco", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
