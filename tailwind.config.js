/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f2fbf9",
          100: "#d2f5ec",
          200: "#a5ead9",
          300: "#70d8c3",
          400: "#3db39e",
          500: "#29a390",
          DEFAULT: "#29a390",
          600: "#1e8375",
          700: "#1c695f",
          800: "#1b544d",
          900: "#1b4641",
          950: "#092a27",
        },
      },
    },
  },
  plugins: [],
}
