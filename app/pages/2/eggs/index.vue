<script lang="ts" setup>
  import { filterStoreKey } from '~/stores/2/baseMonsterFilter';
  import S2EggSidebar from '~/components/s2/egg/S2EggSidebar.vue';
  import useHistoryStore from '~/stores/2/historyStore';
  import useEggFilter from '~/stores/2/eggFilter';
  import useEggSources, { type Source } from '~/stores/2/eggSources';
  import { getGenera, monsties } from '~/services/2/data';

  definePageMeta({
    sidebarComponent: S2EggSidebar,
  });

  useSeoMeta({
    title: `Egg List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      'Visual guide with images for all egg patterns for every hatchable monstie with search, sorting and filtering',
  });
  // TODO drop ?source from canonical url
  const headline = gameTypeToFullName('mhst2');

  const history = useHistoryStore();
  const eggFilter = useEggFilter();
  provide(filterStoreKey, eggFilter);
  const sources = useEggSources();

  const oldSortKey = ref(eggFilter.sortKey);
  const oldSortOrder = ref(eggFilter.sortOrder);

  const genera = computed(() => {
    return getGenera(monsties);
  });

  const showEggFinder = ref(false);

  const showActiveFilters = computed(() => {
    return (eggFilter.hasActiveSort || eggFilter.hasActiveFilters) && !showEggFinder.value;
  });

  const sourceItems = computed(() => {
    switch (sources.current) {
      case 'recent':
        return history.recentMonsties;

      case 'pinned':
        return history.pinnedEggs;

      default:
        return monsties;
    }
  });

  function syncSource() {
    eggFilter.setMonsters(sourceItems.value, {
      preserveSourceOrder: sources.current === 'recent' && eggFilter.preserveSourceOrder,
    });
  }

  watch(
    () => sources.current,
    (newValue, oldValue) => {
      if (newValue === 'recent' && oldValue !== 'recent') {
        // switch to recent

        oldSortKey.value = eggFilter.sortKey;
        oldSortOrder.value = eggFilter.sortOrder;

        eggFilter.sortKey = 'no';
        eggFilter.sortOrder = 'asc';
        eggFilter.preserveSourceOrder = true;
      } else if (oldValue === 'recent' && newValue !== 'recent' && eggFilter.preserveSourceOrder) {
        // switch away from recent

        eggFilter.sortKey = oldSortKey.value;
        eggFilter.sortOrder = oldSortOrder.value;
        eggFilter.preserveSourceOrder = false;
      }

      syncSource();
    },
    { immediate: true }
  );

  watch(sourceItems, syncSource);

  const showFilter = ref(false); // TODO?

  const _heading = computed(() => {
    if (showFilter.value) {
      return 'View Options';
    }

    if (showEggFinder.value) {
      return 'Egg Finder';
    }

    if (sources.current === 'recent') {
      return 'Recent Eggs';
    }

    if (sources.current === 'pinned') {
      return 'Bookmarked Eggs';
    }

    return null;
  });

  function toggleSource() {
    sources.setCurrent(sources.next, eggFilter);
    showEggFinder.value = false;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const route = useRoute();
  watch(
    () => route.query.source as Source,
    (newSource) => {
      if (typeof newSource !== 'string') {
        return;
      }

      if (sources.all.includes(newSource)) {
        sources.setCurrent(newSource, eggFilter);

        useRouter().replace(route.path); // remove query parameters from URL
      }
    },
    { immediate: true }
  );

  const fabSourceVisible = computed(() => {
    return !showFilter.value && sources.all.length > 1;
  });

  const fabSourceTitle = computed(() => {
    switch (sources.next) {
      case 'default':
        return 'Show all eggs';

      case 'recent':
        return 'Show recent eggs ';

      case 'pinned':
        return 'Show bookmarked eggs';

      default:
        return undefined;
    }
  });

  const fabSourceIcon = computed(() => {
    switch (sources.next) {
      case 'default':
        return 'ph:x';

      case 'recent':
        return 'ph:clock-counter-clockwise';

      case 'pinned':
        return 'ph:bookmark-simple';

      default:
        return null;
    }
  });

  const fabEggFinderVisible = computed(() => {
    return !showFilter.value;
  });

  const fabEggFinderTitle = computed(() => {
    if (showEggFinder.value) {
      return 'Show all eggs';
    }

    return 'Show egg finder';
  });

  const fabEggFinderIcon = computed(() => {
    if (showEggFinder.value) {
      return 'ph:x';
    }

    return 'ph:egg';
  });

  function toggleEggFinder() {
    showEggFinder.value = !showEggFinder.value;
    sources.setCurrent('default', eggFilter);

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function setGenusFilter(genus: GenusType) {
    toggleEggFinder();
    eggFilter.genusFilter = genus;
  }

  onMounted(() => {
    history.lastList = 'eggs';
  });
</script>

<template>
  <!-- TODO CSS -->

  <div>
    <UPageHeader
      title="Eggs"
      description="Visual guide with images for all egg patterns for every hatchable monstie"
      :headline="headline"
    />

    <UPageBody>
      <!-- TODO filter modal -->

      <ClientOnly>
        <UTooltip v-if="fabSourceVisible" :text="fabSourceTitle">
          <UButton
            color="neutral"
            variant="soft"
            :icon="fabSourceIcon"
            class="absolute top-[275px] z-10"
            @click="toggleSource"
          />
        </UTooltip>

        <UTooltip v-if="fabEggFinderVisible" :text="fabEggFinderTitle">
          <UButton
            color="neutral"
            variant="soft"
            :icon="fabEggFinderIcon"
            class="absolute top-[275px] left-[60px] z-10"
            @click="toggleEggFinder"
          />
        </UTooltip>
      </ClientOnly>

      <div v-if="showActiveFilters" class="fixed inset-x-0 top-12 z-20 mt-1 w-full">
        <div class="container flex flex-wrap items-center justify-center gap-2 px-4">
          <AppFilterPill
            v-if="eggFilter.hasActiveSort"
            :caption="eggFilter.activeSort?.caption ?? ''"
            filterTarget="/eggs/filter"
            :sortOrder="eggFilter.activeSort?.order"
          />

          <AppFilterPill
            v-for="filter in eggFilter.activeFilters"
            :key="filter.name"
            :caption="filter.value"
            filterTarget="/eggs/filter"
            showRemove
            @remove="eggFilter[filter.name] = undefined"
          />
        </div>
      </div>

      <ul v-if="showEggFinder" class="mt-1 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <li v-for="genus in genera" :key="genus">
          <S2EggGridItem
            :genus="genus"
            class="box box-link cursor-pointer overflow-hidden px-1"
            @click="setGenusFilter(genus)"
          />
        </li>
      </ul>

      <ul v-if="!showEggFinder" class="space-y-5" :class="{ 'mt-8': showActiveFilters }">
        <li v-for="(group, key) in eggFilter.groupedMonsters" :key="key">
          <div
            v-if="eggFilter.isGrouped"
            class="sticky top-12 z-10 -mx-1 -mt-3 -mb-1 flex items-center border-t border-neutral-300 bg-neutral-300 px-1 py-1 dark:border-neutral-700 dark:bg-neutral-700"
          >
            <UIcon
              v-if="eggFilter.sortKey === 'genus'"
              name="ph:dna"
              class="w-6! text-neutral-500 dark:text-neutral-400"
            />

            <UIcon
              v-if="eggFilter.sortKey === 'habitat'"
              name="ph:map-pin-fill"
              class="w-6! text-neutral-500 dark:text-neutral-400"
            />

            <div class="font-semibold" v-text="key" />
          </div>

          <div
            v-if="eggFilter.mode === 'compact'"
            class="mt-1 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          >
            <NuxtLink
              v-for="monster in group"
              :key="monster.no"
              :to="`/2/monsters/${monster.slug}`"
            >
              <S2EggGridItem :monster="monster" class="box box-link overflow-hidden px-1" />
            </NuxtLink>
          </div>

          <div v-else class="mt-1 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <NuxtLink
              v-for="monster in group"
              :key="monster.no"
              :to="`/2/monsters/${monster.slug}`"
            >
              <S2EggListItem
                :monster="monster"
                :mode="eggFilter.mode"
                class="box box-link overflow-hidden px-1"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>

      <S2MonsterNoResults v-if="eggFilter.isEmpty && !showEggFinder">
        No eggs found
      </S2MonsterNoResults>
    </UPageBody>
  </div>
</template>
