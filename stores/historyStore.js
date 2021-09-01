import _ from 'lodash';
import { defineStore } from 'pinia';
import useMonsterFilter from './monsterFilter';
import useMonstieFilter from './monstieFilter';
import useEggFilter from './eggFilter';

const useHistoryStore = defineStore({
  state() {
    return {
      lastList: null,
      recentMonsters: [],
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

    hasRecentMonsters() {
      return !!this.recentMonsters.length;
    },
  },

  actions: {
    addRecentMonster(slug) {
      const maxRecentItems = 25;

      _.pull(this.recentMonsters, slug);

      while (this.recentMonsters.length >= maxRecentItems) {
        this.recentMonsters.pop();
      }

      this.recentMonsters.unshift(slug);
    },
  },
});

export default useHistoryStore;
