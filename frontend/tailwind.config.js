/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C5A059', // Gold
          dark: '#A68546',
          light: '#D4B880',
        },
        luxury: {
          black: '#0A0A0A',
          gray: '#1A1A1A',
          white: '#F5F5F5',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(to bottom, #0A0A0A, #1A1A1A)',
      }
    },
  },
  plugins: [],
}
