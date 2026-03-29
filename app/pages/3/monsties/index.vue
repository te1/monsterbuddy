<script lang="ts" setup>
  import type { Source } from '~/stores/3/monstieSources';
  import S3MonstieSidebar from '~/components/s3/monstie/S3MonstieSidebar.vue';
  import { monsties } from '~/services/3/data';
  import { filterStoreKey } from '~/stores/3/baseMonsterFilter';
  import useHistoryStore from '~/stores/3/historyStore';
  import useMonstieFilter, { modes } from '~/stores/3/monstieFilter';
  import useMonstieSources from '~/stores/3/monstieSources';

  definePageMeta({
    sidebarComponent: S3MonstieSidebar,
  });

  useSeoMeta({
    title: `Monstie List For ${gameTypeToFullLabel('mhst3')}`,
    description:
      'Easily find all monsties in their natural habitats and check on their attack types and stats',
  });
  const headline = gameTypeToFullName('mhst3');

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: gameTypeToShortLabel('mhst3'), url: '/3' },
        { name: 'Monsties' },
      ],
    }),
  ]);

  defineOgImage(
    'Title',
    {
      title: 'All Monsties',
      description: headline,
      lines: ['Locations', 'Attack Types', 'Stats'],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );

  const router = useRouter();
  const route = useRoute();
  const hasSidebar = useHasSidebar();

  const history = useHistoryStore();
  const monstieFilter = useMonstieFilter();
  provide(filterStoreKey, monstieFilter);
  const sources = useMonstieSources();

  const oldSortKey = ref(monstieFilter.sortKey);
  const oldSortOrder = ref(monstieFilter.sortOrder);

  const showActiveFilters = computed(() => {
    return monstieFilter.hasActiveSort || monstieFilter.hasActiveFilters;
  });

  const sourceItems = computed(() => {
    switch (sources.current) {
      case 'recent':
        return history.recentMonsties;

      case 'pinned':
        return history.pinnedMonsties;

      default:
        return monsties;
    }
  });

  function syncSource() {
    monstieFilter.setMonsters(sourceItems.value, {
      preserveSourceOrder: sources.current === 'recent' && monstieFilter.preserveSourceOrder,
    });
  }

  watch(
    () => sources.current,
    (newValue, oldValue) => {
      if (newValue === 'recent' && oldValue !== 'recent') {
        // switch to recent

        oldSortKey.value = monstieFilter.sortKey;
        oldSortOrder.value = monstieFilter.sortOrder;

        monstieFilter.sortKey = 'name';
        monstieFilter.sortOrder = 'asc';
        monstieFilter.preserveSourceOrder = true;
      } else if (
        oldValue === 'recent' &&
        newValue !== 'recent' &&
        monstieFilter.preserveSourceOrder
      ) {
        // switch away from recent

        monstieFilter.sortKey = oldSortKey.value;
        monstieFilter.sortOrder = oldSortOrder.value;
        monstieFilter.preserveSourceOrder = false;
      }

      syncSource();
    },
    { immediate: true }
  );

  watch(sourceItems, syncSource);

  function toggleSource() {
    sources.setCurrent(sources.next, monstieFilter);

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
        sources.setCurrent(newSource, monstieFilter);

        router.replace(route.path); // remove query parameters from URL
      }
    },
    { immediate: true }
  );

  const showFilter = computed({
    get: () => route.query.filter !== undefined,
    set: (value) => {
      if (value === (route.query.filter !== undefined)) {
        return; // value is unchanged -> do nothing
      }

      if (value) {
        // value is now true -> add ?filter to URL
        router.push({
          path: route.path,
          query: { ...route.query, filter: null },
        });
      } else {
        // value is now false -> remove ?filter from URL
        const { filter: _filter, ...query } = route.query;
        router.push({
          path: route.path,
          query,
        });
      }
    },
  });

  const title = computed(() => {
    if (sources.current === 'recent') {
      return 'Recent Monsties';
    }

    if (sources.current === 'pinned') {
      return 'Bookmarked Monsties';
    }

    return null;
  });

  useMobileHeaderOverride().bind(title);

  const fabFilterTarget = computed(() => {
    if (showFilter.value) {
      return '/3/monsties';
    }
    return '/3/monsties?filter';
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
        return 'Show all monsties';

      case 'recent':
        return 'Show recent monsties ';

      case 'pinned':
        return 'Show bookmarked monsties';

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

  const eagerCardsCount = 14;

  const monsterGroups = computed(() => {
    let index = 0;

    return Object.entries(monstieFilter.groupedMonsters).map(([key, group]) => ({
      key,
      monsters: group.map((monster) => ({
        monster,
        eager: index++ < eagerCardsCount,
      })),
    }));
  });

  onMounted(() => {
    history.lastList = 'monsties';
  });
</script>

<template>
  <div>
    <AppPageHeader
      title="Monsties"
      description="Locations, attack types and stats"
      :headline="headline"
      class="hidden lg:block"
    />

    <UPageBody :class="{ '-mt-3 lg:mt-0': monstieFilter.isGrouped || showActiveFilters }">
      <div
        v-if="showActiveFilters"
        class="sticky top-[calc(var(--ui-header-height)+var(--spacing))] z-20 mt-1 mb-2 lg:mb-3"
      >
        <div class="flex flex-wrap items-center justify-center gap-2">
          <AppFilterPill
            v-if="monstieFilter.hasActiveSort"
            :caption="monstieFilter.activeSort?.caption ?? ''"
            filterTarget="/3/monsties?filter"
            :sortOrder="monstieFilter.activeSort?.order"
          />

          <AppFilterPill
            v-for="filter in monstieFilter.activeFilters"
            :key="filter.name"
            :caption="filter.value"
            filterTarget="/3/monsties?filter"
            showRemove
            @remove="monstieFilter[filter.name] = undefined"
          />
        </div>
      </div>

      <ul class="flex flex-col gap-3">
        <li v-for="group in monsterGroups" :key="group.key">
          <div
            v-if="monstieFilter.isGrouped"
            class="sticky top-(--ui-header-height) z-10 -mx-1 flex items-center bg-elevated/90 p-1 backdrop-blur dark:bg-muted/90"
          >
            <UIcon v-if="monstieFilter.sortKey === 'genus'" name="ph:dna" class="w-6 text-muted" />

            <div class="font-semibold" v-text="group.key" />
          </div>

          <div class="grid gap-3 md:grid-cols-2">
            <NuxtLink
              v-for="item in group.monsters"
              :key="item.monster.slug"
              :to="`/3/monsters/${item.monster.slug}`"
              prefetchOn="interaction"
            >
              <S3MonstieListItem
                :monster="item.monster"
                :mode="monstieFilter.mode"
                :eager="item.eager"
                class="box box-link overflow-hidden px-1 [contain-intrinsic-size:122px] [content-visibility:auto]"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>

      <S3MonsterNoResults v-if="monstieFilter.isEmpty">No monsties found</S3MonsterNoResults>
    </UPageBody>

    <!-- TODO increase spacing, remove some options, make apply stand out more -->
    <ClientOnly>
      <LazyUDrawer
        v-if="!hasSidebar"
        v-model:open="showFilter"
        title="View Options"
        description=" "
        :ui="{ body: 'flex flex-col gap-3' }"
        hydrateOnIdle
      >
        <template #body>
          <S3MonsterViewOptions
            :filter="monstieFilter"
            :modes="modes"
            showSortByStats
            modalLayout
          />

          <S3MonsterFilter
            :filter="monstieFilter"
            hideSearch
            showAttackTypeFilter
            showAttackElementFilter
            showRidingActionFilter
            showEndangeredFilter
            showMutationFilter
            showDeviantFilter
            modalLayout
            backTarget="/3/monsties"
          />
        </template>
      </LazyUDrawer>

      <AppFabPanel>
        <AppFab
          v-if="fabSourceVisible"
          :tooltip="fabSourceTooltip"
          :icon="fabSourceIcon"
          @click="toggleSource"
        />

        <NuxtLink v-if="!showFilter" :to="fabFilterTarget" :aria-label="fabFilterTooltip">
          <AppFab :tooltip="fabFilterTooltip" :icon="fabFilterIcon" />
        </NuxtLink>
      </AppFabPanel>
    </ClientOnly>
  </div>
</template>
