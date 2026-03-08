<script lang="ts" setup>
  import S2MonsterSidebar from '~/components/s2/monster/S2MonsterSidebar.vue';
  import { monsters } from '~/services/2/data';
  import { filterStoreKey } from '~/stores/2/baseMonsterFilter';
  import useHistoryStore from '~/stores/2/historyStore';
  import useMonsterFilter from '~/stores/2/monsterFilter';
  import useMonsterSources, { type Source } from '~/stores/2/monsterSources';

  definePageMeta({
    sidebarComponent: S2MonsterSidebar,
  });

  useSeoMeta({
    title: `Monster List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      'Quickly check for monster attack patterns, elemental weaknesses and weapon effectiveness on body parts',
  });
  // TODO drop ?source from canonical url
  const headline = gameTypeToFullName('mhst2');

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

  const showFilter = ref(false); // TODO?

  const _heading = computed(() => {
    if (showFilter.value) {
      return 'View Options';
    }

    if (sources.current === 'recent') {
      return 'Recent Monsters';
    }

    if (sources.current === 'pinned') {
      return 'Bookmarked Monsters';
    }

    return null;
  });

  function toggleSource() {
    sources.setCurrent(sources.next, monsterFilter);

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
        sources.setCurrent(newSource, monsterFilter);

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
            v-if="monsterFilter.hasActiveSort"
            :caption="monsterFilter.activeSort?.caption ?? ''"
            filterTarget="/2/monsters/filter"
            :sortOrder="monsterFilter.activeSort?.order"
          />

          <AppFilterPill
            v-for="filter in monsterFilter.activeFilters"
            :key="filter.name"
            :caption="filter.value"
            filterTarget="/2/monsters/filter"
            showRemove
            @remove="monsterFilter[filter.name] = undefined"
          />
        </div>
      </div>

      <ul class="space-y-5" :class="{ 'mt-8': showActiveFilters }">
        <li v-for="(group, key) in monsterFilter.groupedMonsters" :key="key">
          <div
            v-if="monsterFilter.isGrouped"
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

          <div class="mt-1 grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
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

      <S2MonsterNoResults v-if="monsterFilter.isEmpty">No monsters found</S2MonsterNoResults>
    </UPageBody>
  </div>
</template>
