export default defineAppConfig({
  ui: {
    colors: {
      primary: 'sky',
      neutral: 'mist',
    },

    tooltip: {
      slots: {
        kbds: 'not-first-of-type:before:content-["_"]',
      },
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

    page: {
      slots: {
        root: 'lg:grid-cols-12 lg:gap-16',
        center: 'lg:col-span-9',
        right: 'lg:col-span-3',
      },
    },

    pageAside: {
      slots: {
        root: 'pt-3 lg:pe-0',
      },
    },

    pageHeader: {
      slots: {
        root: 'py-4 border-0',
        headline: 'font-medium',
        title: 'text-2xl font-normal dark:text-toned',
        description: 'text-base text-toned dark:text-muted',
      },
    },

    button: {
      variants: {
        variant: {
          soft2:
            'bg-default/50 hover:bg-default focus-visible:bg-default active:bg-default disabled:bg-default/50 aria-disabled:bg-default/50',
        },
      },
    },

    formField: {
      slots: {
        root: 'place-items-baseline',
        container: 'w-full overflow-hidden',
        labelWrapper: 'w-14',
      },
    },

    input: {
      variants: {
        variant: {
          soft2: 'bg-default/50 hover:bg-default focus:bg-default disabled:bg-default/50',
        },
      },
    },

    select: {
      slots: {
        base: 'select-none',
        trailingIcon: 'transition-transform duration-200 group-data-[state=open]:rotate-180',
      },
      variants: {
        variant: {
          soft2: 'bg-default/50 hover:bg-default focus:bg-default disabled:bg-default/50',
        },
      },
    },

    skeleton: {
      base: 'bg-accented',
    },
  },

  seo: {
    title: 'Monster Buddy',
    description:
      'Includes monster attack types and weaknesses, egg patterns, monstie locations and retreat conditions', // TODO mention all 3 games
  },
});
