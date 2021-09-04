import _ from 'lodash';
import { defineStore } from 'pinia';
import useMonsterFilter from './monsterFilter';
import useMonstieFilter from './monstieFilter';
import useEggFilter from './eggFilter';
import { monstersBySlug, getMonstersByHatchable } from '~/services/data';
import storage from '~/services/storage';

const storageKeyRecentMonsterSlugs = 'history.recentMonsterSlugs';

const useHistoryStore = defineStore({
  state() {
    return {
      lastList: null,
      recentMonsterSlugs: [],
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
  },

  actions: {
    loadFromStorage() {
      this.recentMonsterSlugs = storage.get(storageKeyRecentMonsterSlugs) ?? [];
    },

    addRecentMonster(slug) {
      const maxRecentItems = 25;

      _.pull(this.recentMonsterSlugs, slug);

      while (this.recentMonsterSlugs.length >= maxRecentItems) {
        this.recentMonsterSlugs.pop();
      }

      this.recentMonsterSlugs.unshift(slug);

      storage.set(storageKeyRecentMonsterSlugs, this.recentMonsterSlugs);
    },
  },
});

export default useHistoryStore;
