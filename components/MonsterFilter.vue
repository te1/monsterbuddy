<template>
  <div class="flex flex-col mb-2 px-2 py-2 space-y-1 text-sm bg-white rounded shadow border border-gray-300">
    <div class="flex items-center">
      <label
        class="flex-1 cursor-pointer"
        for="MonsterFilter_SortKey"
      >
        Sorting
      </label>

      <select
        id="MonsterFilter_SortKey"
        v-model="sortKey"
        class="w-32 text-sm px-2 py-1 rounded"
      >
        <option value="no">Number</option>
        <option value="name">Name</option>
        <option value="genus">Genus</option>
        <option value="habitat">Habitat</option>
      </select>
    </div>

    <div class="flex items-center">
      <label
        class="flex-1 cursor-pointer"
        for="MonsterFilter_GenusFilter"
      >
        Genus
      </label>

      <select
        id="MonsterFilter_GenusFilter"
        v-model="genusFilter"
        class="w-32 text-sm px-2 py-1 rounded"
      >
        <option :value="null">All</option>

        <option
          v-for="genus in genera"
          :key="genus"
          :value="genus"
        >
          {{ genus }}
        </option>
      </select>
    </div>

    <div class="flex items-center">
      <label
        class="flex-1 cursor-pointer"
        for="MonsterFilter_HabitatFilter"
      >
        Habitat
      </label>

      <select
        id="MonsterFilter_HabitatFilter"
        v-model="habitatFilter"
        class="w-32 text-sm px-2 py-1 rounded"
      >
        <option :value="null">All</option>

        <option
          v-for="habitat in habitats"
          :key="habitat"
          :value="habitat"
        >
          {{ habitat }}
        </option>
      </select>
    </div>

    <div
      v-if="showHatchableFilter"
      class="flex items-center"
    >
      <label
        class="flex-1 cursor-pointer"
        for="MonsterFilter_Hatchable"
      >
        Hatchable
      </label>

      <select
        id="MonsterFilter_Hatchable"
        v-model="hatchableFilter"
        class="w-32 text-sm px-2 py-1 rounded"
      >
        <option :value="null">All</option>
        <option :value="true">Yes</option>
        <option :value="false">No</option>
      </select>
    </div>

    <div class="self-end mt-1">
      <button
        class="w-32 px-2 py-1 text-sm font-semibold tracking-wide rounded bg-gray-400 border-gray-400 text-white
        hover:bg-gray-300 active:bg-gray-600"
        @click="reset"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import {
    monsters,
    getGenera,
    getHabitats,
    getMonstersByGenus,
    getMonstersByHabitat,
    getMonstersByHatchable,
  } from '~/services/data';

  export default {
    name: 'MonsterFilter',

    props: {
      monsters: {
        type: Array,
        required: false,
        default() {
          return monsters;
        },
      },

      initialSortKey: {
        type: String,
        required: false,
        default: null,
      },

      initialGenusFilter: {
        type: String,
        required: false,
        default: null,
      },

      initialHabitatFilter: {
        type: String,
        required: false,
        default: null,
      },

      initialHatchableFilter: {
        type: Boolean,
        required: false,
        default: null,
      },

      showHatchableFilter: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    data() {
      return {
        sortKey: this.initialSortKey,
        genusFilter: this.initialGenusFilter,
        habitatFilter: this.initialHabitatFilter,
        hatchableFilter: this.initialHatchableFilter,
      };
    },

    computed: {
      genera() {
        return getGenera(this.monsters);
      },

      habitats() {
        return getHabitats(this.monsters);
      },

      filteredMonsters() {
        let result = this.monsters;

        if (this.genusFilter != null) {
          result = getMonstersByGenus(this.genusFilter, result);
        }

        if (this.habitatFilter != null) {
          result = getMonstersByHabitat(this.habitatFilter, result);
        }

        if (this.hatchableFilter != null) {
          result = getMonstersByHatchable(this.hatchableFilter, result);
        }

        return result;
      },

      sortedMonsters() {
        let result = this.filteredMonsters;

        switch (this.sortKey) {
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

      groupedMonsters() {
        let result = this.sortedMonsters;

        switch (this.sortKey) {
          case 'genus':
            result = _.groupBy(result, 'genus');
            break;

          case 'habitat':
            result = _.groupBy(result, 'habitat');
            break;

          default:
            result = { all: result };
            break;
        }

        return result;
      },

      isEmpty() {
        return !this.sortedMonsters.length;
      },

      isGrouped() {
        return _.includes(['genus', 'habitat'], this.sortKey);
      },

      canReset() {
        return (
          this.sortKey !== this.initialSortKey &&
          this.genusFilter !== this.initialGenusFilter &&
          this.habitatFilter !== this.initialHabitatFilter
        );
      },
    },

    watch: {
      sortKey: 'update',
      genusFilter: 'update',
      habitatFilter: 'update',
      hatchableFilter: 'update',
    },

    created() {
      this.update();
    },

    methods: {
      update() {
        this.$emit('updated', {
          groupedMonsters: this.groupedMonsters,
          isEmpty: this.isEmpty,
          isGrouped: this.isGrouped,
          sortKey: this.sortKey,
          genusFilter: this.genusFilterl,
          habitatFilter: this.habitatFilter,
          hatchableFilter: this.hatchableFilter,
          canRest: this.canRest,
        });
      },

      reset() {
        this.sortKey = this.initialSortKey;
        this.genusFilter = this.initialGenusFilter;
        this.habitatFilter = this.initialHabitatFilter;
        this.hatchableFilter = this.initialHatchableFilter;
      },
    },
  };
</script>
