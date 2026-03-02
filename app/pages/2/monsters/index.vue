<script lang="ts" setup>
  import { filterStoreKey } from '~/stores/2/base';
  import useHistoryStore from '~/stores/2/historyStore';
  import useMonsterFilter from '~/stores/2/monsterFilter';

  useSeoMeta({
    title: `Monster List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      'Quickly check for monster attack patterns, elemental weaknesses and weapon effectiveness on body parts',
  });
  const headline = gameTypeToFullName('mhst2');

  const history = useHistoryStore();
  const monsterFilter = useMonsterFilter();
  provide(filterStoreKey, monsterFilter);

  type Display = 'default' | 'recent' | 'pinned';
  const display = ref<Display>('default');

  const mode = computed(() => {
    if (display.value === 'pinned') {
      return 'combat';
    }

    return monsterFilter.mode;
  });

  const showFilter = ref(false); // TODO?

  const showActiveFilters = computed(() => {
    return (
      (monsterFilter.hasActiveSort || monsterFilter.hasActiveFilters) && !showRecentOrPinned.value
    );
  });

  const showRecentOrPinned = computed(() => {
    return display.value === 'recent' || display.value === 'pinned';
  });

  const groupedMonsters = computed(() => {
    if (display.value === 'recent') {
      return { all: history.recentMonsters };
    }

    if (display.value === 'pinned') {
      return { all: history.pinnedMonsters };
    }

    return monsterFilter.groupedMonsters;
  });

  const _heading = computed(() => {
    if (showFilter.value) {
      return 'View Options';
    }

    if (display.value === 'recent') {
      return 'Recent Monsters';
    }

    if (display.value === 'pinned') {
      return 'Bookmarked Monsters';
    }

    return null;
  });

  const displays = computed(() => {
    const results: Display[] = ['default'];

    if (history.hasRecentMonsters) {
      results.push('recent');
    }

    if (history.hasPinnedMonsters) {
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
    history.lastList = 'monsters';
  });
</script>

<template>
  <!-- TODO CSS -->

  <div>
    <UPageHeader
      title="Monsters"
      description="Quickly check for monster attack patterns, elemental weaknesses and weapon effectiveness on body parts"
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
            v-if="monsterFilter.hasActiveSort"
            :caption="monsterFilter.activeSort?.caption ?? ''"
            filterTarget="/monsties/filter/"
            :sortOrder="monsterFilter.activeSort?.order"
          />

          <AppFilterPill
            v-for="filter in monsterFilter.activeFilters"
            :key="filter.name"
            :caption="filter.value"
            filterTarget="/monsters/filter/"
            showRemove
            @remove="monsterFilter[filter.name] = undefined"
          />
        </div>
      </div>

      <ul class="space-y-5" :class="{ 'mt-8': showActiveFilters }">
        <li v-for="(group, key) in groupedMonsters" :key="key">
          <div
            v-if="monsterFilter.isGrouped && !showRecentOrPinned"
            class="sticky top-12 z-10 -mx-1 -mt-3 -mb-1 flex items-center border-t border-neutral-300 bg-neutral-300 px-1 py-1 dark:border-neutral-700 dark:bg-neutral-700"
          >
            <UIcon
              v-if="monsterFilter.sortKey === 'genus'"
              name="i-lucide-dna"
              class="w-6! text-neutral-500 dark:text-neutral-400"
            />

            <UIcon
              v-if="monsterFilter.sortKey === 'habitat'"
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
              <S2MonsterListItem
                :monster="monster"
                :mode="mode"
                class="box box-link overflow-hidden px-1"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>

      <S2MonsterNoResults v-if="monsterFilter.isEmpty && !showRecentOrPinned">
        No monsters found
      </S2MonsterNoResults>
    </UPageBody>
  </div>
</template>
