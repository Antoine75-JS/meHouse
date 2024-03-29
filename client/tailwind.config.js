/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#282c34',
        greenMain: '#10dd99',
        secondary: '#ffffff',
      },
      width: {
        600: '600px',
      },
    },
  },
  plugins: [],
};
