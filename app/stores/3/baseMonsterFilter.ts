import type { EggColor, Monster } from '~/services/3/types';
import { groupBy, orderBy } from 'es-toolkit/array';
import { upperFirst } from 'es-toolkit/string';
import {
  getEggColors,
  getGenera,
  getMonstersByGenus,
  getMonstersByHatchable,
  getMonstersByName,
  getRidingActions,
  getMonstiesByAttackType,
  getMonstiesByAttackElement,
  getMonstiesByRidingAction,
  getMonstiesByEggColors,
  getMonstersByIsDeviant,
} from '~/services/3/data';

export type SortKey =
  | 'name'
  | 'genus'
  | 'rank'
  | 'stats.base.attack'
  | 'stats.base.speed'
  | 'stats.base.crit'
  | 'stats.base.hp'
  | 'stats.base.defense';

const sortValueGetters = {
  name: (item: Monster) => item.name,
  genus: (item: Monster) => item.genus,
  rank: (item: Monster) => item.rank,
  'stats.base.attack': (item: Monster) => item.stats?.base?.attack,
  'stats.base.speed': (item: Monster) => item.stats?.base?.speed,
  'stats.base.crit': (item: Monster) => item.stats?.base?.crit,
  'stats.base.hp': (item: Monster) => item.stats?.base?.hp,
  'stats.base.defense': (item: Monster) => item.stats?.base?.defense,
} satisfies Record<SortKey, (item: Monster) => unknown>;

export type Mode = 'combat' | 'compact' | 'location' | 'rank' | 'ridingActions' | 'stats';

export type Modes = { value: Mode; label: string }[];

export interface MonsterFilterInitialState {
  sortKey: SortKey;
  sortOrder: SortOrder;
  nameFilter?: string;
  genusFilter?: GenusType;
  attackTypeFilter?: AttackType;
  attackElementFilter?: ElementType;
  ridingActionFilter?: string;
  eggColorsFilter?: EggColor[];
  hatchableFilter?: boolean;
  deviantsFilter?: boolean;
  mode: Mode;
  autoSwitchModes: Mode[];
}

export type FilterKey =
  | 'genusFilter'
  | 'attackTypeFilter'
  | 'attackElementFilter'
  | 'ridingActionFilter'
  | 'eggColorsFilter'
  | 'hatchableFilter'
  | 'deviantsFilter';

