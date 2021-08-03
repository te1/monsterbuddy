<template>
  <div>
    <AppTopBar />

    <AppFab
      title="Sort and filter"
      @click="showFilter = !showFilter"
    >
      <FaIcon
        class="pt-px"
        :icon="['fas', 'filter']"
      />
    </AppFab>

    <MonsterFilter
      v-show="showFilter"
      class="mb-3"
      showAttackTypeFilter
      showAttackElementFilter
    />

    <ul>
      <li
        v-for="(group, key) in monstieFilter.groupedMonsters"
        :key="key"
        class="mt-3 first:mt-0 "
      >
        <div
          v-if="monstieFilter.isGrouped"
          class="flex items-center mb-1"
        >
          <FaIcon
            v-if="monstieFilter.sortKey === 'genus'"
            class="!w-6 text-gray-500 dark:text-cool-400"
            :icon="['fas', 'dna']"
          />

          <FaIcon
            v-if="monstieFilter.sortKey === 'habitat'"
            class="!w-6 text-gray-500 dark:text-cool-400"
            :icon="['fas', 'map-marker-alt']"
          />

          <div
            class="font-semibold mb-1"
            v-text="key"
          />
        </div>

        <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <MonstieListItem
            v-for="monster in group"
            :key="monster.no"
            :monster="monster"
            class="box px-1 overflow-hidden"
          />
        </div>
      </li>
    </ul>

    <div
      v-if="monstieFilter.isEmpty"
      class="box flex flex-col items-center py-4 space-y-4"
    >
      <span class="text-2xl text-gray-400 font-semibold">
        No monsties found
      </span>

      <FaIcon
        class="!w-20 !h-20 text-gray-400"
        :icon="['far', 'frown']"
      />

      <div
        class="text-lg text-brand-500 hover:text-brand-400 active:text-gray-500"
        @click="monstieFilter.reset"
      >
        Reset filter
      </div>
    </div>
  </div>
</template>

<script>
  import { mapStores } from 'pinia';
  import { makeMonsterFilterStore } from '~/services/stores';
  import { monsties } from '~/services/data';
  import { makeHead } from '~/services/utils';

  const useMonstieFilter = makeMonsterFilterStore('monstieFilter', monsties, {
    sortKey: 'no',
  });

  export default {
    name: 'PageMonsties',

    provide: {
      useFilterStore: useMonstieFilter,
    },

    data() {
      return {
        showFilter: false,
      };
    },

    head() {
      return makeHead({
        title: 'Monster Buddy - Monstie List For Monster Hunter Stories 2',
        description:
          'Easily find all monsties in their natural habitats and check on retreat conditions and their attack types',
        canonical: 'https://monsterbuddy.app/monsties/',
      });
    },

    computed: {
      ...mapStores(useMonstieFilter),
    },
  };
</script>
