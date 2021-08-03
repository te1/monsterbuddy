const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.blueGray,
      cool: colors.coolGray,
      brand: colors.rose,
      power: '#b8342e',
      speed: '#1b61b9',
      technical: '#5b9326',
    },
    extend: {
      boxShadow: {
        top: '0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 -1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
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
        dark: {
          css: [
            {
              color: theme('colors.cool.300'),
              h1: {
                color: theme('colors.cool.300'),
              },
              h2: {
                color: theme('colors.cool.300'),
              },
              h3: {
                color: theme('colors.cool.300'),
              },
              h4: {
                color: theme('colors.cool.300'),
              },
              'ul > li::before': {
                backgroundColor: theme('colors.cool.400'),
              },
            },
          ],
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
