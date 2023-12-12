/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-yellow": "#ffee80",
        "yellow-main": "#f9d806",
        "t-black": "#432371",
      },
    },
    // extend: {},
  },
  plugins: [],
};
