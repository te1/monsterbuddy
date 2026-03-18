import { buildSearchGameRootItem, buildSearchHomePageItem, buildSearchPageConfig } from '../search';

export function buildMhst1Search(appTitle: string) {
  return buildSearchPageConfig([
    buildSearchHomePageItem(appTitle),
    buildSearchGameRootItem('mhst1'),
    {
      label: 'Monsters',
      to: '/1/monsters',
      icon: 'ph:file-text',
    },
    {
      label: 'Monsties',
      to: '/1/monsties',
      icon: 'ph:file-text',
    },
    {
      label: 'Eggs',
      to: '/1/eggs',
      icon: 'ph:file-text',
    },
    {
      label: 'Tower of Illusion',
      to: '/1/tower-of-illusion',
      icon: 'ph:file-text',
    },
    {
      label: 'Riding Actions',
      to: '/1/riding-actions',
      icon: 'ph:file-text',
    },
    buildSearchGameRootItem('mhst2'),
    buildSearchGameRootItem('mhst3'),
  ]);
}
