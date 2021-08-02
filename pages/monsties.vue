<template>
  <div>
    <button
      class="mb-1 text-xl text-brand-500 hover:text-brand-400 active:text-gray-500"
      title="Sort and filter"
      @click="showFilter = !showFilter"
    >
      <FaIcon :icon="['fas', 'filter']" />
    </button>

    <MonsterFilter
      v-show="showFilter"
      class="mb-2"
      showAttackTypeFilter
      showAttackElementFilter
    />

    <ul>
      <li
        v-for="(group, key) in monstieFilter.groupedMonsters"
        :key="key"
        class="mt-2 first:mt-0 "
      >
        <div
          v-if="monstieFilter.isGrouped"
          class="flex items-center mb-1"
        >
          <FaIcon
            v-if="monstieFilter.sortKey === 'genus'"
            class="!w-6 text-gray-600"
            :icon="['fas', 'dna']"
          />

          <FaIcon
            v-if="monstieFilter.sortKey === 'habitat'"
            class="!w-6 text-gray-600"
            :icon="['fas', 'map-marker-alt']"
          />

          <div
            class="font-semibold"
            v-text="key"
          />
        </div>

        <div class="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <MonstieCard
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

      <button
        class="text-lg text-brand-500 hover:text-brand-400 active:text-gray-500"
        @click="monstieFilter.reset"
      >
        Reset filter
      </button>
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
