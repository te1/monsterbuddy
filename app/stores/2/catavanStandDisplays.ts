import type { Display } from '~/components/s2/monster/S2MonsterSmartListItem.vue';
import { makeDisplaysStore } from './baseDisplays';

const useCatavanStandDisplays = makeDisplaysStore<Display>(
  's2/catavanStandDisplays',
  'monster',
  'monster',
  (display: Display): string => {
    switch (display) {
      case 'monster':
        return 'Monster';

      case 'monstie':
        return 'Monstie';

      case 'egg':
        return 'Egg';
    }
  },
  (): Display[] => {
    return ['monster', 'monstie', 'egg'];
  }
);

export default useCatavanStandDisplays;
