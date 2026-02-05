/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      screens: {
        'exact1247': '1247px', // custom screen name
      },
    },
  },
  plugins: [],
}

