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
    '@nuxtjs/seo',
    'nuxt-llms',
    '@nuxtjs/plausible',
  ],

  telemetry: false,

  devtools: {
    enabled: true,
  },

  ui: {
    theme: {
      colors: ['primary', 'neutral'],
    },
    experimental: {
      componentDetection: true,
    },
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

  vite: {
    build: {
      assetsInlineLimit(filePath, content) {
        // these have 2x versions that break when we inline the 1x version
        const neverInline = [
          '/2/monster',
          '/2/monster-sm',
          '/3/monster',
          '/3/monster-sm',
          '/3/monster-icon',
        ];

        if (neverInline.some((path) => filePath.includes(path))) {
          return false;
        }

        // default behavior
        return content.length < 4096;
      },

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
    exclude: ['/404', '/1/**'], // TODO MHST1
    zeroRuntime: process.env.NODE_ENV !== 'development',
    discoverImages: false,
    discoverVideos: false,
    xsl: false,
    credits: false,
  },

  ogImage: {
    zeroRuntime: true,
    buildCache: {
      base: './node_modules/.cache/nuxt/nuxt-seo/og-image/', // move to nuxt folder so cloudflare picks it up
    },
  },

  linkChecker: {
    runOnBuild: false,
  },

  llms: {
    domain: 'https://monsterbuddy.app',
    title: 'Monster Buddy - Companion App For Monster Hunter Stories',
    description:
      "Learn or remember information useful during combat and general gameplay for Capcom's Monster Hunter Stories games. This includes all monsters with attack patterns and weaknesses, monsties with egg patterns and stats, and more.",
    sections: [
      {
        title: 'Monster Hunter Stories 1: Original / Remastered',
        links: [
          { title: 'Monsters with attack patterns and weaknesses', href: '/1/monsters' },
          { title: 'Monsties with stats', href: '/1/monsties' },
          { title: 'Visual egg guide', href: '/1/eggs' },
        ],
      },
      {
        title: 'Monster Hunter Stories 2: Wings of Ruin',
        links: [
          { title: 'Monsters with attack patterns and weaknesses', href: '/2/monsters' },
          { title: 'Monsties with stats', href: '/2/monsties' },
          { title: 'Visual egg guide', href: '/2/eggs' },
        ],
      },
      {
        title: 'Monster Hunter Stories 3: Twisted Reflection',
        links: [
          { title: 'Monsters with attack patterns and weaknesses', href: '/3/monsters' },
          { title: 'Monsties with stats', href: '/3/monsties' },
          { title: 'Visual egg guide', href: '/3/eggs' },
        ],
      },
    ],
  },

  plausible: {
    enabled: process.env.PLAUSIBLE === 'true',
    apiHost: '/',
  },
});
