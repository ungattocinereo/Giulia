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
          DEFAULT: '#8B7AB8',
          dark: '#6F5E99',
          light: '#A895CC',
        },
        secondary: {
          DEFAULT: '#E5A491',
          dark: '#D88970',
          light: '#F0BDB0',
        },
        accent: {
          DEFAULT: '#7AB8B8',
          dark: '#5FA3A3',
          light: '#98CACA',
        },
        pastel: {
          lavender: '#E8E1F0',
          peach: '#F5E6E1',
          mint: '#E1F0F0',
          cream: '#F5F0E8',
          sky: '#E1EAF5',
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
