export default defineAppConfig({
  ui: {
    colors: {
      primary: 'rose',
      neutral: 'zinc',
    },

    footer: {
      slots: {
        root: 'border-t border-default',
      },
    },
  },

  seo: {
    siteName: 'Nuxt Docs Template',
  },
});
