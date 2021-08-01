<template>
  <div>
    <div class="relative">
      <button
        class="fixed bottom-16 right-4 z-10 flex items-center justify-center w-12 h-12 rounded-full drop-shadow-md text-2xl bg-brand-500 text-white"
        title="Sort and filter"
        @click="showFilter = !showFilter"
      >
        <FaIcon
          class="pt-px"
          :icon="['fas', 'filter']"
        />
      </button>
    </div>

    <MonsterFilter
      v-show="showFilter"
      ref="monsterFilter"
      class="mb-2"
      :monsters="monsters"
      initialSortKey="no"
      showAttackTypeFilter
      @updated="onFilterUpdated"
    />

    <ul>
      <li
        v-for="(group, key) in groupedMonsters"
        :key="key"
        class="mt-2 first:mt-0 "
      >
        <div
          v-if="isGrouped"
          class="flex items-center mb-1"
        >
          <FaIcon
            v-if="sortKey === 'genus'"
            class="!w-6 text-gray-600"
            :icon="['fas', 'dna']"
          />

          <FaIcon
            v-if="sortKey === 'habitat'"
            class="!w-6 text-gray-600"
            :icon="['fas', 'map-marker-alt']"
          />

          <div
            class="font-semibold"
            v-text="key"
          />
        </div>

        <div class="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <EggCard
            v-for="monster in group"
            :key="monster.no"
            :monster="monster"
            class="px-1 rounded shadow bg-white overflow-hidden"
          />
        </div>
      </li>
    </ul>

    <div
      v-if="isEmpty"
      class="flex flex-col items-center py-4 space-y-4 rounded shadow bg-white"
    >
      <span class="text-2xl text-gray-400 font-semibold">
        No eggs found
      </span>

      <FaIcon
        class="!w-20 !h-20 text-gray-400"
        :icon="['far', 'frown']"
      />

      <button
        class="text-lg text-brand-500 hover:text-brand-400 active:text-gray-500"
        @click="resetFilter"
      >
        Reset filter
      </button>
    </div>
  </div>
</template>

<script>
  import { monsties } from '~/services/data';

  export default {
    name: 'PageEggs',

    data() {
      return {
        monsters: monsties,
        groupedMonsters: { all: monsties },
        isEmpty: false,
        isGrouped: false,
        sortKey: null,
        showFilter: false,
      };
    },

    head: {
      title: 'Monster Buddy - Egg List For Monster Hunter Stories 2',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Visual guide with images for all egg patterns for every hatchable monstie with search, sorting and filtering',
        },
      ],
    },

    methods: {
      onFilterUpdated({ groupedMonsters, isEmpty, isGrouped, sortKey }) {
        this.groupedMonsters = groupedMonsters;
        this.isEmpty = isEmpty;
        this.isGrouped = isGrouped;
        this.sortKey = sortKey;
      },

      resetFilter() {
        if (this.$refs.monsterFilter) {
          this.$refs.monsterFilter.reset();
        }
      },
    },
  };
</script>
