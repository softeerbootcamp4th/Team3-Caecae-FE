/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        navigation: '#1C1A1B',
        navigationUnderline: '#444444',
        navigationText: '#888888'
        footer: '#1C1A1B',
        footerText: '#888888',
        footerVerticalLine: '#444444',
      }
    },
  },
  plugins: [],
}