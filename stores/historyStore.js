import _ from 'lodash';
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

    shouldShowMonstie: (state) => (monster) => {
      return state.lastList === 'monsties' && monster.hatchable;
    },

    shouldShowEgg: (state) => (monster) => {
      return state.lastList === 'eggs' && monster.hatchable;
    },

    lastListModeSmart: (state) => (monster) => {
      let showMonstie = state.shouldShowMonstie(monster);
      let showEgg = state.shouldShowEgg(monster);

      let store;

      if (showMonstie) {
        store = useMonstieFilter();
      } else if (showEgg) {
        store = useEggFilter();
      } else {
        store = useMonsterFilter();
      }

      if (_.includes(store.autoSwitchModes, store.mode)) {
        return store.mode;
      }
      return undefined;
    },
  },
});

export default useHistoryStore;
