<script lang="ts" setup>
  import { filterStoreKey } from '~/stores/2/baseMonsterFilter';
  import useEldersLairFilter from '~/stores/2/eldersLairFilter';

  useSeoMeta({
    title: `Elder's Lair Monster List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      "Overview of all the high rank monsters and on which floor to find them in the Elder's Lair and Special Elder's Lair end game zones",
  });
  // TODO drop ?floor from canonical url
  const headline = gameTypeToFullName('mhst2');

  const eldersLairFilter = useEldersLairFilter();
  provide(filterStoreKey, eldersLairFilter);

  const showFilter = ref(false); // TODO?

  const _heading = computed(() => {
    if (showFilter.value) {
      return 'View Options';
    }

    return null;
  });

  const route = useRoute();
  if (route.query.floor) {
    eldersLairFilter.eldersLairFilter = route.query.floor as string;

    useRouter().replace(route.path); // remove query parameters from URL
  } else {
    eldersLairFilter.eldersLairFilter = undefined;
  }
</script>

<template>
  <!-- TODO CSS -->

  <div>
    <UPageHeader
      title="Elder's Lair"
      description="Overview of all the high rank monsters and on which floor to find them in the Elder's Lair and Special Elder's Lair end game zones"
      :headline="headline"
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
            filterTarget="/monsties/filter/"
            :sortOrder="eldersLairFilter.activeSort?.order"
          />

          <AppFilterPill
            v-for="filter in eldersLairFilter.activeFilters"
            :key="filter.name"
            :caption="filter.value"
            filterTarget="/monsters/filter/"
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
            <UIcon name="i-lucide-map-pin" class="w-6! text-neutral-500 dark:text-neutral-400" />

            <div class="mb-1 font-semibold">Elder's Lair - {{ key }}</div>
          </div>

          <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
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
  </div>
</template>
