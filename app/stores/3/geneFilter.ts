import type {
  Gene,
  GeneElement,
  GeneSize,
  GeneType,
  SkillAilmentType,
  SkillBuffType,
  SkillDebuffType,
  SkillEffectType,
  SkillTarget,
} from '~/services/3/types';
import { skipHydrate } from 'pinia';
import { groupBy, orderBy } from 'es-toolkit/array';
import {
  genes as genes_,
  getGenesByActive,
  getGenesByAilment,
  getGenesByBreath,
  getGenesByBuff,
  getGenesByDebuff,
  getGenesByEffect,
  getGenesByEggSkill,
  getGenesByElement,
  getGenesByName,
  getGenesBySize,
  getGenesByTarget,
  getGenesByType,
  getGeneSizeAsNumber,
} from '~/services/3/genes';
import {
  formatGeneElement,
  formatGeneType,
  formatSkillAilment,
  formatSkillBuff,
  formatSkillDebuff,
  formatSkillEffect,
} from '~/services/3/presentation';

export type SortKey = 'name' | 'size' | 'stamina' | 'power' | 'wyvernfell';

const sortValueGetters = {
  name: (item: Gene) => {
    if (item.baseName) {
      return `${item.baseName} ${getGeneSizeAsNumber(item.size)}`;
    }
    return item.name;
  },
  size: (item: Gene) => getGeneSizeAsNumber(item.size),
  stamina: (item: Gene) => item.stamina,
  power: (item: Gene) => item.power,
  wyvernfell: (item: Gene) => item.wyvernfell,
} satisfies Record<SortKey, (item: Gene) => unknown>;

// TODO modes
export type Mode = 'combat' | 'compact' | 'location' | 'rank' | 'ridingActions' | 'stats';

export type Modes = { value: Mode; label: string }[];

export const modes: Modes = [
  { value: 'location', label: 'Location' },
  { value: 'combat', label: 'Attack Pattern' },
  { value: 'rank', label: 'Rank' },
];

export type FilterKey =
  | 'sizeFilter'
  | 'typeFilter'
  | 'elementFilter'
  | 'activeFilter'
  | 'targetFilter'
  | 'breathFilter'
  | 'eggSkillFilter'
  | 'ailmentFilter'
  | 'buffFilter'
  | 'debuffFilter'
  | 'effectFilter';

const initial = {
  sortKey: 'name',
  sortOrder: 'asc',
  mode: 'location',
  autoSwitchModes: ['location', 'combat', 'rank'],
} as {
  sortKey: SortKey;
  sortOrder: SortOrder;
  mode: Mode;
  autoSwitchModes: Mode[];
};

