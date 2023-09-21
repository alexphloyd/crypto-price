/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['apps/ui/src/**/*.{tsx,jsx,ts}'],
  theme: {
    fontFamily: {
      croissant: ['Croissant One', 'cursive'],
    },
  },
  plugins: [],

  important: '#root',
  corePlugins: {
    preflight: false,
  },
};
