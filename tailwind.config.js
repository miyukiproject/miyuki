/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mumuki-skyblue": "#3498DB",
        "mumuki-rose": "#ff5b81",
        "mumuki-teal": "#0B465D",
        "mumuki-rose-darken": "#d94d6e"
      }
    },
  },
  plugins: [],
}
