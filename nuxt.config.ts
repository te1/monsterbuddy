// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-og-image',
    'nuxt-llms',
    '@nuxtjs/mdc',
    '@nuxt/a11y',
    // '@nuxt/hints',
  ],

  telemetry: false,

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  experimental: {
    asyncContext: true,
  },

  compatibilityDate: '2026-02-01',

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      autoSubfolderIndex: false,
    },

    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: false,
    },
  },

  eslint: {
    config: {},
  },

  a11y: {
    logIssues: false,
  },

  icon: {
    provider: 'iconify',
  },

  llms: {
    domain: 'https://docs-template.nuxt.dev/',
    title: 'Nuxt Docs Template',
    description: 'A template for building documentation with Nuxt UI and Nuxt Content.',
    full: {
      title: 'Nuxt Docs Template - Full Documentation',
      description: 'This is the full documentation for the Nuxt Docs Template.',
    },
    sections: [
      {
        title: 'Getting Started',
      },
      {
        title: 'Essentials',
      },
    ],
  },
});
