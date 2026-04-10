import { makeMonsterSourcesStore } from './baseMonsterSources';
import useMonsterHistoryStore from './monsterHistoryStore';

export type Source = 'default' | 'recent' | 'pinned';

const useMonstieSources = makeMonsterSourcesStore<Source>(
  's3/monstieSources',
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
    const history = useMonsterHistoryStore();

    const results: Source[] = ['default'];

    if (history.hasRecentMonsties) {
      results.push('recent');
    }

    if (history.hasPinnedMonsties) {
      results.push('pinned');
    }

    return results;
  }
);

export default useMonstieSources;
