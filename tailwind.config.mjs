/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
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
