import { makeMonsterDisplayStore } from './baseMonsterDisplay';
import useHistoryStore from './historyStore';

export type Display = 'default' | 'recent' | 'pinned';

const useMonstieDisplay = makeMonsterDisplayStore<Display>(
  's2/monstieDisplay',
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

    if (history.hasPinnedMonsties) {
      results.push('pinned');
    }

    return results;
  }
);

export default useMonstieDisplay;
