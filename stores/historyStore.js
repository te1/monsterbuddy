import { defineStore } from 'pinia';
import useMonsterFilter from './monsterFilter';
import useMonstieFilter from './monstieFilter';
import useEggFilter from './eggFilter';

const useHistoryStore = defineStore({
  state() {
    return {
      lastList: null,
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
  },
});

export default useHistoryStore;
