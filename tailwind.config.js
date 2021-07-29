const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.blueGray,
      brand: colors.rose,
      power: '#b8342e',
      speed: '#1b61b9',
      technical: '#5b9326',
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme('colors.gray.700'),
              fontWeight: '600',
            },
            h2: {
              color: theme('colors.gray.700'),
              fontWeight: '600',
            },
            h3: {
              color: theme('colors.gray.700'),
            },
            h4: {
              color: theme('colors.gray.700'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.500'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
