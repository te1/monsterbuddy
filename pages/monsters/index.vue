<template>
  <div>
    <!-- <div class="fixed top-0 left-0 right-0 w-full 1h-12 z-10 shadow border-b border-gray-300 bg-white">
      <div class="flex items-center container 1h-full px-4 py-3 text-sm">
        <input type="text">
      </div>
    </div> -->

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
      showHatchableFilter
    />

    <ul class="pt-4">
      <li
        v-for="(group, key) in monsterFilter.groupedMonsters"
        :key="key"
        class="mt-2 first:mt-0 "
      >
        <div
          v-if="monsterFilter.isGrouped"
          class="flex items-center mb-1"
        >
          <FaIcon
            v-if="monsterFilter.sortKey === 'genus'"
            class="!w-6 text-gray-600"
            :icon="['fas', 'dna']"
          />

          <FaIcon
            v-if="monsterFilter.sortKey === 'habitat'"
            class="!w-6 text-gray-600"
            :icon="['fas', 'map-marker-alt']"
          />

          <div
            class="font-semibold"
            v-text="key"
          />
        </div>

        <div class="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <NuxtLink
            v-for="monster in group"
            :key="monster.no"
            :to="`/monsters/${monster.slug}/`"
          >
            <MonsterCard
              :monster="monster"
              class="box px-1 overflow-hidden"
            />
          </NuxtLink>
        </div>
      </li>
    </ul>

    <div
      v-if="monsterFilter.isEmpty"
      class="box flex flex-col items-center py-4 space-y-4"
    >
      <span class="text-2xl text-gray-400 font-semibold">
        No monsters found
      </span>

      <FaIcon
        class="!w-20 !h-20 text-gray-400"
        :icon="['far', 'frown']"
      />

      <button
        class="text-lg text-brand-500 hover:text-brand-400 active:text-gray-500"
        @click="monsterFilter.reset"
      >
        Reset filter
      </button>
    </div>
  </div>
</template>

<script>
  import { mapStores } from 'pinia';
  import { makeMonsterFilterStore } from '~/services/stores';
  import { monsters } from '~/services/data';
  import { makeHead } from '~/services/utils';

  const useMonsterFilter = makeMonsterFilterStore('monsterFilter', monsters, {
    sortKey: 'no',
  });

  export default {
    name: 'PageMonsters',

    provide: {
      useFilterStore: useMonsterFilter,
    },

    data() {
      return {
        showFilter: false,
      };
    },

    head() {
      return makeHead({
        title: 'Monster Buddy - Monster List For Monster Hunter Stories 2',
        description:
          'Quickly check for monster attack patterns, elemental weaknesses and weapon effectiveness on body parts',
        canonical: 'https://monsterbuddy.app/monsters/',
      });
    },

    computed: {
      ...mapStores(useMonsterFilter),
    },
  };
</script>
