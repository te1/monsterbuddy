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
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Monster Buddy',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Companion App For Monster Hunter Stories 2: Wings Of Ruin',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://monsterbuddy.app/icon.png',
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: 'Monster Buddy - Companion App For Monster Hunter Stories 2',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Monster Buddy',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Companion App For Monster Hunter Stories 2: Wings Of Ruin',
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: 'https://monsterbuddy.app/icon.png',
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Monster Buddy - Companion App For Monster Hunter Stories 2',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/fontawesome.js'],

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

    // trying to fix npm run dev hanging at 95% after file changes
    cssSourceMap: false,
  },

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate
  generate: {
    fallback: true,
  },
};
