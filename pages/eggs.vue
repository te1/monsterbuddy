<template>
  <div>
    <h2 class="mb-2 text-lg text-gray-700 font-semibold tracking-wide">
      Eggs
    </h2>

    <div
      v-for="(group, key) in groupedMonsties"
      :key="key"
    >
      <div
        v-if="key !== 'all'"
        class="mb-2 flex items-center text-lg text-gray-700 font-semibold tracking-wide"
      >
        <svg
          v-if="sortByKey === 'genus'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
          />
        </svg>

        <svg
          v-if="sortByKey === 'habitat'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clip-rule="evenodd"
          />
        </svg>

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
    },
  };
</script>
