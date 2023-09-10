/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['apps/ui/src/**/*.{tsx,jsx,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],

  important: '#root',
  corePlugins: {
    preflight: false,
  },
};
