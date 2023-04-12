/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{html,js,jsx}", "./components/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'grey': '#f3f4f6',
      'primary': '#f8ce2f',
      'secondary': '#42413d',
      'accent': '#cf456c',
      'muted': '#959492',
    },
  },
  plugins: [],
}

