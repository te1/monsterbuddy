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
      gold: colors.amber[300],
    },
    extend: {
      boxShadow: {
        top: '0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 -1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: (theme) => ({
        select: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23${theme(
          'colors.gray.700'
        ).substring(
          1
        )}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        'select-dark': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23${theme(
          'colors.cool.300'
        ).substring(
          1
        )}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
      }),
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
