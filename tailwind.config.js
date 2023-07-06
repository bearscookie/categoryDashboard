module.exports = {
  important: true,
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary-blue': '#3d5cfc',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
