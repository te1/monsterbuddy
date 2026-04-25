<script lang="ts" setup>
  import type { Source } from '~/stores/3/monstieBuildSources';
  import S3MonstieBuildSidebar from '~/components/s3/monstieBuild/S3MonstieBuildSidebar.vue';
  import useMonstieBuildFilter from '~/stores/3/monstieBuildFilter';
  import useMonstieBuildHistoryStore from '~/stores/3/monstieBuildHistoryStore';
  import useMonstieBuildSources from '~/stores/3/monstieBuildSources';
  import useMonstieBuildStore from '~/stores/3/monstieBuildStore';

  definePageMeta({
    sidebarComponent: S3MonstieBuildSidebar,
    mobileHeaderTitle: 'Builds',
  });

  useSeoMeta({
    title: `Monstie Builds For ${gameTypeToFullLabel('mhst3')}`,
    description:
      'Use the Rite of Channeling to pick your genes, unlock bingo bonuses and build your perfect monstie',
  });
  const headline = gameTypeToFullName('mhst3');

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: gameTypeToShortLabel('mhst3'), item: '/3' },
        { name: 'Monstie Builds' },
      ],
    }),
  ]);

  defineOgImage(
    'Title',
    {
      title: 'Monstie Builds',
      description: headline,
      lines: ['Genes', 'Bingo Bonus', 'Egg Powers'],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );

  const router = useRouter();
  const route = useRoute();
  const hasSidebar = useHasSidebar();

  const history = useMonstieBuildHistoryStore();
  const filter = useMonstieBuildFilter();
  const sources = useMonstieBuildSources();
  const buildStore = useMonstieBuildStore();

  const oldSortKey = ref(filter.sortKey);
  const oldSortOrder = ref(filter.sortOrder);

  const showActiveFilters = computed(() => filter.hasActiveSort || filter.hasActiveFilters);

  const noBuilds = computed(() => !filter.isEmpty && filter.sortedBuilds.length <= 0);

  const sourceItems = computed(() => {
    switch (sources.current) {
      case 'recent':
        return history.recentBuilds;

      case 'pinned':
        return history.pinnedBuilds;

      default:
        return history.allBuilds;
    }
  });

  function syncSource() {
    filter.setBuilds(sourceItems.value, {
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
      return 'Recent Builds';
    }

    if (sources.current === 'pinned') {
      return 'Bookmarked Builds';
    }

    return 'Builds';
  });

  useMobileHeaderOverride().bind(title);

  const fabFilterTarget = computed(() => {
    if (showFilter.value) {
      return '/3/builds/monstie';
    }
    return '/3/builds/monstie?filter';
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
        return 'Show all builds';

      case 'recent':
        return 'Show recent builds ';

      case 'pinned':
        return 'Show bookmarked builds';

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
</script>

<template>
  <div>
    <AppPageHeader
      title="Monstie Builds"
      description="Use the Rite of Channeling to pick your genes, unlock bingo bonuses and build your perfect monstie"
      :headline="headline"
      class="hidden lg:block"
    />

    <UPageBody :class="{ '-mt-3 lg:mt-0': filter.isGrouped || showActiveFilters }">
      <section>
        <div
          v-if="showActiveFilters"
          class="sticky top-[calc(var(--ui-header-height)+var(--spacing))] z-20 mt-1 mb-2 lg:mb-3"
        >
          <div class="flex flex-wrap items-center justify-center gap-2">
            <AppFilterPill
              v-if="filter.hasActiveSort"
              :caption="filter.activeSort?.caption ?? ''"
              filterTarget="/3/builds/monstie?filter"
              :sortOrder="filter.activeSort?.order"
            />

            <AppFilterPill
              v-for="filterItem in filter.activeFilters"
              :key="filterItem.name"
              :caption="filterItem.value"
              filterTarget="/3/builds/monstie?filter"
              showRemove
              @remove="filter[filterItem.name] = undefined"
            />
          </div>
        </div>

        <ClientOnly>
          <ul class="flex flex-col gap-3">
            <li v-for="(group, key) in filter.groupedBuilds" :key="key">
              <div
                v-if="filter.isGrouped"
                class="sticky top-(--ui-header-height) z-10 -mx-1 flex items-center bg-elevated/90 p-1 backdrop-blur dark:bg-muted/90"
              >
                <UIcon v-if="filter.sortKey === 'monstie'" name="ph:dna" class="w-6 text-muted" />

                <UIcon v-else name="ph:hash" class="w-6 text-dimmed" />

                <div class="font-semibold" v-text="key" />
              </div>

              <div class="grid gap-3 md:grid-cols-2">
                <NuxtLink
                  v-for="build in group"
                  :key="build.id"
                  :to="`/3/builds/monstie/${build.id}`"
                  prefetchOn="interaction"
                >
                  <S3MonstieBuildListItem
                    :build="build"
                    class="box box-link overflow-hidden px-1 [contain-intrinsic-size:74px] [content-visibility:auto]"
                  />
                </NuxtLink>
              </div>
            </li>
          </ul>

          <S3MonstieBuildNoResults v-if="filter.isEmpty">No builds found</S3MonstieBuildNoResults>

          <S3MonstieBuildNoBuilds v-if="sources.loaded && noBuilds">
            You haven't created any builds yet
          </S3MonstieBuildNoBuilds>

          <div v-if="!sources.loaded && noBuilds" class="grid gap-3 md:grid-cols-2">
            <div v-for="i in 6" :key="i" class="box flex h-[74px] items-center gap-1 px-1">
              <USkeleton class="m-1.5 size-14 shrink-0 animate-none rounded-full" />

              <div class="flex flex-col gap-1">
                <USkeleton class="h-4 w-[25ch] animate-none" />
                <USkeleton class="h-4 w-[25ch] animate-none" />
              </div>
            </div>
          </div>

          <template #fallback>
            <div class="grid gap-3 md:grid-cols-2">
              <div v-for="i in 6" :key="i" class="box flex h-[74px] items-center gap-1 px-1">
                <USkeleton class="m-1.5 size-14 shrink-0 animate-none rounded-full" />

                <div class="flex flex-col gap-1">
                  <USkeleton class="h-4 w-[25ch] animate-none" />
                  <USkeleton class="h-4 w-[25ch] animate-none" />
                </div>
              </div>
            </div>
          </template>
        </ClientOnly>
      </section>

      <section class="mt-6">
        <ProseH3>Recommended Reading / Watching</ProseH3>

        <ProseUl>
          <ProseLi>
            <AppLink
              href="https://www.youtube.com/watch?v=txLzHs-ajEg"
              text="Advanced Monstie Guide"
            />
            on YouTube
          </ProseLi>

          <ProseLi>
            <AppLink
              href="https://lescarnetsdelawycademie.fr/building-the-perfect-monstie"
              text="Building the perfect Monstie"
            />
            by <AppLink href="https://www.reddit.com/user/Masuku68" text="Masuku68" />
          </ProseLi>

          <ProseLi>
            <AppLink href="https://lescarnetsdelawycademie.fr/wyvernfell" text="Wyvernfell" />
            by <AppLink href="https://www.reddit.com/user/Masuku68" text="Masuku68" />
          </ProseLi>

          <ProseLi>
            <AppLink
              href="https://www.reddit.com/r/MonsterHunterStories/comments/1sobnlk/guideresource_a_basic_stamina_guide_for_mhs3"
              text="Stamina Guide"
            />
            by <AppLink href="https://www.reddit.com/user/TheMobDylan" text="TheMobDylan" />
          </ProseLi>
        </ProseUl>
      </section>
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
          <S3MonstieBuildViewOptions modalLayout />

          <S3MonstieBuildFilter
            :filter="filter"
            hideSearch
            modalLayout
            backTarget="/3/builds/monstie"
          />
        </template>
      </LazyUDrawer>

      <AppFabPanel>
        <AppFab tooltip="New build" icon="ph:plus" @click="buildStore.newBuild" />

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
