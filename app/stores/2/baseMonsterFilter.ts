import { skipHydrate } from 'pinia';

import type { EggColor, Monster } from '~/services/2/types';
import { groupBy, orderBy } from 'es-toolkit/array';
import { upperFirst } from 'es-toolkit/string';
import {
  getGenera,
  getHabitats,
  getCoopQuests,
  getCatavanStands,
  getEldersLairFloors,
  getRidingActions,
  getEggColors,
  getMonstersByName,
  getMonstersByGenus,
  getMonstersByHabitat,
  getMonstersByCoopQuest,
  getMonstersByCatavanStand,
  getMonstersByEldersLairFloor,
  getMonstiesByAttackType,
  getMonstiesByAttackElement,
  getMonstiesByRidingAction,
  getMonstiesByEggColors,
  getMonstersByHatchable,
  getMonstersByIsDeviant,
  sortedHabitats,
} from '~/services/2/data';

export type SortKey =
  | 'no'
  | 'name'
  | 'genus'
  | 'habitat'
  | 'rarity'
  | 'monstie.stats.base.maxHp'
  | 'monstie.stats.base.speed'
  | 'monstie.stats.base.critRate'
  | 'monstie.stats.bestAttack.value'
  | 'monstie.stats.bestDefense.value'
  | 'monstie.stats.worstDefense.value'
  | 'eldersLair';

const sortValueGetters = {
  no: (item: Monster) => item.no,
  name: (item: Monster) => item.name,
  genus: (item: Monster) => item.genus,
  habitat: (item: Monster) =>
    sortedHabitats.find((habitat) => habitat.name === item.habitat)?.sortOrder ?? item.habitat,
  rarity: (item: Monster) => item.rarity,
  'monstie.stats.base.maxHp': (item: Monster) => item.monstie?.stats?.base?.maxHp ?? null,
  'monstie.stats.base.speed': (item: Monster) => item.monstie?.stats?.base?.speed ?? null,
  'monstie.stats.base.critRate': (item: Monster) => item.monstie?.stats?.base?.critRate ?? null,
  'monstie.stats.bestAttack.value': (item: Monster) =>
    item.monstie?.stats?.bestAttack?.value ?? null,
  'monstie.stats.bestDefense.value': (item: Monster) =>
    item.monstie?.stats?.bestDefense?.value ?? null,
  'monstie.stats.worstDefense.value': (item: Monster) =>
    item.monstie?.stats?.worstDefense?.value ?? null,
  eldersLair: () => null, // only used for grouping, not sorting
} satisfies Record<SortKey, (item: Monster) => unknown>;

export type Mode =
  | 'combat'
  | 'compact'
  | 'location'
  | 'location-coop'
  | 'location-eldersLair'
  | 'rarity'
  | 'retreat'
  | 'ridingActions'
  | 'stats';

export type Modes = { value: Mode; label: string }[];

export interface MonsterFilterInitialState {
  sortKey: SortKey;
  sortOrder: SortOrder;
  nameFilter?: string;
  genusFilter?: GenusType;
  habitatFilter?: string;
  coopQuestFilter?: string;
  catavanFilter?: string;
  eldersLairFilter?: string;
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
  | 'habitatFilter'
  | 'coopQuestFilter'
  | 'catavanFilter'
  | 'eldersLairFilter'
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
    const monsters = skipHydrate(shallowRef(initialMonsters));
    const sortKey = ref(initial.sortKey);
    const sortOrder = ref(initial.sortOrder);
    const preserveSourceOrder = ref(false);
    const nameFilter = ref(initial.nameFilter);
    const genusFilter = ref(initial.genusFilter);
    const habitatFilter = ref(initial.habitatFilter);
    const coopQuestFilter = ref(initial.coopQuestFilter);
    const catavanFilter = ref(initial.catavanFilter);
    const eldersLairFilter = ref(initial.eldersLairFilter);
    const attackTypeFilter = ref(initial.attackTypeFilter);
    const attackElementFilter = ref(initial.attackElementFilter);
    const ridingActionFilter = ref(initial.ridingActionFilter);
    const eggColorsFilter = ref(initial.eggColorsFilter);
    const hatchableFilter = ref(initial.hatchableFilter);
    const deviantsFilter = ref(initial.deviantsFilter);
    const mode = ref(initial.mode);
    const autoSwitchModes = ref(initial.autoSwitchModes);

