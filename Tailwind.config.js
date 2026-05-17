/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF2B2B',
        secondary: '#FF6B00',
        bg: '#070707',
        muted: '#9CA3AF',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'Arial Black', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}