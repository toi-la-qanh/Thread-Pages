/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'left': '-4px 0 8px rgba(0, 0, 0, 0.2)',
        'right': '4px 0 8px rgba(0, 0, 0, 0.2)',
        'left-right': '-2px 0 4px rgba(0, 0, 0, 0.2), 2px 0 4px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}