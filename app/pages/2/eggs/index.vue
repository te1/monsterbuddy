<script lang="ts" setup>
  import { filterStoreKey } from '~/stores/2/baseMonsterFilter';
  import S2EggSidebar from '~/components/s2/egg/S2EggSidebar.vue';
  import useHistoryStore from '~/stores/2/historyStore';
  import useEggFilter, { modes } from '~/stores/2/eggFilter';
  import useEggSources, { type Source } from '~/stores/2/eggSources';
  import { getGenera, monsties } from '~/services/2/data';
  import useEggsDisplay from '~/stores/2/eggDisplays';

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

  const router = useRouter();
  const route = useRoute();
  const hasSidebar = useHasSidebar();

  const history = useHistoryStore();
  const eggFilter = useEggFilter();
  provide(filterStoreKey, eggFilter);
  const sources = useEggSources();
  const displays = useEggsDisplay();

  const oldSortKey = ref(eggFilter.sortKey);
  const oldSortOrder = ref(eggFilter.sortOrder);

  const genera = computed(() => {
    return getGenera(monsties);
  });

  const showEggFinder = computed(() => {
    return displays.current === 'egg';
  });

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

  function toggleSource() {
    sources.setCurrent(sources.next, eggFilter);
    displays.setCurrent('monstie');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // update source from query string
  watch(
    () => route.query.source as Source,
    (newSource) => {
      if (typeof newSource !== 'string') {
        return;
      }

      if (sources.all.includes(newSource)) {
        sources.setCurrent(newSource, eggFilter);

        router.replace(route.path); // remove query parameters from URL
      }
    },
    { immediate: true }
  );

  const showFilter = computed({
    get: () => route.query.filter !== undefined,
    set: (value) => {
      if (value) {
        displays.setCurrent('monstie'); // exit egg finder when opening filter
      }

      if (value === (route.query.filter !== undefined)) {
        return;
      }

      if (value) {
        router.push({
          path: route.path,
          query: { ...route.query, filter: null },
        });
      } else {
        const { filter: _filter, ...query } = route.query;
        router.push({
          path: route.path,
          query,
        });
      }
    },
  });

  const title = computed(() => {
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

  useMobileHeaderOverride().bind(title);

  const fabFilterTarget = computed(() => {
    if (showFilter.value) {
      return '/2/eggs';
    }
    return '/2/eggs?filter';
  });

  const fabFilterTooltip = computed(() => {
    if (showFilter.value) {
      return 'Apply';
    }
    return 'View options';
  });

  const fabFilterIcon = computed(() => {
    if (showFilter.value) {
      return 'ph:check';
    }
    return 'ph:sliders';
  });

  const fabSourceVisible = computed(() => {
    return !showFilter.value && sources.all.length > 1;
  });

  const fabSourceTooltip = computed(() => {
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
        return undefined;
    }
  });

  const fabEggFinderVisible = computed(() => {
    return !showFilter.value;
  });

  const fabEggFinderTooltip = computed(() => {
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

  const eagerCardsCount = 20;

  const monsterGroups = computed(() => {
    let index = 0;

    return Object.entries(eggFilter.groupedMonsters).map(([key, group]) => ({
      key,
      monsters: group.map((monster) => ({
        monster,
        eager: index++ < eagerCardsCount,
      })),
    }));
  });

  function toggleEggFinder() {
    displays.setCurrent(displays.next);
    sources.setCurrent('default', eggFilter);

    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  <div>
    <AppPageHeader
      title="Eggs"
      description="Egg patterns and colors for all hatchable monsties"
      :headline="headline"
      class="hidden lg:block"
    />

    <UPageBody
      :class="{
        '-mt-3 lg:mt-0':
          ((eggFilter.isGrouped && !eggFilter.isEmpty) || showActiveFilters) && !showEggFinder,
      }"
    >
      <div
        v-if="showActiveFilters"
        class="sticky top-[calc(var(--ui-header-height)+var(--spacing))] z-20 mt-1 mb-2 lg:mb-3"
      >
        <div class="flex flex-wrap items-center justify-center gap-2">
          <AppFilterPill
            v-if="eggFilter.hasActiveSort"
            :caption="eggFilter.activeSort?.caption ?? ''"
            filterTarget="/2/eggs?filter"
            :sortOrder="eggFilter.activeSort?.order"
          />

          <AppFilterPill
            v-for="filter in eggFilter.activeFilters"
            :key="filter.name"
            :caption="filter.value"
            filterTarget="/2/eggs?filter"
            showRemove
            @remove="eggFilter[filter.name] = undefined"
          />
        </div>
      </div>

      <ul v-if="showEggFinder" class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <li v-for="genus in genera" :key="genus">
          <S2EggGridItem
            :genus="genus"
            class="box box-link cursor-pointer overflow-hidden px-1"
            @click="setGenusFilter(genus)"
          />
        </li>
      </ul>

      <ul v-if="!showEggFinder" class="flex flex-col gap-3">
        <li v-for="group in monsterGroups" :key="group.key">
          <div
            v-if="eggFilter.isGrouped"
            class="sticky top-(--ui-header-height) z-10 -mx-1 flex items-center bg-elevated/90 p-1 backdrop-blur dark:bg-muted/90"
          >
            <UIcon v-if="eggFilter.sortKey === 'genus'" name="ph:dna" class="w-6 text-muted" />

            <UIcon
              v-if="eggFilter.sortKey === 'habitat'"
              name="ph:map-pin-fill"
              class="w-6 text-dimmed"
            />

            <div class="font-medium" v-text="group.key" />
          </div>

          <div
            v-if="eggFilter.mode === 'compact'"
            class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          >
            <NuxtLink
              v-for="item in group.monsters"
              :key="item.monster.no"
              :to="`/2/monsters/${item.monster.slug}`"
              prefetchOn="interaction"
            >
              <S2EggGridItem
                :monster="item.monster"
                :eager="item.eager"
                class="box box-link overflow-hidden px-1 [contain-intrinsic-size:150px] [content-visibility:auto]"
              />
            </NuxtLink>
          </div>

          <div v-else class="grid gap-3 md:grid-cols-2">
            <NuxtLink
              v-for="item in group.monsters"
              :key="item.monster.no"
              :to="`/2/monsters/${item.monster.slug}`"
              prefetchOn="interaction"
            >
              <S2EggListItem
                :monster="item.monster"
                :mode="eggFilter.mode"
                :eager="item.eager"
                class="box box-link overflow-hidden px-1 [contain-intrinsic-size:122px] [content-visibility:auto]"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>

      <S2MonsterNoResults v-if="eggFilter.isEmpty && !showEggFinder">
        No eggs found
      </S2MonsterNoResults>
    </UPageBody>

    <ClientOnly>
      <UDrawer
        v-if="!hasSidebar"
        v-model:open="showFilter"
        title="View Options"
        description=" "
        :ui="{ body: 'flex flex-col gap-3' }"
      >
        <template #body>
          <S2MonsterViewOptions :filter="eggFilter" :modes="modes" modalLayout />

          <S2MonsterFilter
            :filter="eggFilter"
            hideSearch
            showEggColorFilter
            showHabitatFilter
            showCoopQuestFilter
            showCatavanFilter
            showAttackTypeFilter
            showAttackElementFilter
            showRidingActionFilter
            modalLayout
            backTarget="/2/eggs"
          />
        </template>
      </UDrawer>

      <AppFabPanel>
        <AppFab
          v-if="fabEggFinderVisible"
          :tooltip="fabEggFinderTooltip"
          :icon="fabEggFinderIcon"
          @click="toggleEggFinder"
        />

        <AppFab
          v-if="fabSourceVisible"
          :tooltip="fabSourceTooltip"
          :icon="fabSourceIcon"
          @click="toggleSource"
        />

        <NuxtLink v-if="!showFilter" :to="fabFilterTarget">
          <AppFab :tooltip="fabFilterTooltip" :icon="fabFilterIcon" />
        </NuxtLink>
      </AppFabPanel>
    </ClientOnly>
  </div>
</template>