    const allGenera = computed(() => getGenera(monsters.value));
    const allHabitats = computed(() => getHabitats(monsters.value));
    const allCoopQuests = computed(() => getCoopQuests(monsters.value));
    const allCatavanStands = computed(() => getCatavanStands(monsters.value));
    const allEldersLairFloors = computed(() => getEldersLairFloors(monsters.value));
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

      if (habitatFilter.value != null) {
        result = getMonstersByHabitat(habitatFilter.value, result);
      }

      if (coopQuestFilter.value != null) {
        result = getMonstersByCoopQuest(coopQuestFilter.value, result);
      }

      if (catavanFilter.value != null) {
        result = getMonstersByCatavanStand(catavanFilter.value, result);
      }

      if (eldersLairFilter.value != null) {
        result = getMonstersByEldersLairFloor(eldersLairFilter.value, result);
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

    function groupedMonstersByEldersLairFloors(monsterList: Monster[]) {
      const floors = eldersLairFilter.value
        ? [eldersLairFilter.value]
        : getEldersLairFloors(monsterList);

      return floors.reduce<Record<string, Monster[]>>((result, floor) => {
        result[floor] = getMonstersByEldersLairFloor(floor, monsterList);

        return result;
      }, {});
    }

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
              return -Infinity;
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

        case 'habitat':
          return groupBy(sorted, (item) => item.habitat);

        case 'eldersLair':
          return groupedMonstersByEldersLairFloors(sorted);

        default:
          return { all: sorted };
      }
    });

    const resultCount = computed(() => sortedMonsters.value.length);
    const isEmpty = computed(() => sortedMonsters.value.length <= 0);
    const isGrouped = computed(() => ['genus', 'habitat', 'eldersLair'].includes(sortKey.value));
    const activeSort = computed(() => {
      switch (sortKey.value) {
        case 'name':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'Name',
          };

        case 'rarity':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'Rarity',
          };

        case 'monstie.stats.base.maxHp':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'Max HP',
          };

        case 'monstie.stats.base.speed':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'Speed',
          };

        case 'monstie.stats.base.critRate':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'Crit Rate',
          };

        case 'monstie.stats.bestAttack.value':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'Best Attack',
          };

        case 'monstie.stats.bestDefense.value':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'Best Defense',
          };

        case 'monstie.stats.worstDefense.value':
          return {
            name: sortKey.value,
            order: sortOrder.value,
            caption: 'Worst Defense',
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

      if (habitatFilter.value != null) {
        result.push({ name: 'habitatFilter', value: habitatFilter.value });
      }

      if (coopQuestFilter.value != null) {
        result.push({ name: 'coopQuestFilter', value: coopQuestFilter.value });
      }

      if (catavanFilter.value != null) {
        result.push({ name: 'catavanFilter', value: catavanFilter.value });
      }

      if (eldersLairFilter.value != null) {
        result.push({
          name: 'eldersLairFilter',
          value: "Elder's Lair - " + eldersLairFilter.value,
        });
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
      habitatFilter.value = initial.habitatFilter;
      coopQuestFilter.value = initial.coopQuestFilter;
      catavanFilter.value = initial.catavanFilter;
      eldersLairFilter.value = initial.eldersLairFilter;
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
      sortKey,
      sortOrder,
      preserveSourceOrder,
      nameFilter,
      genusFilter,
      habitatFilter,
      coopQuestFilter,
      catavanFilter,
      eldersLairFilter,
      attackTypeFilter,
      attackElementFilter,
      ridingActionFilter,
      eggColorsFilter,
      hatchableFilter,
      deviantsFilter,
      mode,
      autoSwitchModes,
      allGenera,
      allHabitats,
      allCoopQuests,
      allCatavanStands,
      allEldersLairFloors,
      allRidingActions,
      allEggColors,
      filteredMonsters,
      sortedMonsters,
      groupedMonsters,
      groupedMonstersByEldersLairFloors,
      resultCount,
      isEmpty,
      isGrouped,
      activeSort,
      hasActiveSort,
      activeFilters,
      hasActiveFilters,
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
