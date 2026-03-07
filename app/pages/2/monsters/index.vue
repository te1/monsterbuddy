<script lang="ts" setup>
  import { filterStoreKey } from '~/stores/2/baseMonsterFilter';
  import S2MonsterSidebar from '~/components/s2/monster/S2MonsterSidebar.vue';
  import useHistoryStore from '~/stores/2/historyStore';
  import useMonsterFilter from '~/stores/2/monsterFilter';
  import useMonsterDisplay, { type Display } from '~/stores/2/monsterDisplay';

  definePageMeta({
    sidebarComponent: S2MonsterSidebar,
  });

  useSeoMeta({
    title: `Monster List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      'Quickly check for monster attack patterns, elemental weaknesses and weapon effectiveness on body parts',
  });
  // TODO drop ?display from canonical url
  const headline = gameTypeToFullName('mhst2');

  const history = useHistoryStore();
  const monsterFilter = useMonsterFilter();
  provide(filterStoreKey, monsterFilter);
  const display = useMonsterDisplay();

  const showFilter = ref(false); // TODO?

  const showActiveFilters = computed(() => {
    return (
      (monsterFilter.hasActiveSort || monsterFilter.hasActiveFilters) && !showRecentOrPinned.value
    );
  });

  const showRecentOrPinned = computed(() => {
    return display.current === 'recent' || display.current === 'pinned';
  });

  const groupedMonsters = computed(() => {
    if (display.current === 'recent') {
      return { all: history.recentMonsters };
    }

    if (display.current === 'pinned') {
      return { all: history.pinnedMonsters };
    }

    return monsterFilter.groupedMonsters;
  });

  const _heading = computed(() => {
    if (showFilter.value) {
      return 'View Options';
    }

    if (display.current === 'recent') {
      return 'Recent Monsters';
    }

    if (display.current === 'pinned') {
      return 'Bookmarked Monsters';
    }

    return null;
  });

  function toggleDisplay() {
    display.current = display.next;

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
          <UButton
            color="neutral"
            variant="soft"
            :icon="fabDisplayIcon"
            class="absolute z-10"
            @click="toggleDisplay"
          />
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
              name="ph:dna"
              class="w-6! text-neutral-500 dark:text-neutral-400"
            />

            <UIcon
              v-if="monsterFilter.sortKey === 'habitat'"
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
              <S2MonsterListItem
                :monster="monster"
                :mode="monsterFilter.mode"
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
