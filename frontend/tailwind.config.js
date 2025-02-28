/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",          // Make sure your HTML files are included
    "./src/**/*.{js,ts,jsx,tsx}", // This ensures all relevant JS/TS/JSX/TSX files are considered
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))', // Responsive grid setup
      },
      colors: {
        'primary': '#5F6FFF',  // Custom primary color
      },
    },
  },
  plugins: [],
}
