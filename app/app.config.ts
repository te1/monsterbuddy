export default defineAppConfig({
  ui: {
    colors: {
      primary: 'sky',
      neutral: 'mist',
    },

    footer: {
      slots: {
        root: 'border-t border-default',
      },
    },
  },

  seo: {
    title: 'Monster Buddy',
  },
});
