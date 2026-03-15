<script lang="ts" setup>
  import S2EldersLairSidebar from '~/components/s2/S2EldersLairSidebar.vue';
  import { filterStoreKey } from '~/stores/2/baseMonsterFilter';
  import useEldersLairFilter, { modes } from '~/stores/2/eldersLairFilter';

  definePageMeta({
    sidebarComponent: S2EldersLairSidebar,
    mobileHeaderTitle: "Elder's Lair",
  });

  useSeoMeta({
    title: `Elder's Lair Monster List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      "Overview of all the high rank monsters and on which floor to find them in the Elder's Lair and Special Elder's Lair end game zones",
  });
  // TODO drop ?floor from canonical url
  const headline = gameTypeToFullName('mhst2');

  const router = useRouter();
  const route = useRoute();
  const hasSidebar = useHasSidebar();

  const eldersLairFilter = useEldersLairFilter();
  provide(filterStoreKey, eldersLairFilter);

  const showFilter = computed({
    get: () => route.query.filter !== undefined,
    set: (value) => {
      if (value === (route.query.filter !== undefined)) {
        return;
      }

      if (value) {
        router.push({
          path: route.path,
          query: { ...route.query, filter: null },
        });
      } else {
        const { filter: _filter, ...query } = route.query;
        router.push({
          path: route.path,
          query,
        });
      }
    },
  });

  if (route.query.floor) {
    eldersLairFilter.eldersLairFilter = route.query.floor as string;

    router.replace(route.path); // remove query parameters from URL
  } else {
    eldersLairFilter.eldersLairFilter = undefined;
  }

  const fabFilterTarget = computed(() => {
    if (showFilter.value) {
      return '/2/elders-lair';
    }
    return '/2/elders-lair?filter';
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
</script>

<template>
  <!-- TODO CSS -->

  <div>
    <UPageHeader
      title="Elder's Lair"
      description="All the high rank monsters and their floors in the Elder's Lair and Special Elder's Lair end game zones"
      :headline="headline"
      :ui="{
        root: 'py-3 lg:py-4',
        headline: 'hidden lg:flex',
        title: 'hidden lg:flex',
        description: 'mt-0 lg:mt-4',
      }"
    />

    <UPageBody>
      <div
        v-if="eldersLairFilter.hasActiveSort || eldersLairFilter.hasActiveFilters"
        class="fixed inset-x-0 top-12 z-20 mt-1 w-full"
      >
        <div class="container flex flex-wrap items-center justify-center gap-2 px-4">
          <AppFilterPill
            v-if="eldersLairFilter.hasActiveSort"
            :caption="eldersLairFilter.activeSort?.caption ?? ''"
            filterTarget="/2/elders-lair?filter"
            :sortOrder="eldersLairFilter.activeSort?.order"
          />

          <AppFilterPill
            v-for="filter in eldersLairFilter.activeFilters"
            :key="filter.name"
            :caption="filter.value"
            filterTarget="/2/elders-lair?filter"
            showRemove
            @remove="eldersLairFilter[filter.name] = undefined"
          />
        </div>
      </div>

      <ul
        class="space-y-5"
        :class="{ 'mt-8': eldersLairFilter.hasActiveSort || eldersLairFilter.hasActiveFilters }"
      >
        <li v-for="(group, key) in eldersLairFilter.groupedMonsters" :key="key">
          <div
            v-if="eldersLairFilter.isGrouped"
            class="sticky top-12 z-10 -mx-1 -mt-3 -mb-1 flex items-center border-t border-neutral-300 bg-neutral-300 px-1 py-1 dark:border-neutral-700 dark:bg-neutral-700"
          >
            <UIcon name="ph:map-pin-fill" class="w-6! text-neutral-500 dark:text-neutral-400" />

            <div class="mb-1 font-semibold">Elder's Lair - {{ key }}</div>
          </div>

          <div class="mt-1 grid gap-3 md:grid-cols-2">
            <NuxtLink
              v-for="monster in group"
              :key="monster.no"
              :to="`/2/monsters/${monster.slug}`"
            >
              <S2MonsterListItem
                :monster="monster"
                :mode="eldersLairFilter.mode"
                class="box box-link overflow-hidden px-1"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>

      <S2MonsterNoResults v-if="eldersLairFilter.isEmpty">No monsters found</S2MonsterNoResults>
    </UPageBody>

    <ClientOnly>
      <UDrawer
        v-if="!hasSidebar"
        v-model:open="showFilter"
        title="View Options"
        description=" "
        :ui="{ body: 'flex flex-col gap-3' }"
      >
        <template #body>
          <S2MonsterViewOptions :filter="eldersLairFilter" :modes="modes" hideSort modalLayout />

          <S2MonsterFilter
            :filter="eldersLairFilter"
            showEldersLairFilter
            showHatchableFilter
            modalLayout
            backTarget="/2/elders-lair"
          />
        </template>
      </UDrawer>

      <AppFabPanel>
        <NuxtLink v-if="!showFilter" :to="fabFilterTarget">
          <AppFab :tooltip="fabFilterTooltip" :icon="fabFilterIcon" />
        </NuxtLink>
      </AppFabPanel>
    </ClientOnly>
  </div>
</template>
