console.log('>> NODE_ENV', process.env.NODE_ENV);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/a11y',
    // '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/mdc',
    '@pinia/nuxt',
    'nuxt-site-config',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
    'nuxt-og-image',
    'nuxt-link-checker',
    'nuxt-llms',
  ],

  telemetry: false,

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '1/**': { appLayout: 'sidebar1' },
    '2/**': { appLayout: 'sidebar2' },
    '3/**': { appLayout: 'sidebar3' },
  },

  experimental: {
    asyncContext: true,
  },

  compatibilityDate: '2026-02-01',

  vite: {
    optimizeDeps: {
      include: ['@vueuse/core', 'es-toolkit/array', 'es-toolkit/string'],
    },
  },

  nitro: {
    prerender: {
      routes: ['/', '/sitemap.xml'],
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
    clientBundle: {
      scan: {
        globInclude: ['**/*.{vue,jsx,tsx,md,mdc,mdx,yml,yaml}', 'app/app.config.ts'],
      },
    },
  },

  pinia: {
    storesDirs: ['app/stores/**'],
  },

  site: {
    name: 'Monster Buddy',
    // TODO description?
    trailingSlash: false,
    defaultLocale: 'en',
  },

  robots: {
    credits: false,
  },

  sitemap: {
    exclude: ['/404'],
    zeroRuntime: process.env.NODE_ENV !== 'development',
    discoverImages: false,
    discoverVideos: false,
    xsl: false,
    credits: false,
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
