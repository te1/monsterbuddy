import type { Display } from '~/components/s2/monster/S2MonsterSmartListItem.vue';
import { makeDisplaysStore } from '../baseDisplays';

const useRidingActionDisplays = makeDisplaysStore<Display>(
  's2/ridingActionDisplays',
  'monstie',
  'monstie',
  (display: Display): string => {
    switch (display) {
      case 'monstie':
        return 'Monstie';

      case 'egg':
        return 'Egg';

      default:
        return '';
    }
  },
  (): Display[] => {
    return ['monstie', 'egg'];
  }
);

export default useRidingActionDisplays;
