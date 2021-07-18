<template>
  <div>
    <div class="flex items-center">
      <div class="flex-1">
        Sort by
      </div>

      <select v-model="sortKey">
        <option value="no">Number</option>
        <option value="name">Name</option>
        <option value="genus">Genus</option>
        <option value="habitat">Habitat</option>
      </select>
    </div>

    <div class="flex items-center">
      <div class="flex-1">
        Filter by
      </div>

      <select v-model="genusFilter">
        <option :value="null">
          All genera
        </option>

        <option
          v-for="genus in genera"
          :key="genus"
          :value="genus"
        >
          {{ genus }}
        </option>
      </select>

      <select v-model="habitatFilter">
        <option :value="null">
          All habitats
        </option>

        <option
          v-for="habitat in habitats"
          :key="habitat"
          :value="habitat"
        >
          {{ habitat }}
        </option>
      </select>
    </div>

    <button @click="reset">Reset</button>
  </div>
</template>

<script>
  import _ from 'lodash';
  import {
    monsters,
    getGenera,
    getHabitats,
    getMonstiesByGenus,
    getMonstiesByHabitat,
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
    },

    data() {
      return {
        sortKey: this.initialSortKey,
        genusFilter: this.initialGenusFilter,
        habitatFilter: this.initialHabitatFilter,
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
          result = getMonstiesByGenus(this.genusFilter, result);
        }

        if (this.habitatFilter != null) {
          result = getMonstiesByHabitat(this.habitatFilter, result);
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
    },

    watch: {
      sortKey: 'update',
      genusFilter: 'update',
      habitatFilter: 'update',
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
        });
      },

      reset() {
        this.sortKey = 'no';
        this.genusFilter = null;
        this.habitatFilter = null;
      },
    },
  };
</script>
