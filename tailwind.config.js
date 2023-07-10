/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      dropShadow: {
        txtlinrev: ['1px 1px 1px rgba(0, 0, 0, 0.9)', '0 10px 10px rgba(0, 0, 0, 0.5)'],
        '3xl': [
          '0 1px 0 rgba(255,255,255,0.9)',
          '0 2px 3px rgba(0, 0, 0, 0.9)',
          '0 10px 10px rgba(0, 0, 0, 0.5)',
        ],
      },
    },
  },
  plugins: [],
};
