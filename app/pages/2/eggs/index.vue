<script lang="ts" setup>
  import { filterStoreKey } from '~/stores/2/baseMonsterFilter';
  import S2EggSidebar from '~/components/s2/egg/S2EggSidebar.vue';
  import useHistoryStore from '~/stores/2/historyStore';
  import useEggFilter from '~/stores/2/eggFilter';
  import useEggDisplay, { type Display } from '~/stores/2/eggDisplay';
  import { getGenera, monsties } from '~/services/2/data';

  definePageMeta({
    sidebarComponent: S2EggSidebar,
  });

  useSeoMeta({
    title: `Egg List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      'Visual guide with images for all egg patterns for every hatchable monstie with search, sorting and filtering',
  });
  // TODO drop ?display from canonical url
  const headline = gameTypeToFullName('mhst2');

  const history = useHistoryStore();
  const eggFilter = useEggFilter();
  provide(filterStoreKey, eggFilter);
  const display = useEggDisplay();

  const genera = computed(() => {
    return getGenera(monsties);
  });

  const showEggFinder = ref(false);

  const showFilter = ref(false);

  const showRecentOrPinned = computed(() => {
    return display.current === 'recent' || display.current === 'pinned';
  });

  const showActiveFilters = computed(() => {
    return (
      (eggFilter.hasActiveSort || eggFilter.hasActiveFilters) &&
      !showRecentOrPinned.value &&
      !showEggFinder.value
    );
  });

  const groupedMonsters = computed(() => {
    if (display.current === 'recent') {
      return { all: history.recentMonsties };
    }

    if (display.current === 'pinned') {
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

    if (display.current === 'recent') {
      return 'Recent Eggs';
    }

    if (display.current === 'pinned') {
      return 'Bookmarked Eggs';
    }

    return null;
  });

  function toggleDisplay() {
    display.current = display.next;
    showEggFinder.value = false;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const route = useRoute();
  watch(
    () => route.query.display,
    (newDisplay) => {
      if (typeof newDisplay !== 'string') {
        return;
      }

      if (display.all.includes(newDisplay as Display)) {
        display.current = newDisplay as Display;

        useRouter().replace(route.path); // remove query parameters from URL
      }
    },
    { immediate: true }
  );

  const fabDisplayVisible = computed(() => {
    return !showFilter.value && display.all.length > 1;
  });

  const fabDisplayTitle = computed(() => {
    switch (display.next) {
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
    switch (display.next) {
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
    display.current = 'default';

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
        <UTooltip v-if="fabDisplayVisible" :text="fabDisplayTitle">
          <UButton
            color="neutral"
            variant="soft"
            :icon="fabDisplayIcon"
            class="absolute top-[275px] z-10"
            @click="toggleDisplay"
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

      <S2MonsterNoResults v-if="eggFilter.isEmpty && !showRecentOrPinned">
        No eggs found
      </S2MonsterNoResults>
    </UPageBody>
  </div>
</template>
