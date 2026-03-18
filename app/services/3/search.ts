import { buildSearchGameRootItem, buildSearchHomePageItem, buildSearchPageConfig } from '../search';

export function buildMhst3Search(appTitle: string) {
  return buildSearchPageConfig([
    buildSearchHomePageItem(appTitle),
    buildSearchGameRootItem('mhst3'),
    {
      label: 'Monsters',
      to: '/3/monsters',
      icon: 'ph:file-text',
    },
    {
      label: 'Monsties',
      to: '/3/monsties',
      icon: 'ph:file-text',
    },
    {
      label: 'Eggs',
      to: '/3/eggs',
      icon: 'ph:file-text',
    },
    {
      label: 'Areas & Habitat Restoration',
      to: '/3/areas',
      icon: 'ph:file-text',
    },
    {
      label: 'Riding Actions',
      to: '/3/riding-actions',
      icon: 'ph:file-text',
    },
    buildSearchGameRootItem('mhst1'),
    buildSearchGameRootItem('mhst2'),
  ]);
}
