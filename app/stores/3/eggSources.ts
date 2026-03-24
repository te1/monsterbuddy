import type { FilterStore } from './baseMonsterFilter';
import { makeMonsterSourcesStore } from './baseMonsterSources';
import useHistoryStore from './historyStore';

export type Source = 'default' | 'recent' | 'pinned';

const useEggSources = makeMonsterSourcesStore<Source>(
  's3/eggSources',
  'default',
  'default',
  (source: Source): string => {
    switch (source) {
      case 'default':
        return 'All';

      case 'recent':
        return 'Recent';

      case 'pinned':
        return 'Bookmarks';
    }
  },
  (): Source[] => {
    const history = useHistoryStore();

    const results: Source[] = ['default'];

    if (history.hasRecentMonsties) {
      results.push('recent');
    }

    if (history.hasPinnedEggs) {
      results.push('pinned');
    }

    return results;
  },
  (source: Source, filter: FilterStore) => {
    if (source === 'pinned') {
      filter.mode = 'compact';
    }
  }
);

export default useEggSources;
