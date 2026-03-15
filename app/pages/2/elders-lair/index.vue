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

  const showActiveFilters = computed(() => {
    return eldersLairFilter.hasActiveSort || eldersLairFilter.hasActiveFilters;
  });

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
    <AppPageHeader
      title="Elder's Lair"
      description="All the high rank monsters and their floors in the Elder's Lair and Special Elder's Lair end game zones"
      :headline="headline"
    />

    <UPageBody>
      <div
        v-if="showActiveFilters"
        class="sticky top-[calc(var(--ui-header-height)+var(--spacing))] z-20 mt-1 mb-2 lg:mb-3"
      >
        <div class="flex flex-wrap items-center justify-center gap-2">
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

      <ul class="flex flex-col gap-3">
        <li v-for="(group, key) in eldersLairFilter.groupedMonsters" :key="key">
          <div
            v-if="eldersLairFilter.isGrouped"
            class="sticky top-(--ui-header-height) z-10 -mx-1 flex items-center bg-elevated/75 p-1 backdrop-blur dark:bg-muted/75"
          >
            <UIcon name="ph:map-pin-fill" class="w-6 text-dimmed" />

            <div class="font-medium">Elder's Lair - {{ key }}</div>
          </div>

          <div class="grid gap-3 md:grid-cols-2">
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
