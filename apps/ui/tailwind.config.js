/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['apps/ui/src/**/*.{tsx,jsx,ts}'],
  theme: {
    fontFamily: {
      exo: ['Exo', 'sans-serif'],
    },
  },
  plugins: [],

  important: '#root',
  corePlugins: {
    preflight: false,
  },
};
