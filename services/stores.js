import _ from 'lodash';
import { defineStore, setMapStoreSuffix } from 'pinia';

import {
  getGenera,
  getHabitats,
  getMonstersByName,
  getMonstersByGenus,
  getMonstersByHabitat,
  getMonstiesByAttackType,
  getMonstiesByAttackElement,
  getMonstersByHatchable,
  getMonstersByIsDeviant,
} from '~/services/data';

setMapStoreSuffix('');

export function makeMonsterFilterStore(storeId, monsters, initial = {}) {
  _.defaults(initial, {
    sortKey: null,
    nameFilter: null,
    genusFilter: null,
    habitatFilter: null,
    attackTypeFilter: null,
    attackElementFilter: null,
    hatchableFilter: null,
    deviantsFilter: null,
  });

  return defineStore({
    id: storeId,

    state() {
      return {
        monsters,

        sortKey: initial.sortKey,
        nameFilter: initial.nameFilter,
        genusFilter: initial.genusFilter,
        habitatFilter: initial.habitatFilter,
        attackTypeFilter: initial.attackTypeFilter,
        attackElementFilter: initial.attackElementFilter,
        hatchableFilter: initial.hatchableFilter,
        deviantsFilter: initial.deviantsFilter,
      };
    },

    getters: {
      allGenera() {
        return getGenera(this.monsters);
      },

      allHabitats() {
        return getHabitats(this.monsters);
      },

      filteredMonsters() {
        let result = this.monsters;

        if (this.nameFilter != null) {
          result = getMonstersByName(this.nameFilter, result);
        }

        if (this.genusFilter != null) {
          result = getMonstersByGenus(this.genusFilter, result);
        }

        if (this.habitatFilter != null) {
          result = getMonstersByHabitat(this.habitatFilter, result);
        }

        if (this.attackTypeFilter != null) {
          result = getMonstiesByAttackType(this.attackTypeFilter, result);
        }

        if (this.attackElementFilter != null) {
          result = getMonstiesByAttackElement(this.attackElementFilter, result);
        }

        if (this.hatchableFilter != null) {
          result = getMonstersByHatchable(this.hatchableFilter, result);
        }

        if (this.deviantsFilter != null) {
          result = getMonstersByIsDeviant(this.deviantsFilter, result);
        }

        return result;
      },

      sortedMonsters() {
        let result = this.filteredMonsters;

        switch (this.sortKey) {
          case 'name':
            return _.sortBy(result, 'name');

          case 'genus':
            return _.sortBy(result, 'genus');

          case 'habitat':
            return _.sortBy(result, 'habitat');

          default:
            return result;
        }
      },

      groupedMonsters() {
        let result = this.sortedMonsters;

        switch (this.sortKey) {
          case 'genus':
            result = _.groupBy(result, 'genus');
            break;

          case 'habitat':
            result = _.groupBy(result, 'habitat');
            break;

          default:
            result = { all: result };
            break;
        }

        return result;
      },

      resultCount() {
        return this.sortedMonsters.length;
      },

      isEmpty() {
        return !this.sortedMonsters.length;
      },

      isGrouped() {
        return _.includes(['genus', 'habitat'], this.sortKey);
      },

      canReset() {
        return (
          this.sortKey !== initial.sortKey &&
          this.nameFilter !== initial.nameFilter &&
          this.genusFilter !== initial.genusFilter &&
          this.habitatFilter !== initial.habitatFilter &&
          this.attackTypeFilter !== initial.attackTypeFilter &&
          this.attackElementFilter !== initial.attackElementFilter &&
          this.hatchableFilter !== initial.hatchableTypeFilter &&
          this.deviantsFilter !== initial.deviantsFilter
        );
      },
    },

    actions: {
      reset() {
        this.sortKey = initial.sortKey;
        this.nameFilter = initial.nameFilter;
        this.genusFilter = initial.genusFilter;
        this.habitatFilter = initial.habitatFilter;
        this.attackTypeFilter = initial.attackTypeFilter;
        this.attackElementFilter = initial.attackElementFilter;
        this.hatchableFilter = initial.hatchableFilter;
        this.deviantsFilter = initial.deviantsFilter;
      },
    },
  });
}
