import { skipHydrate } from 'pinia';

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
  | 'stats.base.defense'
  | 'stats.base.bulk'
  | 'stats.base.total';

const sortValueGetters = {
  name: (item: Monster) => item.name,
  genus: (item: Monster) => item.genus,
  rank: (item: Monster) => item.rank,
  'stats.base.attack': (item: Monster) => item.stats?.base?.attack,
  'stats.base.speed': (item: Monster) => item.stats?.base?.speed,
  'stats.base.crit': (item: Monster) => item.stats?.base?.crit,
  'stats.base.hp': (item: Monster) => item.stats?.base?.hp,
  'stats.base.defense': (item: Monster) => item.stats?.base?.defense,
  'stats.base.bulk': (item: Monster) => item.stats?.base?.bulk,
  'stats.base.total': (item: Monster) => item.stats?.base?.total,
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
  initialMonsters: Monster[],
  initial: MonsterFilterInitialState
) {
  return defineStore(storeId, () => {
    // -- state
    const monsters = skipHydrate(shallowRef(initialMonsters));

    const sortKey = ref(initial.sortKey);
    const sortOrder = ref(initial.sortOrder);
    const preserveSourceOrder = ref(false);
    const nameFilter = ref(initial.nameFilter);
    const genusFilter = ref(initial.genusFilter);
    const attackTypeFilter = ref(initial.attackTypeFilter);
    const attackElementFilter = ref(initial.attackElementFilter);
    const ridingActionFilter = ref(initial.ridingActionFilter);
    const eggColorsFilter = ref(initial.eggColorsFilter);
    const hatchableFilter = ref(initial.hatchableFilter);
    const deviantsFilter = ref(initial.deviantsFilter);

    const mode = ref(initial.mode);
    const autoSwitchModes = ref(initial.autoSwitchModes);

    // -- getters
    const allGenera = computed(() => getGenera(monsters.value));

    const allRidingActions = computed(() => getRidingActions(monsters.value));

    const allEggColors = computed(() => getEggColors(monsters.value));

    const filteredMonsters = computed(() => {
      let result = monsters.value;

      if (nameFilter.value != null) {
        result = getMonstersByName(nameFilter.value, result);
      }

      if (genusFilter.value != null) {
        result = getMonstersByGenus(genusFilter.value, result);
      }

      if (attackTypeFilter.value != null) {
        result = getMonstiesByAttackType(attackTypeFilter.value, result);
      }

      if (attackElementFilter.value != null) {
        result = getMonstiesByAttackElement(attackElementFilter.value, result);
      }

      if (ridingActionFilter.value != null) {
        result = getMonstiesByRidingAction(ridingActionFilter.value, result);
      }

      if (eggColorsFilter.value != null) {
        result = getMonstiesByEggColors(eggColorsFilter.value, result);
      }

      if (hatchableFilter.value != null) {
        result = getMonstersByHatchable(hatchableFilter.value, result);
      }

      if (deviantsFilter.value != null) {
        result = getMonstersByIsDeviant(deviantsFilter.value, result);
      }

      return result;
    });

    const sortedMonsters = computed<Monster[]>(() => {
      const filtered = filteredMonsters.value;

      if (sortKey.value == null || preserveSourceOrder.value) {
        return filtered;
      }

      const getSortValue = sortValueGetters[sortKey.value];

      return orderBy(
        filtered,
        [
          (item: Monster) => {
            const value = getSortValue(item);

            if (value == null || value === '?') {
              return sortOrder.value === 'asc' ? Infinity : -Infinity;
            }

            return value;
          },
        ],
        [sortOrder.value]
      );
    });

    const groupedMonsters = computed<Record<string, Monster[]>>(() => {
      const sorted = sortedMonsters.value;

      switch (sortKey.value) {
        case 'genus':
          return groupBy(sorted, (item) => item.genus);

        default:
          return { all: sorted };
      }
    });

    const resultCount = computed(() => sortedMonsters.value.length);

    const isEmpty = computed(() => sortedMonsters.value.length <= 0);

    const isGrouped = computed(() => ['genus'].includes(sortKey.value));

    const activeSort = computed(() => {
      if (preserveSourceOrder.value) {
        return null;
      }

      switch (sortKey.value) {
        case 'name':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'Name',
          };

        case 'rank':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'Rank',
          };

        case 'stats.base.hp':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'HP',
          };

        case 'stats.base.defense':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'Defense',
          };

        case 'stats.base.attack':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'Attack',
          };

        case 'stats.base.speed':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'Speed',
          };

        case 'stats.base.crit':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'Crit',
          };

        case 'stats.base.bulk':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'Bulk',
          };

        case 'stats.base.total':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'Total',
          };

        default:
          return null;
      }
    });

    const hasActiveSort = computed(() => activeSort.value != null);

    const activeFilters = computed(() => {
      const result: { name: FilterKey; value: string }[] = [];

      if (genusFilter.value != null) {
        result.push({ name: 'genusFilter', value: genusFilter.value });
      }

      if (attackTypeFilter.value != null) {
        result.push({
          name: 'attackTypeFilter',
          value: formatAttackType(attackTypeFilter.value),
        });
      }

      if (attackElementFilter.value != null) {
        result.push({
          name: 'attackElementFilter',
          value: formatElement(attackElementFilter.value),
        });
      }

      if (ridingActionFilter.value != null) {
        result.push({
          name: 'ridingActionFilter',
          value: ridingActionFilter.value,
        });
      }

      if (eggColorsFilter.value != null) {
        result.push({
          name: 'eggColorsFilter',
          value: eggColorsFilter.value.map(upperFirst).join(' / '),
        });
      }

      if (hatchableFilter.value != null) {
        result.push({
          name: 'hatchableFilter',
          value: hatchableFilter.value ? 'Hatchable' : 'Not Hatchable',
        });
      }

      if (deviantsFilter.value != null) {
        result.push({
          name: 'deviantsFilter',
          value: deviantsFilter.value ? 'Deviant' : 'No Deviants',
        });
      }

      return result;
    });

    const hasActiveFilters = computed(() => !!activeFilters.value.length);

    // -- actions
    function setMonsters(
      nextMonsters: Monster[],
      options: {
        preserveSourceOrder?: boolean;
      } = {}
    ) {
      monsters.value = nextMonsters;
      preserveSourceOrder.value = options.preserveSourceOrder ?? false;
    }

    function setSort(nextSortKey: SortKey, nextSortOrder: SortOrder) {
      preserveSourceOrder.value = false;
      sortKey.value = nextSortKey;
      sortOrder.value = nextSortOrder;
    }

    function setSortOrder(nextSortOrder: SortOrder) {
      preserveSourceOrder.value = false;
      sortOrder.value = nextSortOrder;
    }

    function resetFilter() {
      nameFilter.value = initial.nameFilter;
      genusFilter.value = initial.genusFilter;
      attackTypeFilter.value = initial.attackTypeFilter;
      attackElementFilter.value = initial.attackElementFilter;
      ridingActionFilter.value = initial.ridingActionFilter;
      eggColorsFilter.value = initial.eggColorsFilter;
      hatchableFilter.value = initial.hatchableFilter;
      deviantsFilter.value = initial.deviantsFilter;
    }

    function resetFilterAndSort() {
      resetFilter();
      setSort(initial.sortKey, initial.sortOrder);
    }

    return {
      // -- state
      sortKey,
      sortOrder,
      preserveSourceOrder,
      nameFilter,
      genusFilter,
      attackTypeFilter,
      attackElementFilter,
      ridingActionFilter,
      eggColorsFilter,
      hatchableFilter,
      deviantsFilter,
      mode,

      // -- getters
      autoSwitchModes,
      allGenera,
      allRidingActions,
      allEggColors,
      filteredMonsters,
      sortedMonsters,
      groupedMonsters,
      resultCount,
      isEmpty,
      isGrouped,
      activeSort,
      hasActiveSort,
      activeFilters,
      hasActiveFilters,

      // -- actions
      setMonsters,
      setSort,
      setSortOrder,
      resetFilter,
      resetFilterAndSort,
    };
  });
}

export type FilterStore = ReturnType<ReturnType<typeof makeMonsterFilterStore>>;

export const filterStoreKey: InjectionKey<FilterStore> = Symbol();
