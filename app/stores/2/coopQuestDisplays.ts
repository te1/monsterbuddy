import type { CoopQuestType } from '~~/data/2/coopQuests.schema';
import type { Display } from '~/components/s2/monster/S2MonsterSmartListItem.vue';
import { makeDisplaysStore } from './baseDisplays';

const useCoopQuestDisplays = makeDisplaysStore<Display, { type: CoopQuestType }>(
  's2/coopQuestDisplays',
  'egg',
  'egg',
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
  function (): Display[] {
    switch (this.type) {
      case 'explore':
        return ['egg', 'monstie'];

      case 'slay':
        return ['monster', 'egg'];

      case 'time':
        return ['monster'];

      default:
        return [];
    }
  },
  {
    type: 'explore' as CoopQuestType,
  }
);

export default useCoopQuestDisplays;
