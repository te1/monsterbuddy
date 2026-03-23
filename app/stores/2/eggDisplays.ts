import type { Display } from '~/components/s2/monster/S2MonsterSmartListItem.vue';
import { makeDisplaysStore } from '../baseDisplays';

const useEggsDisplay = makeDisplaysStore<Display>(
  's2/eggDisplays',
  'monstie',
  'monstie',
  (display: Display): string => {
    switch (display) {
      case 'monstie':
        return 'All eggs';

      case 'egg':
        return 'Egg finder';

      default:
        return '';
    }
  },
  (): Display[] => {
    return ['monstie', 'egg'];
  }
);

export default useEggsDisplay;
