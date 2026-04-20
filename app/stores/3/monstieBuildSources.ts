import useMonstieBuildHistoryStore from './monstieBuildHistoryStore';

export type Source = 'default' | 'recent' | 'pinned';

export type SourceItem = {
  value: Source;
  label: string;
};

function sourceToLabel(source: Source): string {
  switch (source) {
    case 'default':
      return 'All';

    case 'recent':
      return 'Recent';

    case 'pinned':
      return 'Bookmarks';
  }
}

const useMonstieBuildSources = defineStore('s3/monstieBuildSources', {
  state() {
    return {
      current: 'default' as Source,
    };
  },

  getters: {
    all(): Source[] {
      const history = useMonstieBuildHistoryStore();

      const results: Source[] = ['default'];

      if (history.hasRecentBuilds) {
        results.push('recent');
      }

      if (history.hasPinnedBuilds) {
        results.push('pinned');
      }

      return results;
    },

    items(): SourceItem[] {
      return this.all.map((source) => {
        return {
          value: source,
          label: sourceToLabel(source),
        };
      });
    },

    next(): Source {
      const current = this.current as Source;
      const currentIndex = this.all.indexOf(current);
      const nextIndex = (currentIndex + 1) % this.all.length;

      return this.all[nextIndex] ?? 'default';
    },
  },

  actions: {
    setCurrent(value: Source) {
      this.current = value;
    },
  },
});

export default useMonstieBuildSources;

export type SourcesStore = ReturnType<typeof useMonstieBuildSources>;
