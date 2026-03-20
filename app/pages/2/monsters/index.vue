<script lang="ts" setup>
  import S2MonsterSidebar from '~/components/s2/monster/S2MonsterSidebar.vue';
  import { monsters } from '~/services/2/data';
  import { filterStoreKey } from '~/stores/2/baseMonsterFilter';
  import useHistoryStore from '~/stores/2/historyStore';
  import useMonsterFilter, { modes } from '~/stores/2/monsterFilter';
  import useMonsterSources, { type Source } from '~/stores/2/monsterSources';

  definePageMeta({
    sidebarComponent: S2MonsterSidebar,
  });

  useSeoMeta({
    title: `Monster List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      'Quickly check for monster attack patterns, elemental weaknesses and weapon effectiveness on body parts',
  });
  // TODO drop ?source and ?filter from canonical url
  const headline = gameTypeToFullName('mhst2');

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: gameTypeToShortLabel('mhst2'), url: '/2' },
        { name: 'Monsters' },
      ],
    }),
  ]);

  const router = useRouter();
  const route = useRoute();
  const hasSidebar = useHasSidebar();

  const history = useHistoryStore();
  const monsterFilter = useMonsterFilter();
  provide(filterStoreKey, monsterFilter);
  const sources = useMonsterSources();

  const oldSortKey = ref(monsterFilter.sortKey);
  const oldSortOrder = ref(monsterFilter.sortOrder);

  const showActiveFilters = computed(() => {
    return monsterFilter.hasActiveSort || monsterFilter.hasActiveFilters;
  });

  const sourceItems = computed(() => {
    switch (sources.current) {
      case 'recent':
        return history.recentMonsters;

      case 'pinned':
        return history.pinnedMonsters;

      default:
        return monsters;
    }
  });

  function syncSource() {
    monsterFilter.setMonsters(sourceItems.value, {
      preserveSourceOrder: sources.current === 'recent' && monsterFilter.preserveSourceOrder,
    });
  }

  watch(
    () => sources.current,
    (newValue, oldValue) => {
      if (newValue === 'recent' && oldValue !== 'recent') {
        // switch to recent

        oldSortKey.value = monsterFilter.sortKey;
        oldSortOrder.value = monsterFilter.sortOrder;

        monsterFilter.sortKey = 'no';
        monsterFilter.sortOrder = 'asc';
        monsterFilter.preserveSourceOrder = true;
      } else if (
        oldValue === 'recent' &&
        newValue !== 'recent' &&
        monsterFilter.preserveSourceOrder
      ) {
        // switch away from recent

        monsterFilter.sortKey = oldSortKey.value;
        monsterFilter.sortOrder = oldSortOrder.value;
        monsterFilter.preserveSourceOrder = false;
      }

      syncSource();
    },
    { immediate: true }
  );

  watch(sourceItems, syncSource);

  function toggleSource() {
    sources.setCurrent(sources.next, monsterFilter);

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
        sources.setCurrent(newSource, monsterFilter);

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
      return 'Recent Monsters';
    }

    if (sources.current === 'pinned') {
      return 'Bookmarked Monsters';
    }

    return null;
  });

  useMobileHeaderOverride().bind(title);

  const fabFilterTarget = computed(() => {
    if (showFilter.value) {
      return '/2/monsters';
    }
    return '/2/monsters?filter';
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
        return 'Show all monsters';

      case 'recent':
        return 'Show recent monsters ';

      case 'pinned':
        return 'Show bookmarked monsters';

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

    return Object.entries(monsterFilter.groupedMonsters).map(([key, group]) => ({
      key,
      monsters: group.map((monster) => ({
        monster,
        eager: index++ < eagerCardsCount,
      })),
    }));
  });

  onMounted(() => {
    history.lastList = 'monsters';
  });
</script>

<template>
  <div>
    <AppPageHeader
      title="Monsters"
      description="Locations, attack patterns, elemental weaknesses and weapon effectiveness on body parts"
      :headline="headline"
      class="hidden lg:block"
    />

    <UPageBody :class="{ '-mt-3 lg:mt-0': monsterFilter.isGrouped || showActiveFilters }">
      <div
        v-if="showActiveFilters"
        class="sticky top-[calc(var(--ui-header-height)+var(--spacing))] z-20 mt-1 mb-2 lg:mb-3"
      >
        <div class="flex flex-wrap items-center justify-center gap-2">
          <AppFilterPill
            v-if="monsterFilter.hasActiveSort"
            :caption="monsterFilter.activeSort?.caption ?? ''"
            filterTarget="/2/monsters?filter"
            :sortOrder="monsterFilter.activeSort?.order"
          />

          <AppFilterPill
            v-for="filter in monsterFilter.activeFilters"
            :key="filter.name"
            :caption="filter.value"
            filterTarget="/2/monsters?filter"
            showRemove
            @remove="monsterFilter[filter.name] = undefined"
          />
        </div>
      </div>

      <ul class="flex flex-col gap-3">
        <li v-for="group in monsterGroups" :key="group.key">
          <div
            v-if="monsterFilter.isGrouped"
            class="sticky top-(--ui-header-height) z-10 -mx-1 flex items-center bg-elevated/90 p-1 backdrop-blur dark:bg-muted/90"
          >
            <UIcon v-if="monsterFilter.sortKey === 'genus'" name="ph:dna" class="w-6 text-muted" />

            <UIcon
              v-if="monsterFilter.sortKey === 'habitat'"
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
              <S2MonsterListItem
                :monster="item.monster"
                :mode="monsterFilter.mode"
                :eager="item.eager"
                class="box box-link overflow-hidden px-1 [contain-intrinsic-size:122px] [content-visibility:auto]"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>

      <S2MonsterNoResults v-if="monsterFilter.isEmpty">No monsters found</S2MonsterNoResults>
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
          <S2MonsterViewOptions :filter="monsterFilter" :modes="modes" modalLayout />

          <S2MonsterFilter
            :filter="monsterFilter"
            hideSearch
            showHabitatFilter
            showCatavanFilter
            showEldersLairFilter
            showHatchableFilter
            modalLayout
            backTarget="/2/monsters"
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
