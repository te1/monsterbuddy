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

  header: {
    title: '',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: '',
    },
    search: true,
    colorMode: true,
    links: [
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/nuxt-ui-templates/docs',
        target: '_blank',
        'aria-label': 'GitHub',
      },
    ],
  },
});
