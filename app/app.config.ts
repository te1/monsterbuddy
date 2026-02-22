export default defineAppConfig({
  ui: {
    colors: {
      primary: 'sky',
      neutral: 'mist',
    },

    header: {
      slots: {
        root: 'border-accented dark:border-default',
      },
    },

    footer: {
      slots: {
        root: 'border-t border-accented', // TODO remove border?
      },
    },

    pageHeader: {
      slots: {
        root: 'py-4 border-0',
        headline: 'font-medium',
        title: 'font-normal dark:text-toned',
      },
    },
  },

  seo: {
    title: 'Monster Buddy',
    description:
      'Includes monster attack types and weaknesses, egg patterns, monstie locations and retreat conditions', // TODO mention all 3 games
  },
});
