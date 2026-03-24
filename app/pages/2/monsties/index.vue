<script lang="ts" setup>
  import type { Source } from '~/stores/2/monstieSources';
  import S2MonstieSidebar from '~/components/s2/monstie/S2MonstieSidebar.vue';
  import { monsties } from '~/services/2/data';
  import { filterStoreKey } from '~/stores/2/baseMonsterFilter';
  import useHistoryStore from '~/stores/2/historyStore';
  import useMonstieFilter, { modes } from '~/stores/2/monstieFilter';
  import useMonstieSources from '~/stores/2/monstieSources';

  definePageMeta({
    sidebarComponent: S2MonstieSidebar,
  });

  useSeoMeta({
    title: `Monstie List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      'Easily find all monsties in their natural habitats and check on retreat conditions, their attack types and stats',
  });
  const headline = gameTypeToFullName('mhst2');

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: gameTypeToShortLabel('mhst2'), url: '/2' },
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
      game: 'mhst2',
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

        monstieFilter.sortKey = 'no';
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
      return '/2/monsties';
    }
    return '/2/monsties?filter';
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
      description="Locations, retreat conditions, attack types and stats"
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
            filterTarget="/2/monsties?filter"
            :sortOrder="monstieFilter.activeSort?.order"
          />

          <AppFilterPill
            v-for="filter in monstieFilter.activeFilters"
            :key="filter.name"
            :caption="filter.value"
            filterTarget="/2/monsties?filter"
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

            <UIcon
              v-if="monstieFilter.sortKey === 'habitat'"
              name="ph:map-pin-fill"
              class="w-6 text-dimmed"
            />

            <div class="font-medium" v-text="group.key" />
          </div>

          <div class="grid gap-3 md:grid-cols-2">
            <NuxtLink
              v-for="item in group.monsters"
              :key="item.monster.no"
              :to="`/2/monsters/${item.monster.slug}`"
              prefetchOn="interaction"
            >
              <S2MonstieListItem
                :monster="item.monster"
                :mode="monstieFilter.mode"
                :eager="item.eager"
                class="box box-link overflow-hidden px-1 [contain-intrinsic-size:122px] [content-visibility:auto]"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>

      <S2MonsterNoResults v-if="monstieFilter.isEmpty">No monsties found</S2MonsterNoResults>
    </UPageBody>

    <!-- TODO increase spacing, remove some options, make apply stand out more -->
    <ClientOnly>
      <UDrawer
        v-if="!hasSidebar"
        v-model:open="showFilter"
        title="View Options"
        description=" "
        :ui="{ body: 'flex flex-col gap-3' }"
      >
        <template #body>
          <S2MonsterViewOptions
            :filter="monstieFilter"
            :modes="modes"
            showSortByStats
            modalLayout
          />

          <S2MonsterFilter
            :filter="monstieFilter"
            hideSearch
            showHabitatFilter
            showCoopQuestFilter
            showCatavanFilter
            showEldersLairFilter
            showAttackTypeFilter
            showAttackElementFilter
            showRidingActionFilter
            modalLayout
            backTarget="/2/monsties"
          />
        </template>
      </UDrawer>

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
