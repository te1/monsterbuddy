<template>
  <div>
    <div class="mb-1 flex items-center">
      <h2 class="flex-1 font-semibold tracking-wide">
        Eggs
      </h2>

      <button
        class="text-gray-600 hover:text-blue-600 active:text-blue-800"
        title="Sort and filter"
      >
        <IconFilter />
      </button>
    </div>

    <div
      v-for="(group, key) in groupedMonsties"
      :key="key"
    >
      <div
        v-if="isGrouped"
        class="mb-1 flex items-center font-semibold tracking-wide"
      >
        <IconGenus
          v-if="sortByKey === 'genus'"
          class=" text-gray-500"
        />

        <IconHabitat
          v-if="sortByKey === 'habitat'"
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
  import _ from 'lodash';
  import {
    monsties,
    genera,
    habitats,
    getMonstiesByGenus,
    getMonstiesByHabitat,
  } from '~/services/data';

  export default {
    name: 'PageEggs',

    data() {
      return {
        monsties,
        genera,
        habitats,

        filterByKey: null,
        filterByValue: null,
        sortByKey: null,
      };
    },

    computed: {
      filteredMonsties() {
        let result = this.monsties;

        switch (this.filterByKey) {
          case 'genus':
            return getMonstiesByGenus(this.filterByValue, result);

          case 'habitat':
            return getMonstiesByHabitat(this.filterByValue, result);

          default:
            return result;
        }
      },

      sortedMonsties() {
        let result = this.filteredMonsties;

        switch (this.sortByKey) {
          case 'name':
            return _.sortBy(result, 'name');

          case 'genus':
            return _.sortBy(result, 'genus');

          case 'habitat':
            return _.sortBy(result, 'habitat');

          default:
            return result;
        }
      },

      groupedMonsties() {
        let result = this.sortedMonsties;

        switch (this.sortByKey) {
          case 'genus':
            return _.groupBy(result, 'genus');

          case 'habitat':
            return _.groupBy(result, 'habitat');

          default:
            return { all: result };
        }
      },

      isEmpty() {
        return !this.sortedMonsties.length;
      },

      isGrouped() {
        return _.includes(['genus', 'habitat'], this.sortByKey);
      },
    },
  };
</script>
