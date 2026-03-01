<script lang="ts" setup>
  import { filterStoreKey } from '~/stores/2/base';
  import useHistoryStore from '~/stores/2/historyStore';
  import useEggFilter from '~/stores/2/eggFilter';
  import { getGenera, monsties } from '~/services/2/data';

  useSeoMeta({
    title: `Egg List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      'Visual guide with images for all egg patterns for every hatchable monstie with search, sorting and filtering',
  });
  const headline = gameTypeToFullName('mhst2');

  const history = useHistoryStore();
  const eggFilter = useEggFilter();
  provide(filterStoreKey, eggFilter);

  const genera = computed(() => {
    return getGenera(monsties);
  });

  const showEggFinder = ref(false);

  type Display = 'default' | 'recent' | 'pinned';
  const display = ref<Display>('default');

  const mode = computed(() => {
    if (display.value === 'pinned') {
      return 'compact';
    }

    return eggFilter.mode;
  });

  const showFilter = ref(false);

  const showRecentOrPinned = computed(() => {
    return display.value === 'recent' || display.value === 'pinned';
  });

  const showActiveFilters = computed(() => {
    return (
      (eggFilter.hasActiveSort || eggFilter.hasActiveFilters) &&
      !showRecentOrPinned.value &&
      !showEggFinder.value
    );
  });

  const groupedMonsters = computed(() => {
    if (display.value === 'recent') {
      return { all: history.recentMonsties };
    }

    if (display.value === 'pinned') {
      return { all: history.pinnedEggs };
    }

    return eggFilter.groupedMonsters;
  });

  const _heading = computed(() => {
    if (showFilter.value) {
      return 'View Options';
    }

    if (showEggFinder.value) {
      return 'Egg Finder';
    }

    if (display.value === 'recent') {
      return 'Recent Eggs';
    }

    if (display.value === 'pinned') {
      return 'Bookmarked Eggs';
    }

    return null;
  });

  const displays = computed(() => {
    const results: Display[] = ['default'];

    if (history.hasRecentMonsties) {
      results.push('recent');
    }

    if (history.hasPinnedEggs) {
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
    showEggFinder.value = false;

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const fabDisplayVisible = computed(() => {
    return !showFilter.value && displays.value.length > 1;
  });

  const fabDisplayTitle = computed(() => {
    switch (nextDisplay.value) {
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
      return 'i-lucide-x';
    }

    return 'i-lucide-egg';
  });

  function toggleEggFinder() {
    showEggFinder.value = !showEggFinder.value;
    display.value = 'default';

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
  <div>
    <UPageHeader
      title="Eggs"
      description="Visual guide with images for all egg patterns for every hatchable monstie"
      :headline="headline"
    />

    <UPageBody>
      <!-- TODO filter modal -->

      <ClientOnly>
        <UTooltip v-if="fabDisplayVisible" :text="fabDisplayTitle">
          <UButton color="neutral" variant="soft" :icon="fabDisplayIcon" @click="toggleDisplay" />
        </UTooltip>

        <UTooltip v-if="fabEggFinderVisible" :text="fabEggFinderTitle">
          <UButton
            color="neutral"
            variant="soft"
            :icon="fabEggFinderIcon"
            @click="toggleEggFinder"
          />
        </UTooltip>
      </ClientOnly>

      <div v-if="showActiveFilters" class="fixed inset-x-0 top-12 z-20 mt-1 w-full">
        <div class="container flex flex-wrap items-center justify-center gap-2 px-4">
          <AppFilterPill
            v-if="eggFilter.hasActiveSort"
            :caption="eggFilter.activeSort?.caption ?? ''"
            filterTarget="/monsties/filter/"
            :sortOrder="eggFilter.activeSort?.order"
          />

          <AppFilterPill
            v-for="filter in eggFilter.activeFilters"
            :key="filter.name"
            :caption="filter.value"
            filterTarget="/eggs/filter/"
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
        <li v-for="(group, key) in groupedMonsters" :key="key">
          <div
            v-if="eggFilter.isGrouped && !showRecentOrPinned"
            class="sticky top-12 z-10 -mx-1 -mt-3 -mb-1 flex items-center border-t border-neutral-300 bg-neutral-300 px-1 py-1 dark:border-neutral-700 dark:bg-neutral-700"
          >
            <UIcon
              v-if="eggFilter.sortKey === 'genus'"
              name="i-lucide-dna"
              class="w-6! text-neutral-500 dark:text-neutral-400"
            />

            <UIcon
              v-if="eggFilter.sortKey === 'habitat'"
              name="i-lucide-map-pin"
              class="w-6! text-neutral-500 dark:text-neutral-400"
            />

            <div class="font-semibold" v-text="key" />
          </div>

          <div
            v-if="mode === 'compact'"
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
                :mode="mode"
                class="box box-link overflow-hidden px-1"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>

      <S2MonsterNoResults v-if="eggFilter.isEmpty && !showRecentOrPinned">
        No eggs found
      </S2MonsterNoResults>
    </UPageBody>
  </div>
</template>
