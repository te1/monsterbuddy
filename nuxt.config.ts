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
    'nuxt-seo-utils',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
    'nuxt-og-image',
    'nuxt-link-checker',
    'nuxt-llms',
    '@nuxtjs/plausible',
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

  build: {
    // analyze: true,
  },

  analyzeDir: '.nuxt/analyze',

  compatibilityDate: '2026-03-24',

  sourcemap: false,

  vite: {
    build: {
      sourcemap: false,
      /*
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('/app/assets/2/') && id.endsWith('.json')) {
              return 'mhst2-data';
            }

            if (/\/app\/assets\/2\/.*\.(png|svg|webp)$/.test(id)) {
              return 'mhst2-images';
            }

            if (id.includes('/app/')) {
              return 'app';
            }

            if (
              id.includes('/node_modules/') &&
              (id.includes('vue') ||
                id.includes('nuxt') ||
                id.includes('ui/') ||
                id.includes('motion-v/'))
            ) {
              return 'ui';
            }
          },
        },
      },
      */
    },
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
    trailingSlash: false,
    defaultLocale: 'en',
  },

  seo: {
    canonicalQueryWhitelist: [''],
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

  ogImage: {
    zeroRuntime: true,
    buildCache: {
      base: 'node_modules/.cache/nuxt/nuxt-seo/og-image/',
    },
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

  plausible: {
    enabled: process.env.PLAUSIBLE === 'true',
    apiHost: 'https://newt.te1.workers.dev', // TODO /
  },
});
