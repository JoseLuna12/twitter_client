/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-bg": "#EFEFEF",
        "tw-blue": "#03A9F4"
      }
    },
  },
  plugins: [],
}
