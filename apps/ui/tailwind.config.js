/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['apps/ui/src/**/*.{tsx,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],

  important: '#root',
  corePlugins: {
    preflight: false,
  },
};
