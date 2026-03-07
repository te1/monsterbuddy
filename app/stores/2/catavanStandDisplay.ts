import { makeMonsterDisplayStore } from './baseMonsterDisplay';

export type Display = 'monster' | 'monstie' | 'egg';

const useCatavanStandDisplay = makeMonsterDisplayStore<Display>(
  's2/catavanStandDisplay',
  'monster',
  'monster',
  (display: Display): string => {
    switch (display) {
      case 'monster':
        return 'Monster data';

      case 'monstie':
        return 'Monstie data';

      case 'egg':
        return 'Eggs';
    }
  },
  (): Display[] => {
    return ['monster', 'monstie', 'egg'];
  }
);

export default useCatavanStandDisplay;
