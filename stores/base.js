import _ from 'lodash';
import { defineStore, setMapStoreSuffix } from 'pinia';

import {
  getGenera,
  getHabitats,
  getRidingActions,
  getMonstersByName,
  getMonstersByGenus,
  getMonstersByHabitat,
  getMonstiesByAttackType,
  getMonstiesByAttackElement,
  getMonstiesByRidingAction,
  getMonstersByHatchable,
  getMonstersByIsDeviant,
} from '~/services/data';

setMapStoreSuffix('');

export function makeMonsterFilterStore(
  storeId,
  monsters,
  initial = {},
  extend = {}
) {
  _.defaults(initial, {
    sortKey: null,
    sortOrder: null,
    nameFilter: null,
    genusFilter: null,
    habitatFilter: null,
    attackTypeFilter: null,
    attackElementFilter: null,
    ridingActionFilter: null,
    hatchableFilter: null,
    deviantsFilter: null,
  });

  return defineStore({
    id: storeId,

    state() {
      return {
        monsters,

        sortKey: initial.sortKey,
        sortOrder: initial.sortOrder,
        nameFilter: initial.nameFilter,
        genusFilter: initial.genusFilter,
        habitatFilter: initial.habitatFilter,
        attackTypeFilter: initial.attackTypeFilter,
        attackElementFilter: initial.attackElementFilter,
        ridingActionFilter: initial.ridingActionFilter,
        hatchableFilter: initial.hatchableFilter,
        deviantsFilter: initial.deviantsFilter,

        ...extend?.state,
      };
    },

    getters: {
      allGenera() {
        return getGenera(this.monsters);
      },

      allHabitats() {
        return getHabitats(this.monsters);
      },

      allRidingActions() {
        return getRidingActions(this.monsters);
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

        if (this.ridingActionFilter != null) {
          result = getMonstiesByRidingAction(this.ridingActionFilter, result);
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

        if (!_.includes(['no', 'name', 'genus', 'habitat'], this.sortKey)) {
          return result;
        }

        return _.orderBy(result, [this.sortKey], [this.sortOrder]);
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

      ...extend?.getters,
    },

    actions: {
      resetFilter() {
        this.nameFilter = initial.nameFilter;
        this.genusFilter = initial.genusFilter;
        this.habitatFilter = initial.habitatFilter;
        this.attackTypeFilter = initial.attackTypeFilter;
        this.attackElementFilter = initial.attackElementFilter;
        this.ridingActionFilter = initial.ridingActionFilter;
        this.hatchableFilter = initial.hatchableFilter;
        this.deviantsFilter = initial.deviantsFilter;
      },

      resetFilterAndSort() {
        this.resetFilter();

        this.sortKey = initial.sortKey;
        this.sortOrder = initial.sortOrder;
      },

      ...extend?.actions,
    },
  });
}
