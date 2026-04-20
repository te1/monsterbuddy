import type { MonstieBuild } from '~/services/3/monstieBuilds';
import { groupBy, orderBy } from 'es-toolkit/array';
import { skipHydrate } from 'pinia';
import { monstersBySlug } from '~/services/3/data';

export type SortKey = 'name' | 'monstie' | 'monstieElement' | 'monstieAttackType';

const sortValueGetters = {
  name: (item: MonstieBuild) => item.nameWithFallback,
  monstie: (item: MonstieBuild) => {
    if (item.monstieSlug == null) {
      return null;
    }

    const monstie = monstersBySlug.get(item.monstieSlug);

    return monstie?.name ?? item.monstieSlug;
  },
  monstieElement: (item: MonstieBuild) => item.monstie?.element,
  monstieAttackType: (item: MonstieBuild) => item.monstie?.monstie?.attack,
} satisfies Record<SortKey, (item: MonstieBuild) => unknown>;

export type FilterKey = 'monstieElementFilter' | 'monstieAttackTypeFilter';

const initial = {
  sortKey: 'name',
  sortOrder: 'asc',
} as {
  sortKey: SortKey;
  sortOrder: SortOrder;
};

const useMonstieBuildFilter = defineStore('s3/monstieBuildFilter', () => {
  // -- state
  const builds = skipHydrate(shallowRef<MonstieBuild[]>([]));

  const sortKey = ref(initial.sortKey);
  const sortOrder = ref(initial.sortOrder);
  const preserveSourceOrder = ref(false);
  const nameFilter = ref<string | undefined>(undefined);
  const monstieElementFilter = ref<ElementType | undefined>(undefined);
  const monstieAttackTypeFilter = ref<AttackType | undefined>(undefined);

  // -- getters
  const filteredBuilds = computed(() => {
    let result = builds.value;

    if (nameFilter.value != null) {
      const query = nameFilter.value.toLowerCase();

      result = result.filter((build) => build.nameWithFallback.toLowerCase().includes(query));
    }

    if (monstieElementFilter.value != null) {
      result = result.filter((build) => build.monstie?.element === monstieElementFilter.value);
    }

    if (monstieAttackTypeFilter.value != null) {
      result = result.filter(
        (build) => build.monstie?.monstie?.attack === monstieAttackTypeFilter.value
      );
    }

    return result;
  });

  const sortedBuilds = computed<MonstieBuild[]>(() => {
    const filtered = filteredBuilds.value;

    if (sortKey.value == null || preserveSourceOrder.value) {
      return filtered;
    }

    const getSortValue = sortValueGetters[sortKey.value];

    return orderBy(
      filtered,
      [
        (item: MonstieBuild) => {
          const value = getSortValue(item);

          if (value == null) {
            return sortOrder.value === 'asc' ? Infinity : -Infinity;
          }

          return value;
        },
      ],
      [sortOrder.value]
    );
  });

  const groupedBuilds = computed<Record<string, MonstieBuild[]>>(() => {
    const sorted = sortedBuilds.value;

    switch (sortKey.value) {
      case 'monstie':
        return groupBy(sorted, (item) => item.monstie?.name ?? 'Unknown');

      case 'monstieElement':
        return groupBy(sorted, (item) => formatElement(item.monstie?.element));

      case 'monstieAttackType':
        return groupBy(sorted, (item) => formatAttackType(item.monstie?.monstie?.attack));

      default:
        return { all: sorted };
    }
  });

  const resultCount = computed(() => sortedBuilds.value.length);

  const isEmpty = computed(
    () => (hasActiveFilters.value || !!nameFilter.value) && sortedBuilds.value.length <= 0
  );

  const isGrouped = computed(() =>
    ['monstie', 'monstieElement', 'monstieAttackType'].includes(sortKey.value)
  );

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

      case 'monstie':
        return {
          name: sortKey.value,
          order: sortOrder.value,
          caption: 'Monstie',
        };

      case 'monstieElement':
        return {
          name: sortKey.value,
          order: sortOrder.value,
          caption: 'Element',
        };

      case 'monstieAttackType':
        return {
          name: sortKey.value,
          order: sortOrder.value,
          caption: 'Type',
        };

      default:
        return null;
    }
  });

  const hasActiveSort = computed(() => activeSort.value != null);

  const activeFilters = computed(() => {
    const result: { name: FilterKey; value: string }[] = [];

    if (monstieElementFilter.value != null) {
      result.push({
        name: 'monstieElementFilter',
        value: formatElement(monstieElementFilter.value),
      });
    }

    if (monstieAttackTypeFilter.value != null) {
      result.push({
        name: 'monstieAttackTypeFilter',
        value: formatAttackType(monstieAttackTypeFilter.value),
      });
    }

    return result;
  });

  const hasActiveFilters = computed(() => !!activeFilters.value.length);

  // -- actions
  function setBuilds(
    nextBuilds: MonstieBuild[],
    options: {
      preserveSourceOrder?: boolean;
    } = {}
  ) {
    builds.value = nextBuilds;
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
    monstieElementFilter.value = undefined;
    monstieAttackTypeFilter.value = undefined;
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
    monstieElementFilter,
    monstieAttackTypeFilter,

    // -- gettersfilteredGenes,
    filteredBuilds,
    sortedBuilds,
    groupedBuilds,
    resultCount,
    isEmpty,
    isGrouped,
    activeSort,
    hasActiveSort,
    activeFilters,
    hasActiveFilters,

    // -- actions
    setBuilds,
    setSort,
    setSortOrder,
    resetFilter,
    resetFilterAndSort,
  };
});

export default useMonstieBuildFilter;
