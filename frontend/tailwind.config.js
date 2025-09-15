

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",                        // include Vite index.html
    "./src/**/*.{js,jsx,ts,tsx}",          // all files in src and subfolders
    "./node_modules/@shadcn/ui/dist/**/*.{js,jsx}", // shadcn components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
