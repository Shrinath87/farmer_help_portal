/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#2D5016',
        'secondary-green': '#6BA52F',
        'light-green': '#A4D65E',
        'accent-orange': '#FF9500',
        'accent-yellow': '#FFD700',
      },
      fontFamily: {
        'sans': ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
