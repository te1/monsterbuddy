<template>
  <div>
    <AppTopBar>
      <!-- <div class="w-full h-full flex items-center py-2">
        <input
          type="text"
          class="w-full h-full border-0 rounded bg-gray-200 dark:bg-cool-600 placeholder-gray-700 dark:placeholder-cool-300"
          placeholder="Search..."
        >
      </div> -->
    </AppTopBar>

    <AppFloatingButton
      title="Sort and filter"
      @click="showFilter = !showFilter"
    >
      <FaIcon
        class="pt-px"
        :icon="['fas', 'filter']"
      />
    </AppFloatingButton>

    <MonsterFilter
      v-show="showFilter"
      class="mb-3"
      showHatchableFilter
    />

    <ul>
      <li
        v-for="(group, key) in monsterFilter.groupedMonsters"
        :key="key"
        class="mt-3 first:mt-0 "
      >
        <div
          v-if="monsterFilter.isGrouped"
          class="flex items-center mb-1"
        >
          <FaIcon
            v-if="monsterFilter.sortKey === 'genus'"
            class="!w-6 text-gray-500 dark:text-cool-400"
            :icon="['fas', 'dna']"
          />

          <FaIcon
            v-if="monsterFilter.sortKey === 'habitat'"
            class="!w-6 text-gray-500 dark:text-cool-400"
            :icon="['fas', 'map-marker-alt']"
          />

          <div
            class="font-semibold mb-1"
            v-text="key"
          />
        </div>

        <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <NuxtLink
            v-for="monster in group"
            :key="monster.no"
            :to="`/monsters/${monster.slug}/`"
          >
            <MonsterListItem
              :monster="monster"
              class="box box-link px-1 overflow-hidden"
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

      <div
        class="text-lg text-brand-500 hover:text-brand-400 active:text-gray-500"
        @click="monsterFilter.reset"
      >
        Reset filter
      </div>
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
