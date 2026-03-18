/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#D97706', // Rich Amber/Orange
        'secondary': '#451A03', // Deep Chocolate
        'accent': '#F59E0B', // Bright Orange/Gold
        'blackBG': '#1C1917', // Warm Black
        'Favorite': '#EF4444'
      },
      fontFamily: {
        'primary': ['Outfit', 'sans-serif'],
        'secondary': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glare': '0 0px 40px -10px rgba(217, 119, 6, 0.25)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        shimmer: 'shimmer 1s infinite',
      }
    },
  },
  plugins: [],
}



