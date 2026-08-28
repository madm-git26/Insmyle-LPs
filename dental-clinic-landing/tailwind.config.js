/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          400: '#60a5fa',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1a3f9e',
        },
        navy: {
          700: '#173a70',
          800: '#12305e',
          900: '#0d2450',
        },
        ink: '#1f2d3d',
        muted: '#5b6b7f',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 10px rgba(16, 42, 82, 0.06)',
        lift: '0 12px 34px rgba(16, 42, 82, 0.12)',
      },
    },
  },
  plugins: [],
};
