/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        '3xl': ['0 1px 2px rgba(255, 255, 255, 0.9)', '0 10px 10px rgba(0, 0, 0, 0.5)'],
      },
    },
  },
  plugins: [],
};