const useGeneFilter = defineStore('s3/geneFilter', () => {
  // -- state
  const genes = skipHydrate(shallowRef(genes_));

  const sortKey = ref(initial.sortKey);
  const sortOrder = ref(initial.sortOrder);
  const preserveSourceOrder = ref(false);
  const nameFilter = ref<string | undefined>(undefined);
  const sizeFilter = ref<GeneSize | null | undefined>(undefined);
  const typeFilter = ref<GeneType | undefined>(undefined);
  const elementFilter = ref<GeneElement | undefined>(undefined);
  const activeFilter = ref<boolean | undefined>(undefined);
  const targetFilter = ref<SkillTarget | undefined>(undefined);
  const breathFilter = ref<boolean | undefined>(undefined);
  const eggSkillFilter = ref<boolean | undefined>(undefined);
  const ailmentFilter = ref<SkillAilmentType | undefined>(undefined);
  const buffFilter = ref<SkillBuffType | undefined>(undefined);
  const debuffFilter = ref<SkillDebuffType | undefined>(undefined);
  const effectFilter = ref<SkillEffectType | undefined>(undefined);

  const mode = ref(initial.mode);
  const autoSwitchModes = ref(initial.autoSwitchModes);

  // -- getters
  const filteredGenes = computed(() => {
    let result = genes.value;

    if (nameFilter.value != null) {
      result = getGenesByName(nameFilter.value, result);
    }

    if (sizeFilter.value !== undefined) {
      result = getGenesBySize(sizeFilter.value, result);
    }

    if (typeFilter.value !== undefined) {
      result = getGenesByType(typeFilter.value, result);
    }

    if (elementFilter.value != null) {
      result = getGenesByElement(elementFilter.value, result);
    }

    if (activeFilter.value != null) {
      result = getGenesByActive(activeFilter.value, result);
    }

    if (targetFilter.value != null) {
      result = getGenesByTarget(targetFilter.value, result);
    }

    if (breathFilter.value != null) {
      result = getGenesByBreath(breathFilter.value, result);
    }

    if (eggSkillFilter.value != null) {
      result = getGenesByEggSkill(eggSkillFilter.value, result);
    }

    if (ailmentFilter.value != null) {
      result = getGenesByAilment(ailmentFilter.value, result);
    }

    if (buffFilter.value != null) {
      result = getGenesByBuff(buffFilter.value, result);
    }

    if (debuffFilter.value != null) {
      result = getGenesByDebuff(debuffFilter.value, result);
    }

    if (effectFilter.value != null) {
      result = getGenesByEffect(effectFilter.value, result);
    }

    return result;
  });

  const sortedGenes = computed<Gene[]>(() => {
    const filtered = filteredGenes.value;

    if (sortKey.value == null || preserveSourceOrder.value) {
      return filtered;
    }

    const getSortValue = sortValueGetters[sortKey.value];

    return orderBy(
      filtered,
      [
        (item: Gene) => {
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

  const groupedGenes = computed<Record<string, Gene[]>>(() => {
    const sorted = sortedGenes.value;

    // TODO grouping

    switch (sortKey.value) {
      case 'size':
        return groupBy(sorted, (item) => item.size);

      default:
        return { all: sorted };
    }
  });

  const resultCount = computed(() => sortedGenes.value.length);

  const isEmpty = computed(() => sortedGenes.value.length <= 0);

  const isGrouped = computed(() => ['size'].includes(sortKey.value));

  const activeSort = computed(() => {
    if (preserveSourceOrder.value) {
      return null;
    }

    // TODO pills

    switch (sortKey.value) {
      case 'name':
        return {
          name: sortKey.value,
          order: sortOrder.value,
          caption: 'Name',
        };

      case 'size':
        return {
          name: sortKey.value,
          order: sortOrder.value,
          caption: 'Size',
        };

      case 'stamina':
        return {
          name: sortKey.value,
          order: sortOrder.value,
          caption: 'Stamina',
        };

      case 'power':
        return {
          name: sortKey.value,
          order: sortOrder.value,
          caption: 'Power',
        };

      case 'wyvernfell':
        return {
          name: sortKey.value,
          order: sortOrder.value,
          caption: 'Wyvernfell',
        };

      default:
        return null;
    }
  });

  const hasActiveSort = computed(() => activeSort.value != null);

  const activeFilters = computed(() => {
    const result: { name: FilterKey; value: string }[] = [];

    // TODO pills

    if (sizeFilter.value != null) {
      result.push({ name: 'sizeFilter', value: sizeFilter.value });
    }

    if (typeFilter.value != null) {
      result.push({
        name: 'typeFilter',
        value: formatGeneType(typeFilter.value),
      });
    }

    if (elementFilter.value != null) {
      result.push({
        name: 'elementFilter',
        value: formatGeneElement(elementFilter.value),
      });
    }

    if (activeFilter.value != null) {
      result.push({
        name: 'activeFilter',
        value: activeFilter.value ? 'Active' : 'Inactive',
      });
    }

    if (targetFilter.value != null) {
      result.push({
        name: 'targetFilter',
        value: targetFilter.value,
      });
    }

    if (breathFilter.value != null) {
      result.push({
        name: 'breathFilter',
        value: breathFilter.value ? 'Breath' : 'No Breath',
      });
    }

    if (eggSkillFilter.value != null) {
      result.push({
        name: 'eggSkillFilter',
        value: eggSkillFilter.value ? 'Egg Skill' : 'No Egg Skill',
      });
    }

    if (ailmentFilter.value != null) {
      result.push({
        name: 'ailmentFilter',
        value: formatSkillAilment(ailmentFilter.value),
      });
    }

    if (buffFilter.value != null) {
      result.push({
        name: 'buffFilter',
        value: formatSkillBuff(buffFilter.value),
      });
    }

    if (debuffFilter.value != null) {
      result.push({
        name: 'debuffFilter',
        value: formatSkillDebuff(debuffFilter.value),
      });
    }

    if (effectFilter.value != null) {
      result.push({
        name: 'effectFilter',
        value: formatSkillEffect(effectFilter.value),
      });
    }

    return result;
  });

  const hasActiveFilters = computed(() => !!activeFilters.value.length);

  // -- actions
  function setGenes(
    nextGenes: Gene[],
    options: {
      preserveSourceOrder?: boolean;
    } = {}
  ) {
    genes.value = nextGenes;
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
    nameFilter.value = undefined;
    sizeFilter.value = undefined;
    typeFilter.value = undefined;
    elementFilter.value = undefined;
    activeFilter.value = undefined;
    targetFilter.value = undefined;
    breathFilter.value = undefined;
    eggSkillFilter.value = undefined;
    ailmentFilter.value = undefined;
    buffFilter.value = undefined;
    debuffFilter.value = undefined;
    effectFilter.value = undefined;
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
    sizeFilter,
    typeFilter,
    elementFilter,
    activeFilter,
    targetFilter,
    breathFilter,
    eggSkillFilter,
    ailmentFilter,
    buffFilter,
    debuffFilter,
    effectFilter,
    mode,

    // -- getters
    autoSwitchModes,
    filteredGenes,
    sortedGenes,
    groupedGenes,
    resultCount,
    isEmpty,
    isGrouped,
    activeSort,
    hasActiveSort,
    activeFilters,
    hasActiveFilters,

    // -- actions
    setGenes,
    setSort,
    setSortOrder,
    resetFilter,
    resetFilterAndSort,
  };
});

export default useGeneFilter;
