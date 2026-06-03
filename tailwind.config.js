/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sand:    { 50: '#FAF7F2', 100: '#F2EBDC', 200: '#E8DCC4', 300: '#D9C7A3' },
        caramel: { 400: '#C8956D', 500: '#B07A4F', 600: '#8E5F3B' },
        warmstone: { DEFAULT: '#8B8378', deep: '#5C544A' },
        olive:   { DEFAULT: '#4A5043', dark: '#363B30' },
        mineral: { DEFAULT: '#4A6B7C', dark: '#2F4753' },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Heebo', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'Heebo', 'system-ui', 'sans-serif'],
      },
      borderRadius: { organic: '1.75rem', blob: '2.5rem' },
      boxShadow:    { soft: '0 8px 30px rgba(74,80,67,0.08)' },
      transitionTimingFunction: { organic: 'cubic-bezier(0.22,1,0.36,1)' },
    },
  },
  plugins: [],
};
