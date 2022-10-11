/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customGrey:'#1F2028',
        customGreen:'#50C7D8',
        customPurple:'#8080D7'
      }
    },
  },
  plugins: [],
}
