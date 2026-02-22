export default defineAppConfig({
  ui: {
    colors: {
      primary: 'sky',
      neutral: 'mist',
    },

    pageHeader: {
      slots: {
        root: 'pt-4',
      },
    },

    footer: {
      slots: {
        root: 'border-t border-default',
      },
    },
  },

  seo: {
    title: 'Monster Buddy',
    description:
      'Includes monster attack types and weaknesses, egg patterns, monstie locations and retreat conditions', // TODO mention all 3 games
  },
});
