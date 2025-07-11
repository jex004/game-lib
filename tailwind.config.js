// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx,mdx}",       // ← your App Router pages & layouts
    "./src/pages/**/*.{ts,tsx,js,jsx,mdx}",     // ← if you ever use pages/
    "./src/components/**/*.{ts,tsx,js,jsx,mdx}" // ← if you keep shared components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
