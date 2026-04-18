import type { NavigationMenuItem } from '@nuxt/ui';

const mainNavItems: NavigationMenuItem[] = [
  // TODO MHST1
  // {
  //   label: gameTypeToShortName('mhst1'),
  //   to: '/1',
  // },
  {
    label: gameTypeToShortName('mhst2'),
    to: '/2',
  },
  {
    label: gameTypeToShortName('mhst3'),
    to: '/3',
  },
];

function buildMhst1NavItems(path: string): NavigationMenuItem[] {
  const isActive = (to: string) => path.startsWith(to);

  return [
    {
      label: 'Monsters',
      to: '/1/monsters',
      active: isActive('/1/monsters'),
    },
    {
      label: 'Monsties',
      to: '/1/monsties',
      active: isActive('/1/monsties'),
    },
    {
      label: 'Eggs',
      to: '/1/eggs',
      active: isActive('/1/eggs'),
    },
    {
      label: 'More',
      children: [
        {
          label: 'Tower of Illusion',
          to: '/1/tower-of-illusion',
          active: isActive('/1/tower-of-illusion'),
        },
        {
          label: 'Riding Actions',
          to: '/1/riding-actions',
          active: isActive('/1/riding-actions'),
        },
      ],
    },
  ];
}

function buildMhst2NavItems(path: string): NavigationMenuItem[] {
  const isActive = (to: string) => path.startsWith(to);

  return [
    {
      label: 'Monsters',
      to: '/2/monsters',
      active: isActive('/2/monsters'),
    },
    {
      label: 'Monsties',
      to: '/2/monsties',
      active: isActive('/2/monsties'),
    },
    {
      label: 'Eggs',
      to: '/2/eggs',
      active: isActive('/2/eggs'),
    },
    {
      label: 'More',
      children: [
        {
          label: 'Catavan Stands',
          to: '/2/catavan-stands',
          active: isActive('/2/catavan-stands'),
        },
        {
          label: "Elder's Lair",
          to: '/2/elders-lair',
          active: isActive('/2/elders-lair'),
        },
        {
          label: 'Co-Op Quests',
          to: '/2/coop',
          active: isActive('/2/coop'),
        },
        {
          label: 'Riding Actions',
          to: '/2/riding-actions',
          active: isActive('/2/riding-actions'),
        },
      ],
    },
  ];
}

function buildMhst3NavItems(path: string): NavigationMenuItem[] {
  const isActive = (to: string) => path.startsWith(to);

  const genes = (classes: string): NavigationMenuItem => {
    return {
      label: 'Genes',
      to: '/3/genes',
      active: isActive('/3/genes'),
      class: classes,
    };
  };

  return [
    {
      label: 'Monsters',
      to: '/3/monsters',
      active: isActive('/3/monsters'),
    },
    {
      label: 'Monsties',
      to: '/3/monsties',
      active: isActive('/3/monsties'),
    },
    {
      label: 'Eggs',
      to: '/3/eggs',
      active: isActive('/3/eggs'),
    },
    genes('hidden xs:flex'),
    {
      label: 'More',
      children: [
        {
          label: 'Habitat Restoration',
          description: 'Regions & Areas',
          to: '/3/habitats',
          active: isActive('/3/habitats'),
        },
        {
          label: 'Egg Powers',
          to: '/3/egg-powers',
          active: isActive('/3/egg-powers'),
        },
        genes('flex xs:hidden'),
        {
          label: 'Riding Actions',
          to: '/3/riding-actions',
          active: isActive('/3/riding-actions'),
        },
      ],
    },
  ];
}

export function useNavItems() {
  const route = useRoute();

  return computed<NavigationMenuItem[]>(() => {
    const path = route.path;
    const gameType = routePathToGameType(path);

    switch (gameType) {
      case 'mhst1':
        return buildMhst1NavItems(path);

      case 'mhst2':
        return buildMhst2NavItems(path);

      case 'mhst3':
        return buildMhst3NavItems(path);

      default:
        return mainNavItems;
    }
  });
}

export function useBottomNavItems() {
  const route = useRoute();
  const navItems = useNavItems();

  return computed(() =>
    navItems.value.map((item) => {
      if (item.children) {
        return {
          ...item,
          slot: item.label?.replace(' ', '-').toLowerCase(),
          as: 'span',
          class: 'p-0',
          items: item.children,
          children: undefined,
        };
      }

      item.onSelect = () => {
        // scroll to top if we are on this page already

        if (item.to == null) {
          return;
        }

        const router = useRouter();
        const resolvedRoute = router.resolve(item.to);

        if (resolvedRoute.path === route.path) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      };

      return item;
    })
  );
}

export function routePathToGameType(routePath: string): GameType {
  if (routePath.startsWith('/1')) {
    return 'mhst1';
  }

  if (routePath.startsWith('/2')) {
    return 'mhst2';
  }

  if (routePath.startsWith('/3')) {
    return 'mhst3';
  }

  return 'none';
}
