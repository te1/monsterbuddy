<script lang="ts" setup>
  import type { Source } from '~/stores/3/geneSources';
  import S3GeneSidebar from '~/components/s3/gene/S3GeneSidebar.vue';
  import { genes } from '~/services/3/genes';
  import useGeneFilter from '~/stores/3/geneFilter';
  import useGeneSources from '~/stores/3/geneSources';
  import useGeneHistoryStore from '~/stores/3/geneHistoryStore';

  definePageMeta({
    sidebarComponent: S3GeneSidebar,
  });

  useSeoMeta({
    title: `Gene List In ${gameTypeToFullLabel('mhst3')}`,
    description: 'Overview of all genes and on which monsties they can be found', // TODO seo
  });
  const headline = gameTypeToFullName('mhst3');

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: gameTypeToShortLabel('mhst3'), item: '/3' },
        { name: 'Genes' },
      ],
    }),
  ]);

  defineOgImage(
    'Title',
    {
      title: 'All Genes',
      description: headline,
      lines: ['Types', 'Effects', 'Sources'],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );

  const router = useRouter();
  const route = useRoute();
  const hasSidebar = useHasSidebar();

  const history = useGeneHistoryStore();
  const filter = useGeneFilter();
  const sources = useGeneSources();

  const oldSortKey = ref(filter.sortKey);
  const oldSortOrder = ref(filter.sortOrder);

  const showActiveFilters = computed(() => filter.hasActiveSort || filter.hasActiveFilters);

  const sourceItems = computed(() => {
    switch (sources.current) {
      case 'recent':
        return history.recentGenes;

      case 'pinned':
        return history.pinnedGenes;

      default:
        return genes;
    }
  });

  function syncSource() {
    filter.setGenes(sourceItems.value, {
      preserveSourceOrder: sources.current === 'recent' && filter.preserveSourceOrder,
    });
  }

  watch(
    () => sources.current,
    (newValue, oldValue) => {
      if (newValue === 'recent' && oldValue !== 'recent') {
        // switch to recent

        oldSortKey.value = filter.sortKey;
        oldSortOrder.value = filter.sortOrder;

        filter.sortKey = 'name';
        filter.sortOrder = 'asc';
        filter.preserveSourceOrder = true;
      } else if (oldValue === 'recent' && newValue !== 'recent' && filter.preserveSourceOrder) {
        // switch away from recent

        filter.sortKey = oldSortKey.value;
        filter.sortOrder = oldSortOrder.value;
        filter.preserveSourceOrder = false;
      }

      syncSource();
    },
    { immediate: true }
  );

  watch(sourceItems, syncSource);

  function toggleSource() {
    sources.setCurrent(sources.next);

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
        sources.setCurrent(newSource);

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
      return 'Recent Genes';
    }

    if (sources.current === 'pinned') {
      return 'Bookmarked Genes';
    }

    return 'Genes';
  });

  useMobileHeaderOverride().bind(title);

  const fabFilterTarget = computed(() => {
    if (showFilter.value) {
      return '/3/genes';
    }
    return '/3/genes?filter';
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
        return 'Show all genes';

      case 'recent':
        return 'Show recent genes ';

      case 'pinned':
        return 'Show bookmarked genes';

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

  const groups = computed(() => {
    let index = 0;

    return Object.entries(filter.groupedGenes).map(([key, group]) => ({
      key,
      genes: group.map((gene) => ({
        gene,
        eager: index++ < eagerCardsCount,
      })),
    }));
  });
</script>

<template>
  <div>
    <AppPageHeader
      title="Genes"
      description="All the genes and where to find them"
      :headline="headline"
      class="hidden lg:block"
    />

    <UPageBody :class="{ '-mt-3 lg:mt-0': filter.isGrouped || showActiveFilters }">
      <div
        v-if="showActiveFilters"
        class="sticky top-[calc(var(--ui-header-height)+var(--spacing))] z-20 mt-1 mb-2 lg:mb-3"
      >
        <div class="flex flex-wrap items-center justify-center gap-2">
          <AppFilterPill
            v-if="filter.hasActiveSort"
            :caption="filter.activeSort?.caption ?? ''"
            filterTarget="/3/genes?filter"
            :sortOrder="filter.activeSort?.order"
          />

          <AppFilterPill
            v-for="filterItem in filter.activeFilters"
            :key="filterItem.name"
            :caption="filterItem.value"
            filterTarget="/3/genes?filter"
            showRemove
            @remove="filter[filterItem.name] = undefined"
          />
        </div>
      </div>

      <ul class="flex flex-col gap-3">
        <li v-for="group in groups" :key="group.key">
          <div
            v-if="filter.isGrouped"
            class="sticky top-(--ui-header-height) z-10 -mx-1 flex items-center bg-elevated/90 p-1 backdrop-blur dark:bg-muted/90"
          >
            <!-- TODO group icons -->
            <!-- <UIcon v-if="filter.sortKey === 'genus'" name="ph:dna" class="w-6 text-muted" /> -->

            <div class="font-semibold" v-text="group.key" />
          </div>

          <div class="grid gap-3 md:grid-cols-2">
            <NuxtLink
              v-for="item in group.genes"
              :key="item.gene.slug"
              :to="`/3/genes/${item.gene.slug}`"
              prefetchOn="interaction"
            >
              <S3GeneListItem
                :gene="item.gene"
                :mode="filter.mode"
                :eager="item.eager"
                class="box box-link overflow-hidden px-1 [contain-intrinsic-size:122px] [content-visibility:auto]"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>

      <S3GeneNoResults v-if="filter.isEmpty">No genes found</S3GeneNoResults>
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
          <S3GeneViewOptions modalLayout />

          <S3GeneFilter :filter="filter" hideSearch modalLayout backTarget="/3/genes" />
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
