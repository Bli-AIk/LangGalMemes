/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f172a', // Slate 900
        'card-bg': '#1e293b', // Slate 800
        'primary': '#d946ef', // Fuchsia 500
        'secondary': '#facc15', // Yellow 400
        'accent': '#22d3ee', // Cyan 400
      },
      fontFamily: {
        'cartoon': ['"Fredoka One"', 'cursive', 'sans-serif'], // We will load this font
        'sans': ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
