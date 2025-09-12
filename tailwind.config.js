/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { display: ['ui-sans-serif', 'system-ui', 'Inter', 'sans-serif'] },
      colors: {
        cosmic: {
          900: '#05060a',
          800: '#0a0d14',
          700: '#0f1420',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(120, 120, 255, 0.35)',
      },
    },
  },
  plugins: [],
}