export function makeMonsterFilterStore(
  storeId: string,
  monsters: Monster[],
  initial: MonsterFilterInitialState
) {
  return defineStore(storeId, {
    state() {
      return {
        monsters,
        sortKey: initial.sortKey,
        sortOrder: initial.sortOrder,
        preserveSourceOrder: false,
        nameFilter: initial.nameFilter,
        genusFilter: initial.genusFilter,
        attackTypeFilter: initial.attackTypeFilter,
        attackElementFilter: initial.attackElementFilter,
        ridingActionFilter: initial.ridingActionFilter,
        eggColorsFilter: initial.eggColorsFilter,
        hatchableFilter: initial.hatchableFilter,
        deviantsFilter: initial.deviantsFilter,

        mode: initial.mode,
        autoSwitchModes: initial.autoSwitchModes,
      };
    },

    getters: {
      allGenera: (state) => getGenera(state.monsters),
      allRidingActions: (state) => getRidingActions(state.monsters),
      allEggColors: (state) => getEggColors(state.monsters),

      filteredMonsters: (state) => {
        let result = state.monsters;

        if (state.nameFilter != null) {
          result = getMonstersByName(state.nameFilter, result);
        }

        if (state.genusFilter != null) {
          result = getMonstersByGenus(state.genusFilter, result);
        }

        if (state.attackTypeFilter != null) {
          result = getMonstiesByAttackType(state.attackTypeFilter, result);
        }

        if (state.attackElementFilter != null) {
          result = getMonstiesByAttackElement(state.attackElementFilter, result);
        }

        if (state.ridingActionFilter != null) {
          result = getMonstiesByRidingAction(state.ridingActionFilter, result);
        }

        if (state.eggColorsFilter != null) {
          result = getMonstiesByEggColors(state.eggColorsFilter, result);
        }

        if (state.hatchableFilter != null) {
          result = getMonstersByHatchable(state.hatchableFilter, result);
        }

        if (state.deviantsFilter != null) {
          result = getMonstersByIsDeviant(state.deviantsFilter, result);
        }

        return result;
      },

      sortedMonsters(): Monster[] {
        const monsters = this.filteredMonsters;

        if (this.sortKey == null) {
          return monsters;
        }

        if (this.preserveSourceOrder) {
          return monsters;
        }

        const getSortValue = sortValueGetters[this.sortKey];

        return orderBy(
          monsters,
          [
            (item: Monster) => {
              const value = getSortValue(item);

              if (value == null || value === '?') {
                return -Infinity;
              }

              return value;
            },
          ],
          [this.sortOrder]
        );
      },

      groupedMonsters(): Record<string, Monster[]> {
        const monsters = this.sortedMonsters;

        switch (this.sortKey) {
          case 'genus':
            return groupBy(monsters, (item) => item.genus);

          default:
            return { all: monsters };
        }
      },

      resultCount(): number {
        return this.sortedMonsters.length;
      },

      isEmpty() {
        return this.sortedMonsters.length <= 0;
      },

      isGrouped: (state) => {
        return ['genus'].includes(state.sortKey);
      },

      activeSort: (state) => {
        switch (state.sortKey) {
          case 'rank':
            return {
              name: state.sortKey,
              order: state.sortOrder,
              caption: 'Rank',
            };

          default:
            return null;
        }
      },

      hasActiveSort() {
        return this.activeSort != null;
      },

      activeFilters: (state) => {
        const result: { name: FilterKey; value: string }[] = [];

        if (state.genusFilter != null) {
          result.push({ name: 'genusFilter', value: state.genusFilter });
        }

        if (state.attackTypeFilter != null) {
          result.push({
            name: 'attackTypeFilter',
            value: formatAttackType(state.attackTypeFilter),
          });
        }

        if (state.attackElementFilter != null) {
          result.push({
            name: 'attackElementFilter',
            value: formatElement(state.attackElementFilter),
          });
        }

        if (state.ridingActionFilter != null) {
          result.push({
            name: 'ridingActionFilter',
            value: state.ridingActionFilter,
          });
        }

        if (state.eggColorsFilter != null) {
          result.push({
            name: 'eggColorsFilter',
            value: state.eggColorsFilter.map(upperFirst).join(' / '),
          });
        }

        if (state.hatchableFilter != null) {
          result.push({
            name: 'hatchableFilter',
            value: state.hatchableFilter ? 'Hatchable' : 'Not Hatchable',
          });
        }

        if (state.deviantsFilter != null) {
          result.push({
            name: 'deviantsFilter',
            value: state.deviantsFilter ? 'Deviant' : 'No Deviants',
          });
        }

        return result;
      },

      hasActiveFilters() {
        return !!this.activeFilters?.length;
      },
    },

    actions: {
      setMonsters(
        monsters: Monster[],
        options: {
          preserveSourceOrder?: boolean;
        } = {}
      ) {
        this.monsters = monsters;
        this.preserveSourceOrder = options.preserveSourceOrder ?? false;
      },

      setSort(sortKey: SortKey, sortOrder: SortOrder) {
        this.preserveSourceOrder = false;
        this.sortKey = sortKey;
        this.sortOrder = sortOrder;
      },

      setSortOrder(sortOrder: SortOrder) {
        this.preserveSourceOrder = false;
        this.sortOrder = sortOrder;
      },

      resetFilter() {
        this.nameFilter = initial.nameFilter;
        this.genusFilter = initial.genusFilter;
        this.attackTypeFilter = initial.attackTypeFilter;
        this.attackElementFilter = initial.attackElementFilter;
        this.ridingActionFilter = initial.ridingActionFilter;
        this.eggColorsFilter = initial.eggColorsFilter;
        this.hatchableFilter = initial.hatchableFilter;
        this.deviantsFilter = initial.deviantsFilter;
      },

      resetFilterAndSort() {
        this.resetFilter();
        this.setSort(initial.sortKey, initial.sortOrder);
      },
    },
  });
}

export type FilterStore = ReturnType<ReturnType<typeof makeMonsterFilterStore>>;

export const filterStoreKey: InjectionKey<FilterStore> = Symbol();
