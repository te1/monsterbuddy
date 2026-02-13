export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate',
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted',
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
  footer: {
    credits: `Built with Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        icon: 'i-simple-icons-discord',
        to: 'https://go.nuxt.com/discord',
        target: '_blank',
        'aria-label': 'Nuxt on Discord',
      },
      {
        icon: 'i-simple-icons-x',
        to: 'https://go.nuxt.com/x',
        target: '_blank',
        'aria-label': 'Nuxt on X',
      },
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/nuxt/ui',
        target: '_blank',
        'aria-label': 'Nuxt UI on GitHub',
      },
    ],
  },
});
