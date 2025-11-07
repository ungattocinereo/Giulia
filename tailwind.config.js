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
          DEFAULT: '#C97A63',
          dark: '#B05D47',
          light: '#E8C5A1',
        },
        secondary: {
          DEFAULT: '#D9BFA0',
          dark: '#C3A880',
          light: '#F5E6D3',
        },
        accent: {
          DEFAULT: '#F4A896',
          dark: '#E88C78',
        },
        warm: {
          beige: '#F5E6D3',
          sand: '#E8D5C0',
          terracotta: '#C97A63',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Lora', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
