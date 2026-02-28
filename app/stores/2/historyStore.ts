import type { Monster } from '~/services/2/types';
import { pull } from 'es-toolkit/array';
import { useLocalStorage } from '@vueuse/core';
import useMonsterFilter from './monsterFilter';
import useMonstieFilter from './monstieFilter';
import useEggFilter from './eggFilter';
import { monsters, monstersBySlug, monsties, getMonstersByHatchable } from '~/services/2/data';

const storageKeyRecentMonsterSlugs = 's2/history/recentMonsterSlugs';
const storageKeyPinnedMonsterSlugs = 's2/history/pinnedMonsterSlugs';
const storageKeyPinnedMonstieSlugs = 's2/history/pinnedMonstieSlugs';
const storageKeyPinnedEggSlugs = 's2/history/pinnedEggSlugs';

const useHistoryStore = defineStore('s2/history', {
  state() {
    return {
      lastList: null as 'monsters' | 'monsties' | 'eggs' | null,
      recentMonsterSlugs: useLocalStorage<string[]>(storageKeyRecentMonsterSlugs, []),
      pinnedMonsterSlugs: useLocalStorage<string[]>(storageKeyPinnedMonsterSlugs, []),
      pinnedMonstieSlugs: useLocalStorage<string[]>(storageKeyPinnedMonstieSlugs, []),
      pinnedEggSlugs: useLocalStorage<string[]>(storageKeyPinnedEggSlugs, []),
    };
  },

  hydrate(state) {
    state.recentMonsterSlugs = useLocalStorage<string[]>(storageKeyRecentMonsterSlugs, []).value;
    state.pinnedMonsterSlugs = useLocalStorage<string[]>(storageKeyPinnedMonsterSlugs, []).value;
    state.pinnedMonstieSlugs = useLocalStorage<string[]>(storageKeyPinnedMonstieSlugs, []).value;
    state.pinnedEggSlugs = useLocalStorage<string[]>(storageKeyPinnedEggSlugs, []).value;
  },

  getters: {
    lastListStore: (state) => {
      switch (state.lastList) {
        case 'monsters':
          return useMonsterFilter();

        case 'monsties':
          return useMonstieFilter();

        case 'eggs':
          return useEggFilter();

        default:
          return null;
      }
    },

    lastListMode(): string | undefined {
      return this.lastListStore?.mode;
    },

    shouldShowMonstie: (state) => (monster: Monster) => {
      return state.lastList === 'monsties' && monster.hatchable;
    },

    shouldShowEgg: (state) => (monster: Monster) => {
      return state.lastList === 'eggs' && monster.hatchable;
    },

    lastListModeSmart(): (monster: Monster) => string | undefined {
      return (monster: Monster) => {
        const showMonstie = this.shouldShowMonstie(monster);
        const showEgg = this.shouldShowEgg(monster);

        return this.listModeSmart(showMonstie, showEgg);
      };
    },

    listModeSmart:
      () =>
      (showMonstie: boolean, showEgg: boolean, mode: string | null = null) => {
        let store;

        if (showMonstie) {
          store = useMonstieFilter();
        } else if (showEgg) {
          store = useEggFilter();
        } else {
          store = useMonsterFilter();
        }

        mode = mode ?? store.mode;

        const autoSwitchModes: readonly string[] = store.autoSwitchModes;
        if (autoSwitchModes.includes(mode)) {
          return mode;
        }
        return undefined;
      },

    recentMonsters: (state): Monster[] => {
      return state.recentMonsterSlugs
        .map((slug) => monstersBySlug.get(slug))
        .filter((monster): monster is Monster => monster != null);
    },

    hasRecentMonsters(): boolean {
      return !!this.recentMonsters.length;
    },

    recentMonsties(): Monster[] {
      return getMonstersByHatchable(true, this.recentMonsters);
    },

    hasRecentMonsties(): boolean {
      return !!this.recentMonsties.length;
    },

    pinnedMonsters: (state) => {
      return monsters.filter((monster) => {
        return state.pinnedMonsterSlugs.includes(monster.slug);
      });
    },

    hasPinnedMonsters(): boolean {
      return !!this.pinnedMonsters.length;
    },

    isMonsterPinned: (state) => (slug: string) => {
      return state.pinnedMonsterSlugs.includes(slug);
    },

    pinnedMonsties: (state) => {
      return monsties.filter((monster) => {
        return state.pinnedMonstieSlugs.includes(monster.slug);
      });
    },

    hasPinnedMonsties(): boolean {
      return !!this.pinnedMonsties.length;
    },

    isMonstiePinned: (state) => (slug: string) => {
      return state.pinnedMonstieSlugs.includes(slug);
    },

    pinnedEggs: (state) => {
      return monsties.filter((monster) => {
        return state.pinnedEggSlugs.includes(monster.slug);
      });
    },

    hasPinnedEggs(): boolean {
      return !!this.pinnedEggs.length;
    },

    isEggPinned: (state) => (slug: string) => {
      return state.pinnedEggSlugs.includes(slug);
    },
  },

  actions: {
    addRecentMonster(slug: string) {
      const maxRecentItems = 25;

      pull(this.recentMonsterSlugs, [slug]);

      while (this.recentMonsterSlugs.length >= maxRecentItems) {
        this.recentMonsterSlugs.pop();
      }

      this.recentMonsterSlugs.unshift(slug);
    },

    togglePinnedMonster(slug: string) {
      if (this.isMonsterPinned(slug)) {
        pull(this.pinnedMonsterSlugs, [slug]);
      } else {
        this.pinnedMonsterSlugs.unshift(slug);
      }
    },

    togglePinnedMonstie(slug: string) {
      if (this.isMonstiePinned(slug)) {
        pull(this.pinnedMonstieSlugs, [slug]);
      } else {
        this.pinnedMonstieSlugs.unshift(slug);
      }
    },

    togglePinnedEgg(slug: string) {
      if (this.isEggPinned(slug)) {
        pull(this.pinnedEggSlugs, [slug]);
      } else {
        this.pinnedEggSlugs.unshift(slug);
      }
    },
  },
});

export default useHistoryStore;
