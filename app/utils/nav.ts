import type { NavigationMenuItem } from '@nuxt/ui';

export const mainNavItems: NavigationMenuItem[] = [
  {
    label: gameTypeToShortName('mhst1'),
    to: '/1',
  },
  {
    label: gameTypeToShortName('mhst2'),
    to: '/2',
  },
  {
    label: gameTypeToShortName('mhst3'),
    to: '/3',
  },
];

export const mhst1NavItems: NavigationMenuItem[] = [
  {
    label: 'Monsters',
    to: '/1/monsters',
  },
  {
    label: 'Monsties',
    to: '/1/monsties',
  },
  {
    label: 'Eggs',
    to: '/1/eggs',
  },
  {
    label: 'More',
    children: [
      {
        label: 'Tower of Illusion',
        to: '/1/tower-of-illusion',
      },
      {
        label: 'Riding Actions',
        to: '/1/riding-actions',
      },
    ],
  },
];

export const mhst2NavItems: NavigationMenuItem[] = [
  {
    label: 'Monsters',
    to: '/2/monsters',
  },
  {
    label: 'Monsties',
    to: '/2/monsties',
  },
  {
    label: 'Eggs',
    to: '/2/eggs',
  },
  {
    label: 'More',
    children: [
      {
        label: 'Catavan Stands',
        to: '/2/catavan-stands',
      },
      {
        label: "Elder's Lair",
        to: '/2/elders-lair',
      },
      {
        label: 'Co-Op Quests',
        to: '/2/coop',
      },
      {
        label: 'Riding Actions',
        to: '/2/riding-actions',
      },
    ],
  },
];

export const mhst3NavItems: NavigationMenuItem[] = [
  {
    label: 'Monsters',
    to: '/3/monsters',
  },
  {
    label: 'Monsties',
    to: '/3/monsties',
  },
  {
    label: 'Eggs',
    to: '/3/eggs',
  },
  {
    label: 'More',
    children: [
      {
        label: 'Areas',
        description: 'Habitat Restoration',
        to: '/3/areas',
      },
      {
        label: 'Riding Actions',
        to: '/3/riding-actions',
      },
    ],
  },
];

export const navItems: Record<GameType, NavigationMenuItem[]> = {
  none: mainNavItems,
  mhst1: mhst1NavItems,
  mhst2: mhst2NavItems,
  mhst3: mhst3NavItems,
};

export function getNavItems(routePath: string): NavigationMenuItem[] {
  const gameType = routePathToGameType(routePath);

  return navItems[gameType];
}

export function patchNavItemsForBottomNav(navItems: NavigationMenuItem[]): NavigationMenuItem[] {
  return navItems.map((item) => {
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
    return item;
  });
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

export function gameTypeToShortLabel(gameType: GameType): string {
  switch (gameType) {
    case 'none':
      return 'Game';

    case 'mhst1':
      return 'MHST 1';

    case 'mhst2':
      return 'MHST 2';

    case 'mhst3':
      return 'MHST 3';
  }
}

export function gameTypeToFullLabel(gameType: GameType): string {
  switch (gameType) {
    case 'mhst1':
      return 'Monster Hunter Stories';

    case 'mhst2':
      return 'Monster Hunter Stories 2';

    case 'mhst3':
      return 'Monster Hunter Stories 3';

    default:
      return '';
  }
}

export function gameTypeToDescription(gameType: GameType): string {
  switch (gameType) {
    case 'mhst1':
      return 'Original / Remastered';

    case 'mhst2':
      return 'Wings of Ruin';

    case 'mhst3':
      return 'Twisted Reflection';

    default:
      return '';
  }
}

export function gameTypeToShortName(gameType: GameType): string {
  switch (gameType) {
    case 'mhst1':
    case 'mhst2':
    case 'mhst3':
      return `${gameTypeToShortLabel(gameType)}: ${gameTypeToDescription(gameType)}`;

    default:
      return '';
  }
}

export function gameTypeToFullName(gameType: GameType): string {
  switch (gameType) {
    case 'mhst1':
    case 'mhst2':
    case 'mhst3':
      return `${gameTypeToFullLabel(gameType)}: ${gameTypeToDescription(gameType)}`;

    default:
      return '';
  }
}
