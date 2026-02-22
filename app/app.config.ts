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
    description:
      'Includes monster attack types and weaknesses, egg patterns, monstie locations and retreat conditions', // TODO mention all 3 games
  },
});
