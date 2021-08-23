import _ from 'lodash';
import { defineStore, setMapStoreSuffix } from 'pinia';

import {
  getGenera,
  getHabitats,
  getRidingActions,
  getEggColors,
  getMonstersByName,
  getMonstersByGenus,
  getMonstersByHabitat,
  getMonstiesByAttackType,
  getMonstiesByAttackElement,
  getMonstiesByRidingAction,
  getMonstiesByEggColors,
  getMonstersByHatchable,
  getMonstersByIsDeviant,
} from '~/services/data';
import { formatAttackType, formatElement } from '~/services/utils';

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
    eggColorsFilter: null,
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
        eggColorsFilter: initial.eggColorsFilter,
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

      allEggColors() {
        return getEggColors(this.monsters);
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

        if (this.eggColorsFilter != null) {
          result = getMonstiesByEggColors(this.eggColorsFilter, result);
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

        if (
          !_.includes(
            [
              'no',
              'name',
              'genus',
              'habitat',
              'monstie.stats.base.maxHp',
              'monstie.stats.base.speed',
              'monstie.stats.base.critRate',
              'monstie.stats.bestAttack.value',
              'monstie.stats.bestDefense.value',
              'monstie.stats.worstDefense.value',
            ],
            this.sortKey
          )
        ) {
          return result;
        }

        let value;

        return _.orderBy(
          result,
          (item) => {
            value = _.get(item, this.sortKey);

            if (value == null) {
              return -Infinity;
            }
            return value;
          },
          this.sortOrder
        );
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

      activeFilters() {
        let result = [];

        if (this.genusFilter != null) {
          result.push({ name: 'genusFilter', value: this.genusFilter });
        }

        if (this.habitatFilter != null) {
          result.push({ name: 'habitatFilter', value: this.habitatFilter });
        }

        if (this.attackTypeFilter != null) {
          result.push({
            name: 'attackTypeFilter',
            value: formatAttackType(this.attackTypeFilter),
          });
        }

        if (this.attackElementFilter != null) {
          result.push({
            name: 'attackElementFilter',
            value: formatElement(this.attackElementFilter),
          });
        }

        if (this.ridingActionFilter != null) {
          result.push({
            name: 'ridingActionFilter',
            value: this.ridingActionFilter,
          });
        }

        if (this.eggColorsFilter != null) {
          result.push({
            name: 'eggColorsFilter',
            value: _.map(this.eggColorsFilter, _.upperFirst).join(' / '),
          });
        }

        if (this.hatchableFilter != null) {
          result.push({
            name: 'hatchableFilter',
            value: this.hatchableFilter ? 'Hatchable' : 'Not Hatchable',
          });
        }

        if (this.deviantsFilter != null) {
          result.push({
            name: 'deviantsFilter',
            value: this.deviantsFilter ? 'Deviant' : 'No Deviants',
          });
        }

        return result;
      },

      hasActiveFilters() {
        return !!this.activeFilters?.length;
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
        this.eggColorsFilter = initial.eggColorsFilter;
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
