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
        root: 'border-accented dark:border-default bg-default/90',
      },
    },

    page: {
      slots: {
        root: 'lg:flex lg:flex-row lg:gap-8',
        center: 'lg:flex-1',
        right: 'lg:ps-0 lg:ms-0 lg:w-52 xl:w-66',
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

    pageBody: {
      base: 'mt-0 pb-6 space-y-0',
    },

    pageHero: {
      slots: {
        title: 'font-medium',
      },
    },

    pageSection: {
      slots: {
        title: 'font-medium',
      },
    },

    tabs: {
      variants: {
        variant: {
          link: {
            list: 'gap-4 border-transparent',
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

    radioGroup: {
      compoundVariants: [
        {
          size: 'md',
          variant: ['card', 'table'],
          class: {
            item: 'p-1 py-1.25',
          },
        },
        {
          color: 'neutral',
          variant: 'table',
          class: {
            item: 'group bg-default/50 has-data-[state=checked]:bg-default/50 has-data-[state=checked]:border-inverted/50 has-data-[state=checked]:z-1',
            label: 'font-normal text-toned group-has-data-[state=checked]:text-highlighted',
          },
        },
      ],
    },

    button: {
      variants: {
        variant: {
          'soft-filter':
            'text-highlighted bg-default/50 hover:bg-default active:bg-accented/50 focus:outline-none focus-visible:bg-default disabled:bg-default/50 aria-disabled:bg-default/50 select-none',
          'soft-filter-modal':
            'text-default bg-accented dark:bg-elevated/50 hover:bg-elevated active:bg-elevated dark:active:bg-accented/75 focus:outline-none focus-visible:bg-elevated dark:focus-visible:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated select-none',
          fab: 'ring ring-inset ring-accented text-toned active:text-highlighted bg-default hover:bg-elevated active:bg-accented focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted shadow-md',
        },
      },
    },

    badge: {
      variants: {
        variant: {
          'soft-filter': 'text-default bg-accented hover:bg-default/50 active:bg-default',
        },
      },
    },

    alert: {
      variants: {
        variant: {
          'soft-bg': {
            root: 'bg-default/50 shadow',
          },
        },
      },
    },

    formField: {
      slots: {
        root: 'place-items-baseline group',
        container: 'w-full overflow-hidden',
        labelWrapper: 'w-14 xl:w-24 group-data-[modal-layout=true]:w-24',
        label:
          'font-normal truncate select-none group-data-[modal-layout=true]:text-highlighted group-data-[modal-layout=true]:dark:text-default',
      },
    },

    input: {
      variants: {
        variant: {
          'soft-filter':
            'text-highlighted bg-default/50 hover:bg-default focus:bg-default disabled:bg-default/50',
          'soft-filter-modal':
            'text-highlighted bg-accented dark:bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50',
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
          'soft-filter':
            'text-highlighted bg-default/50 hover:bg-default focus:bg-default disabled:bg-default/50',
          'soft-filter-modal':
            'text-highlighted bg-accented dark:bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50',
        },
      },
    },

    commandPalette: {
      variants: {
        active: {
          true: {
            item: 'text-highlighted before:bg-accented dark:before:bg-elevated',
          },
          false: {
            item: [
              'text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-accented/50 dark:data-highlighted:not-data-disabled:before:bg-elevated/50',
              'transition-colors before:transition-colors',
            ],
          },
        },
      },
    },

    skeleton: {
      base: 'bg-accented',
    },

    prose: {
      h3: { slots: { base: 'mt-0 mb-2 font-medium' } },
      p: { base: 'my-0' },
      ul: { base: 'ps-4.5 my-0' },
      li: { base: 'ps-0 my-0.5' },
    },
  },

  seo: {
    title: 'Monster Buddy',
    description:
      'Monster attack types and weaknesses, egg patterns and monstie locations for all three games',
  },
});
