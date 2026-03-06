import type { FilterStore } from './baseMonsterFilter';
import { makeMonsterDisplayStore } from './baseMonsterDisplay';
import useHistoryStore from './historyStore';

export type Display = 'default' | 'recent' | 'pinned';

const useEggDisplay = makeMonsterDisplayStore<Display>(
  's2/eggDisplay',
  'default',
  'default',
  (display: Display): string => {
    switch (display) {
      case 'default':
        return 'All';

      case 'recent':
        return 'Recent';

      case 'pinned':
        return 'Bookmarks';
    }
  },
  (): Display[] => {
    const history = useHistoryStore();

    const results: Display[] = ['default'];

    if (history.hasRecentMonsties) {
      results.push('recent');
    }

    if (history.hasPinnedEggs) {
      results.push('pinned');
    }

    return results;
  },
  (display: Display, filter: FilterStore) => {
    if (display === 'pinned') {
      filter.mode = 'compact';
    }
  }
);

export default useEggDisplay;
