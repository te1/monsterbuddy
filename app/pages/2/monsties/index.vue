<script lang="ts" setup>
  import S2MonstieSidebar from '~/components/s2/monstie/S2MonstieSidebar.vue';
  import { monsties } from '~/services/2/data';
  import { filterStoreKey } from '~/stores/2/baseMonsterFilter';
  import useHistoryStore from '~/stores/2/historyStore';
  import useMonstieFilter from '~/stores/2/monstieFilter';
  import useMonstieSources, { type Source } from '~/stores/2/monstieSources';

  definePageMeta({
    sidebarComponent: S2MonstieSidebar,
  });

  useSeoMeta({
    title: `Monstie List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      'Easily find all monsties in their natural habitats and check on retreat conditions, their attack types and stats',
  });
  // TODO drop ?source from canonical url
  const headline = gameTypeToFullName('mhst2');

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

  const showFilter = ref(false); // TODO?

  const _heading = computed(() => {
    if (showFilter.value) {
      return 'View Options';
    }

    if (sources.current === 'recent') {
      return 'Recent Monsties';
    }

    if (sources.current === 'pinned') {
      return 'Bookmarked Monsties';
    }

    return null;
  });

  function toggleSource() {
    sources.setCurrent(sources.next, monstieFilter);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // update source from query string
  const route = useRoute();
  watch(
    () => route.query.source as Source,
    (newSource) => {
      if (typeof newSource !== 'string') {
        return;
      }

      if (sources.all.includes(newSource)) {
        sources.setCurrent(newSource, monstieFilter);

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
        return null;
    }
  });

  onMounted(() => {
    history.lastList = 'monsties';
  });
</script>

<template>
  <!-- TODO CSS -->

  <div>
    <UPageHeader
      title="Monsties"
      description="Easily find all monsties in their natural habitats and check on retreat conditions, their attack types and stats"
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
            class="absolute z-10"
            @click="toggleSource"
          />
        </UTooltip>
      </ClientOnly>

      <div v-if="showActiveFilters" class="fixed inset-x-0 top-12 z-20 mt-1 w-full">
        <div class="container flex flex-wrap items-center justify-center gap-2 px-4">
          <AppFilterPill
            v-if="monstieFilter.hasActiveSort"
            :caption="monstieFilter.activeSort?.caption ?? ''"
            filterTarget="/monsties/filter"
            :sortOrder="monstieFilter.activeSort?.order"
          />

          <AppFilterPill
            v-for="filter in monstieFilter.activeFilters"
            :key="filter.name"
            :caption="filter.value"
            filterTarget="/monsties/filter"
            showRemove
            @remove="monstieFilter[filter.name] = undefined"
          />
        </div>
      </div>

      <ul class="space-y-5" :class="{ 'mt-8': showActiveFilters }">
        <li v-for="(group, key) in monstieFilter.groupedMonsters" :key="key">
          <div
            v-if="monstieFilter.isGrouped"
            class="sticky top-12 z-10 -mx-1 -mt-3 -mb-1 flex items-center border-t border-neutral-300 bg-neutral-300 px-1 py-1 dark:border-neutral-700 dark:bg-neutral-700"
          >
            <UIcon
              v-if="monstieFilter.sortKey === 'genus'"
              name="ph:dna"
              class="w-6! text-neutral-500 dark:text-neutral-400"
            />

            <UIcon
              v-if="monstieFilter.sortKey === 'habitat'"
              name="ph:map-pin-fill"
              class="w-6! text-neutral-500 dark:text-neutral-400"
            />

            <div class="font-semibold" v-text="key" />
          </div>

          <div class="mt-1 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <NuxtLink
              v-for="monster in group"
              :key="monster.no"
              :to="`/2/monsters/${monster.slug}`"
            >
              <S2MonstieListItem
                :monster="monster"
                :mode="monstieFilter.mode"
                class="box box-link overflow-hidden px-1"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>

      <S2MonsterNoResults v-if="monstieFilter.isEmpty">No monsties found</S2MonsterNoResults>
    </UPageBody>
  </div>
</template>
