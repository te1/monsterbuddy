import _ from 'lodash';
import { defineStore } from 'pinia';
import useMonsterFilter from './monsterFilter';
import useMonstieFilter from './monstieFilter';
import useEggFilter from './eggFilter';
import { monstersBySlug, getMonstersByHatchable } from '~/services/data';
import storage from '~/services/storage';

const storageKeyRecentMonsterSlugs = 'history.recentMonsterSlugs';
const storageKeyPinnedMonsterSlugs = 'history.pinnedMonsterSlugs';
const storageKeyPinnedEggSlugs = 'history.pinnedEggSlugs';

function pull(array, item) {
  let index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
  }
}

const useHistoryStore = defineStore({
  state() {
    return {
      lastList: null,
      recentMonsterSlugs: [],
      pinnedMonsterSlugs: [],
      pinnedEggSlugs: [],
    };
  },

  getters: {
    lastListStore() {
      switch (this.lastList) {
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

    lastListMode() {
      return this.lastListStore?.mode;
    },

    shouldShowMonstie: (state) => (monster) => {
      return state.lastList === 'monsties' && monster.hatchable;
    },

    shouldShowEgg: (state) => (monster) => {
      return state.lastList === 'eggs' && monster.hatchable;
    },

    lastListModeSmart: (state) => (monster) => {
      let showMonstie = state.shouldShowMonstie(monster);
      let showEgg = state.shouldShowEgg(monster);

      return state.listModeSmart(showMonstie, showEgg);
    },

    listModeSmart:
      (state) =>
      (showMonstie, showEgg, mode = null) => {
        let store;

        if (showMonstie) {
          store = useMonstieFilter();
        } else if (showEgg) {
          store = useEggFilter();
        } else {
          store = useMonsterFilter();
        }

        mode = mode ?? store.mode;

        if (_.includes(store.autoSwitchModes, mode)) {
          return mode;
        }
        return undefined;
      },

    recentMonsters() {
      return _.map(this.recentMonsterSlugs, (slug) => {
        return monstersBySlug[slug];
      });
    },

    hasRecentMonsters() {
      return !!this.recentMonsters.length;
    },

    recentMonsties() {
      return getMonstersByHatchable(true, this.recentMonsters);
    },

    hasRecentMonsties() {
      return !!this.recentMonsties.length;
    },

    pinnedMonsters() {
      return _.map(this.pinnedMonsterSlugs, (slug) => {
        return monstersBySlug[slug];
      });
    },

    hasPinnedMonsters() {
      return !!this.pinnedMonsters.length;
    },

    isMonsterPinned: (state) => (slug) => {
      return _.includes(state.pinnedMonsterSlugs, slug);
    },

    pinnedEggs() {
      return _.map(this.pinnedEggSlugs, (slug) => {
        return monstersBySlug[slug];
      });
    },

    hasPinnedEggs() {
      return !!this.pinnedEggs.length;
    },

    isEggPinned: (state) => (slug) => {
      return _.includes(state.pinnedEggSlugs, slug);
    },
  },

  actions: {
    loadFromStorage() {
      this.recentMonsterSlugs = storage.get(
        storageKeyRecentMonsterSlugs,
        this.recentMonsterSlugs
      );
      this.pinnedMonsterSlugs = storage.get(
        storageKeyPinnedMonsterSlugs,
        this.pinnedMonsterSlugs
      );
      this.pinnedEggSlugs = storage.get(
        storageKeyPinnedEggSlugs,
        this.pinnedEggSlugs
      );
    },

    addRecentMonster(slug) {
      const maxRecentItems = 25;

      pull(this.recentMonsterSlugs, slug);

      while (this.recentMonsterSlugs.length >= maxRecentItems) {
        this.recentMonsterSlugs.pop();
      }

      this.recentMonsterSlugs.unshift(slug);

      storage.set(storageKeyRecentMonsterSlugs, this.recentMonsterSlugs);
    },

    togglePinnedMonster(slug) {
      if (this.isMonsterPinned(slug)) {
        pull(this.pinnedMonsterSlugs, slug);
      } else {
        this.pinnedMonsterSlugs.unshift(slug);
      }

      storage.set(storageKeyPinnedMonsterSlugs, this.pinnedMonsterSlugs);
    },

    togglePinnedEgg(slug) {
      if (this.isEggPinned(slug)) {
        pull(this.pinnedEggSlugs, slug);
      } else {
        this.pinnedEggSlugs.unshift(slug);
      }

      storage.set(storageKeyPinnedEggSlugs, this.pinnedEggSlugs);
    },
  },
});

export default useHistoryStore;
