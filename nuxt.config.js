export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  modern: 'client',

  vue: {
    config: {
      productionTip: false,
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Monster Buddy - Companion App For Monster Hunter Stories 2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Includes monster attack types and weaknesses, egg patterns, monstie locations and retreat conditions',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Monster Buddy',
      short_name: 'Monster Buddy',
      description:
        'Companion App For Monster Hunter Stories 2: Wings Of Ruin. Includes monster attack types and weaknesses, egg patterns, monstie locations and retreat conditions.',
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: ['lodash'],
    },
  },

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate
  generate: {
    fallback: true,
  },
};
