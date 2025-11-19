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
          DEFAULT: '#8FA677', // Sage Green - main accent
          dark: '#6B7D5A', // Darker for better contrast on white
          light: '#A8BD91',
          50: '#F4F7F2',
        },
        secondary: {
          DEFAULT: '#F2AA6B', // Apricot/Orange - warm accent
          dark: '#D88A45', // Darker for better readability
          light: '#F5C08F',
          50: '#FEF8F4',
        },
        accent: {
          DEFAULT: '#D94032', // Red/Terracotta - strong accent
          dark: '#B8301F', // Darker for better contrast
          light: '#E36B5E',
        },
        neutral: {
          50: '#FFFFFF', // Pure white for main background
          100: '#F2E0C9', // Cream/Beige - subtle background variant
          200: '#E8D6BF',
          300: '#D4C2AB',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#1a1a1a', // Near black for main text
          900: '#0a0a0a', // Deep black for headings
        },
        coral: {
          DEFAULT: '#F2856D', // Coral - additional warm accent
          dark: '#D96B53',
          light: '#F5A08C',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
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
