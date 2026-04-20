import type { Display } from '~/components/s3/monster/S3MonsterSmartListItem.vue';
import { makeDisplaysStore } from '../baseDisplays';

const useHabitatDisplays = makeDisplaysStore<Display>(
  's3/habitatDisplays',
  'monstie',
  'monstie',
  (display: Display): string => {
    switch (display) {
      case 'monster':
        return 'Monster';

      case 'monstie':
        return 'Monstie';

      case 'egg':
        return 'Egg';

      default:
        return '';
    }
  },
  (): Display[] => {
    return ['monster', 'monstie', 'egg'];
  }
);

export default useHabitatDisplays;
