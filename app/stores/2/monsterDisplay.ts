import useHistoryStore from './historyStore';

export type Display = 'default' | 'recent' | 'pinned';

export type DisplayItem = {
  value: Display;
  label: string;
};

export function displayToLabel(display: Display): string {
  switch (display) {
    case 'default':
      return 'All';

    case 'recent':
      return 'Recent';

    case 'pinned':
      return 'Bookmarks';
  }
}

const useMonsterDisplay = defineStore('s2/monsterDisplay', {
  state() {
    return {
      current: 'default' as Display,
    };
  },

  getters: {
    all: () => {
      const history = useHistoryStore();

      const results: Display[] = ['default'];

      if (history.hasRecentMonsters) {
        results.push('recent');
      }

      if (history.hasPinnedMonsters) {
        results.push('pinned');
      }

      return results;
    },

    items(): DisplayItem[] {
      return this.all.map((display) => {
        return {
          value: display,
          label: displayToLabel(display),
        };
      });
    },

    next(): Display {
      const currentIndex = this.all.indexOf(this.current);
      const nextIndex = (currentIndex + 1) % this.all.length;

      return this.all[nextIndex] ?? 'default';
    },
  },
});

export default useMonsterDisplay;
