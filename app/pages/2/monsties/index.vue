<script lang="ts" setup>
  import S2MonstieSidebar from '~/components/s2/monstie/S2MonstieSidebar.vue';
  import { monsties } from '~/services/2/data';
  import { filterStoreKey } from '~/stores/2/baseMonsterFilter';
  import useHistoryStore from '~/stores/2/historyStore';
  import useMonstieFilter from '~/stores/2/monstieFilter';
  import useMonstieDisplay, { type Display } from '~/stores/2/monstieDisplay';

  definePageMeta({
    sidebarComponent: S2MonstieSidebar,
  });

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
  const display = useMonstieDisplay();

  const oldSortKey = ref(monstieFilter.sortKey);
  const oldSortOrder = ref(monstieFilter.sortOrder);

  const showActiveFilters = computed(() => {
    return monstieFilter.hasActiveSort || monstieFilter.hasActiveFilters;
  });

  const displayMonsters = computed(() => {
    switch (display.current) {
      case 'recent':
        return history.recentMonsties;

      case 'pinned':
        return history.pinnedMonsties;

      default:
        return monsties;
    }
  });

  function syncDisplayedMonsters() {
    monstieFilter.setMonsters(displayMonsters.value, {
      preserveSourceOrder: display.current === 'recent' && monstieFilter.preserveSourceOrder,
    });
  }

  watch(
    () => display.current,
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

      syncDisplayedMonsters();
    },
    { immediate: true }
  );

  watch(displayMonsters, syncDisplayedMonsters);

  const showFilter = ref(false); // TODO?

  const _heading = computed(() => {
    if (showFilter.value) {
      return 'View Options';
    }

    if (display.current === 'recent') {
      return 'Recent Monsties';
    }

    if (display.current === 'pinned') {
      return 'Bookmarked Monsties';
    }

    return null;
  });

  function toggleDisplay() {
    display.setCurrent(display.next, monstieFilter);

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
        display.setCurrent(newDisplay as Display, monstieFilter);

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
