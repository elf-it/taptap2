/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comic: ["ComicSansMS", "sans-serif"],
        potta: ["PottaOne-Regular", "sans-serif"],
      },
      colors: {
        "gradientStartColor": "var(--gradient-start-color)",
        "gradientEndColor": "var(--gradient-end-color)",
        "bgColorGreen": "var(--bg-color-green)",
        "bgColorViolet": "var(--bg-color-violet)",
        "bgColorBlue": "var(--bg-color-blue)",
        "bgColorYellow": "var(--bg-color-yellow)",
        "bgColorPink": "var(--bg-color-pink)",
      },
      backgroundImage: {
        'bgMain': "url('/src/assets/images/bg-main.png')",
      }
    },
  },
  plugins: [],
}