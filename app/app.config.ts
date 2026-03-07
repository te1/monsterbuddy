export default defineAppConfig({
  ui: {
    colors: {
      primary: 'sky',
      neutral: 'mist',
    },

    icons: {
      arrowDown: 'ph:arrow-down',
      arrowLeft: 'ph:arrow-left',
      arrowRight: 'ph:arrow-right',
      arrowUp: 'ph:arrow-up',
      caution: 'ph:warning-circle',
      check: 'ph:check',
      chevronDoubleLeft: 'ph:caret-double-left',
      chevronDoubleRight: 'ph:caret-double-right',
      chevronDown: 'ph:caret-down',
      chevronLeft: 'ph:caret-left',
      chevronRight: 'ph:caret-right',
      chevronUp: 'ph:caret-up',
      close: 'ph:x',
      copy: 'ph:copy',
      copyCheck: 'ph:check-circle',
      dark: 'ph:moon',
      drag: 'ph:dots-six-vertical',
      ellipsis: 'ph:dots-three',
      error: 'ph:x-circle',
      external: 'ph:arrow-up-right',
      eye: 'ph:eye',
      eyeOff: 'ph:eye-slash',
      file: 'ph:file',
      folder: 'ph:folder',
      folderOpen: 'ph:folder-open',
      hash: 'ph:hash',
      info: 'ph:info',
      light: 'ph:sun',
      loading: 'ph:circle-notch',
      menu: 'ph:list',
      minus: 'ph:minus',
      panelClose: 'ph:caret-left',
      panelOpen: 'ph:caret-right',
      plus: 'ph:plus',
      reload: 'ph:arrow-counter-clockwise',
      search: 'ph:magnifying-glass',
      stop: 'ph:square',
      success: 'ph:check-circle',
      system: 'ph:monitor',
      tip: 'ph:lightbulb',
      upload: 'ph:upload',
      warning: 'ph:warning',
    },

    error: {
      slots: {
        statusMessage: 'font-medium',
      },
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

    tabs: {
      variants: {
        variant: {
          link: {
            list: 'gap-4',
            content: 'mt-1 px-1',
          },
        },
        size: {
          md: {
            trigger: 'px-0 py-0',
          },
        },
      },
    },

    button: {
      variants: {
        variant: {
          soft2:
            'text-highlighted bg-default/50 hover:bg-default active:bg-accented/50 focus:outline-none focus-visible:bg-default disabled:bg-default/50 aria-disabled:bg-default/50 select-none',
          subtle2:
            'ring ring-inset ring-inverted/50 text-highlighted bg-default/50 hover:bg-default active:bg-default disabled:bg-default/50 aria-disabled:bg-default/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted select-none',
        },
      },
    },

    formField: {
      slots: {
        root: 'place-items-baseline',
        container: 'w-full overflow-hidden',
        labelWrapper: 'w-14 xl:w-24',
        label: 'font-normal truncate select-none',
      },
    },

    input: {
      variants: {
        variant: {
          soft2:
            'text-highlighted bg-default/50 hover:bg-default focus:bg-default disabled:bg-default/50',
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
          soft2:
            'text-highlighted bg-default/50 hover:bg-default focus:bg-default disabled:bg-default/50',
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
