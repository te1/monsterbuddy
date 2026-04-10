import useGeneHistoryStore from './geneHistoryStore';

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

const useGeneSources = defineStore('s3/geneSources', {
  state() {
    return {
      current: 'default' as Source,
    };
  },

  getters: {
    all(): Source[] {
      const history = useGeneHistoryStore();

      const results: Source[] = ['default'];

      if (history.hasRecentGenes) {
        results.push('recent');
      }

      if (history.hasPinnedGenes) {
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

export default useGeneSources;

export type SourcesStore = ReturnType<typeof useGeneSources>;
