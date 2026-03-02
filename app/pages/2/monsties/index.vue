<script lang="ts" setup>
  import { filterStoreKey } from '~/stores/2/base';
  import useHistoryStore from '~/stores/2/historyStore';
  import useMonstieFilter from '~/stores/2/monstieFilter';

  useSeoMeta({
    title: `Monstie List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      'Easily find all monsties in their natural habitats and check on retreat conditions, their attack types and stats',
  });
  // TODO drop ?display from canonical url
  const headline = gameTypeToFullName('mhst2');

  const history = useHistoryStore();
  const monstieFilter = useMonstieFilter();
  provide(filterStoreKey, monstieFilter);

  type Display = 'default' | 'recent' | 'pinned';
  const display = ref<Display>('default');

  const mode = computed(() => {
    if (display.value === 'pinned') {
      return 'combat';
    }

    return monstieFilter.mode;
  });

  const showFilter = ref(false); // TODO?

  const showActiveFilters = computed(() => {
    return (
      (monstieFilter.hasActiveSort || monstieFilter.hasActiveFilters) && !showRecentOrPinned.value
    );
  });

  const showRecentOrPinned = computed(() => {
    return display.value === 'recent' || display.value === 'pinned';
  });

  const groupedMonsters = computed(() => {
    if (display.value === 'recent') {
      return { all: history.recentMonsties };
    }

    if (display.value === 'pinned') {
      return { all: history.pinnedMonsties };
    }

    return monstieFilter.groupedMonsters;
  });

  const _heading = computed(() => {
    if (showFilter.value) {
      return 'View Options';
    }

    if (display.value === 'recent') {
      return 'Recent Monsties';
    }

    if (display.value === 'pinned') {
      return 'Bookmarked Monsties';
    }

    return null;
  });

  const displays = computed(() => {
    const results: Display[] = ['default'];

    if (history.hasRecentMonsties) {
      results.push('recent');
    }

    if (history.hasPinnedMonsties) {
      results.push('pinned');
    }

    return results;
  });

  const nextDisplay = computed(() => {
    const currentIndex = displays.value.indexOf(display.value);
    const nextIndex = (currentIndex + 1) % displays.value.length;

    return displays.value[nextIndex] ?? 'default';
  });

  function toggleDisplay() {
    display.value = nextDisplay.value;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const route = useRoute();
  watch(
    () => route.query.display,
    (newDisplay) => {
      if (typeof newDisplay !== 'string') {
        return;
      }

      if (displays.value.includes(newDisplay as Display)) {
        display.value = newDisplay as Display;

        useRouter().replace(route.path); // remove query parameters from URL
      }
    },
    { immediate: true }
  );

  const fabDisplayVisible = computed(() => {
    return !showFilter.value && displays.value.length > 1;
  });

  const fabDisplayTitle = computed(() => {
    switch (nextDisplay.value) {
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

  const fabDisplayIcon = computed(() => {
    switch (nextDisplay.value) {
      case 'default':
        return 'i-lucide-x';

      case 'recent':
        return 'i-lucide-history';

      case 'pinned':
        return 'i-lucide-bookmark';

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
        <UTooltip v-if="fabDisplayVisible" :text="fabDisplayTitle">
          <UButton color="neutral" variant="soft" :icon="fabDisplayIcon" @click="toggleDisplay" />
        </UTooltip>
      </ClientOnly>

      <div v-if="showActiveFilters" class="fixed inset-x-0 top-12 z-20 mt-1 w-full">
        <div class="container flex flex-wrap items-center justify-center gap-2 px-4">
          <AppFilterPill
            v-if="monstieFilter.hasActiveSort"
            :caption="monstieFilter.activeSort?.caption ?? ''"
            filterTarget="/monsties/filter/"
            :sortOrder="monstieFilter.activeSort?.order"
          />

          <AppFilterPill
            v-for="filter in monstieFilter.activeFilters"
            :key="filter.name"
            :caption="filter.value"
            filterTarget="/monsties/filter/"
            showRemove
            @remove="monstieFilter[filter.name] = undefined"
          />
        </div>
      </div>

      <ul class="space-y-5" :class="{ 'mt-8': showActiveFilters }">
        <li v-for="(group, key) in groupedMonsters" :key="key">
          <div
            v-if="monstieFilter.isGrouped && !showRecentOrPinned"
            class="sticky top-12 z-10 -mx-1 -mt-3 -mb-1 flex items-center border-t border-neutral-300 bg-neutral-300 px-1 py-1 dark:border-neutral-700 dark:bg-neutral-700"
          >
            <UIcon
              v-if="monstieFilter.sortKey === 'genus'"
              name="i-lucide-dna"
              class="w-6! text-neutral-500 dark:text-neutral-400"
            />

            <UIcon
              v-if="monstieFilter.sortKey === 'habitat'"
              name="i-lucide-map-pin"
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
                :mode="mode"
                class="box box-link overflow-hidden px-1"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>

      <S2MonsterNoResults v-if="monstieFilter.isEmpty && !showRecentOrPinned">
        No monsties found
      </S2MonsterNoResults>
    </UPageBody>
  </div>
</template>
