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
          DEFAULT: '#6D8052',
          dark: '#31513C',
          light: '#B0C49E',
          50: '#F1F5EB',
        },
        secondary: {
          DEFAULT: '#F2AA6B', // Apricot/Orange - warm accent
          dark: '#986332',
          light: '#F5C08F',
          50: '#FEF8F4',
        },
        accent: {
          DEFAULT: '#D53A25',
          dark: '#BB2B18',
          light: '#E36B5E',
        },
        neutral: {
          50: '#FBF8F1',
          100: '#F3EFE5',
          200: '#E2E5DA',
          300: '#C3CBB8',
          400: '#A3A3A3',
          500: '#737373',
          600: '#556052',
          700: '#455147',
          800: '#2A4032',
          900: '#203A2B',
        },
        coral: {
          DEFAULT: '#F2856D', // Coral - additional warm accent
          dark: '#D96B53',
          light: '#F5A08C',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
