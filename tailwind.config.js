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
          DEFAULT: '#E8B4B8',
          dark: '#D89CA0',
          light: '#F5D9DB',
        },
        secondary: {
          DEFAULT: '#D4C5E0',
          dark: '#BCADD0',
          light: '#EAE3F0',
        },
        accent: {
          DEFAULT: '#C9E4DE',
          dark: '#B3D5CE',
          light: '#E3F2EF',
        },
        pastel: {
          pink: '#F5D9DB',
          lavender: '#EAE3F0',
          mint: '#E3F2EF',
          peach: '#F8E5D9',
          sky: '#D9E8F5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
