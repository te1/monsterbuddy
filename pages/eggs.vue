<template>
  <div>
    <div class="mb-1 flex items-center">
      <h2 class="flex-1 font-semibold tracking-wide">
        Eggs
      </h2>

      <button
        class="text-gray-600 hover:text-blue-400 active:text-blue-800"
        title="Sort and filter"
        @click="showFilter = !showFilter"
      >
        <IconFilter />
      </button>
    </div>

    <MonsterFilter
      v-show="showFilter"
      :monsters="monsties"
      initialSortKey="no"
      @updated="onFilterUpdated"
    />

    <div
      v-for="(group, key) in groupedMonsties"
      :key="key"
    >
      <div
        v-if="isGrouped"
        class="mb-1 flex items-center font-semibold tracking-wide"
      >
        <IconGenus
          v-if="sortKey === 'genus'"
          class=" text-gray-500"
        />

        <IconHabitat
          v-if="sortKey === 'habitat'"
          class="text-gray-500"
        />

        <div class="ml-1">
          {{ key }}
        </div>
      </div>

      <div class="grid gap-2 mb-4 lg:grid-cols-2 2xl:grid-cols-3">
        <EggCard
          v-for="monstie in group"
          :key="monstie.no"
          :monster="monstie"
        />
      </div>
    </div>

    <div v-if="isEmpty">
      No eggs found
    </div>
  </div>
</template>

<script>
  import { monsties } from '~/services/data';

  export default {
    name: 'PageEggs',

    data() {
      return {
        monsties,
        groupedMonsties: { all: monsties },
        isEmpty: false,
        isGrouped: false,
        sortKey: null,
        showFilter: false,
      };
    },

    methods: {
      onFilterUpdated({ groupedMonsters, isEmpty, isGrouped, sortKey }) {
        this.groupedMonsties = groupedMonsters;
        this.isEmpty = isEmpty;
        this.isGrouped = isGrouped;
        this.sortKey = sortKey;
      },
    },
  };
</script>
