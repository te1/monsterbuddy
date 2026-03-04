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
import type { EggColor, Monster } from '~/services/2/types';

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

export type SortOrder = 'asc' | 'desc';

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

export interface MonsterFilterInitialState {
  sortKey?: SortKey;
  sortOrder?: SortOrder;
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

type FilterKey =
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
  monsters: Monster[],
  initial: MonsterFilterInitialState
) {
  return defineStore(storeId, {
    state() {
      return {
        monsters,

        sortKey: initial.sortKey,
        sortOrder: initial.sortOrder,
        nameFilter: initial.nameFilter,
        genusFilter: initial.genusFilter,
        habitatFilter: initial.habitatFilter,
        coopQuestFilter: initial.coopQuestFilter,
        catavanFilter: initial.catavanFilter,
        eldersLairFilter: initial.eldersLairFilter,
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
      allHabitats: (state) => getHabitats(state.monsters),
      allCoopQuests: (state) => getCoopQuests(state.monsters),
      allCatavanStands: (state) => getCatavanStands(state.monsters),
      allEldersLairFloors: (state) => getEldersLairFloors(state.monsters),
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

        if (state.habitatFilter != null) {
          result = getMonstersByHabitat(state.habitatFilter, result);
        }

        if (state.coopQuestFilter != null) {
          result = getMonstersByCoopQuest(state.coopQuestFilter, result);
        }

        if (state.catavanFilter != null) {
          result = getMonstersByCatavanStand(state.catavanFilter, result);
        }

        if (state.eldersLairFilter != null) {
          result = getMonstersByEldersLairFloor(state.eldersLairFilter, result);
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

        const sortOrder = this.sortOrder ?? 'asc';
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
          [sortOrder]
        );
      },

      groupedMonsters(): Record<string, Monster[]> {
        const monsters = this.sortedMonsters;

        switch (this.sortKey) {
          case 'genus':
            return groupBy(monsters, (item) => item.genus);

          case 'habitat':
            return groupBy(monsters, (item) => item.habitat);

          case 'eldersLair':
            return this.groupedMonstersByEldersLairFloors(monsters);

          default:
            return { all: monsters };
        }
      },

      groupedMonstersByEldersLairFloors: (state) => (monsters: Monster[]) => {
        const floors = state.eldersLairFilter
          ? [state.eldersLairFilter]
          : getEldersLairFloors(monsters);

        return floors.reduce<Record<string, Monster[]>>((result, floor) => {
          result[floor] = getMonstersByEldersLairFloor(floor, monsters);

          return result;
        }, {});
      },

      resultCount(): number {
        return this.sortedMonsters.length;
      },

      isEmpty() {
        return this.sortedMonsters.length <= 0;
      },

      isGrouped: (state) => {
        return ['genus', 'habitat', 'eldersLair'].includes(state.sortKey ?? '');
      },

      activeSort: (state) => {
        switch (state.sortKey) {
          case 'name':
            return {
              name: state.sortKey,
              order: state.sortOrder,
              caption: 'Name',
            };

          case 'rarity':
            return {
              name: state.sortKey,
              order: state.sortOrder,
              caption: 'Rarity',
            };

          case 'monstie.stats.base.maxHp':
            return {
              name: state.sortKey,
              order: state.sortOrder,
              caption: 'Max HP',
            };

          case 'monstie.stats.base.speed':
            return {
              name: state.sortKey,
              order: state.sortOrder,
              caption: 'Speed',
            };

          case 'monstie.stats.base.critRate':
            return {
              name: state.sortKey,
              order: state.sortOrder,
              caption: 'Crit Rate',
            };

          case 'monstie.stats.bestAttack.value':
            return {
              name: state.sortKey,
              order: state.sortOrder,
              caption: 'Best Attack',
            };

          case 'monstie.stats.bestDefense.value':
            return {
              name: state.sortKey,
              order: state.sortOrder,
              caption: 'Best Defense',
            };

          case 'monstie.stats.worstDefense.value':
            return {
              name: state.sortKey,
              order: state.sortOrder,
              caption: 'Worst Defense',
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

        if (state.genusFilter != null && state.sortKey !== 'genus') {
          result.push({ name: 'genusFilter', value: state.genusFilter });
        }

        if (state.habitatFilter != null && state.sortKey !== 'habitat') {
          result.push({ name: 'habitatFilter', value: state.habitatFilter });
        }

        if (state.coopQuestFilter != null) {
          result.push({ name: 'coopQuestFilter', value: state.coopQuestFilter });
        }

        if (state.catavanFilter != null) {
          result.push({ name: 'catavanFilter', value: state.catavanFilter });
        }

        if (state.eldersLairFilter != null && state.sortKey !== 'eldersLair') {
          result.push({
            name: 'eldersLairFilter',
            value: "Elder's Lair - " + state.eldersLairFilter,
          });
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
      resetFilter() {
        this.nameFilter = initial.nameFilter;
        this.genusFilter = initial.genusFilter;
        this.habitatFilter = initial.habitatFilter;
        this.coopQuestFilter = initial.coopQuestFilter;
        this.catavanFilter = initial.catavanFilter;
        this.eldersLairFilter = initial.eldersLairFilter;
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
    },
  });
}

export type FilterStore = ReturnType<ReturnType<typeof makeMonsterFilterStore>>;

export const filterStoreKey: InjectionKey<FilterStore> = Symbol();
