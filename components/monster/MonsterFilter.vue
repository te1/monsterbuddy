<template>
  <div class="flex flex-col px-2 py-2 space-y-1 rounded shadow bg-white">
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
        class="w-[150px] px-2 py-1 rounded focus:ring-brand-500 focus:border-brand-500"
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
        for="MonsterFilter_NameFilter"
      >
        Name
      </label>

      <input
        id="MonsterFilter_NameFilter"
        v-model="nameFilter"
        type="text"
        class="w-[150px] px-2 py-1 rounded focus:ring-brand-500 focus:border-brand-500"
      >
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
        class="w-[150px] px-2 py-1 rounded focus:ring-brand-500 focus:border-brand-500"
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
        class="w-[150px] px-2 py-1 rounded focus:ring-brand-500 focus:border-brand-500"
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
      v-if="showAttackTypeFilter"
      class="flex items-center"
    >
      <label
        class="flex-1 cursor-pointer"
        for="MonsterFilter_AttackTypeFilter"
      >
        Attack type
      </label>

      <select
        id="MonsterFilter_AttackTypeFilter"
        v-model="attackTypeFilter"
        class="w-[150px] px-2 py-1 rounded focus:ring-brand-500 focus:border-brand-500"
      >
        <option :value="null">All</option>

        <option value="power">Power</option>
        <option value="speed">Speed</option>
        <option value="technical">Technical</option>
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
        class="w-[150px] px-2 py-1 rounded focus:ring-brand-500 focus:border-brand-500"
      >
        <option :value="null">All</option>
        <option :value="true">Yes</option>
        <option :value="false">No</option>
      </select>
    </div>

    <div
      v-if="showDeviantsFilter"
      class="flex items-center"
    >
      <label
        class="flex-1 cursor-pointer"
        for="MonsterFilter_Deviants"
      >
        Deviants
      </label>

      <select
        id="MonsterFilter_Deviants"
        v-model="deviantsFilter"
        class="w-[150px] px-2 py-1 rounded focus:ring-brand-500 focus:border-brand-500"
      >
        <option :value="null">Include</option>
        <option :value="false">Exclude</option>
        <option :value="true">Only Deviants</option>
      </select>
    </div>

    <div class="flex items-center">
      <span class="flex-1">
        Results
      </span>

      <span
        class="w-[150px]"
        v-text="resultCount"
      />
    </div>

    <div class="self-end">
      <button
        class="w-[150px] px-2 py-1 font-semibold rounded border-transparent text-gray-800 active:text-gray-300 bg-brand-500 hover:bg-brand-400 active:bg-gray-500"
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
    getMonstersByName,
    getMonstersByGenus,
    getMonstersByHabitat,
    getMonstiesByAttackType,
    getMonstersByHatchable,
    getMonstersByIsDeviant,
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

      initialNameFilter: {
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

      initialAttackTypeFilter: {
        type: String,
        required: false,
        default: null,
      },

      initialHatchableFilter: {
        type: Boolean,
        required: false,
        default: null,
      },

      initialDeviantsFilter: {
        type: Boolean,
        required: false,
        default: null,
      },

      showAttackTypeFilter: {
        type: Boolean,
        required: false,
        default: false,
      },

      showHatchableFilter: {
        type: Boolean,
        required: false,
        default: false,
      },

      showDeviantsFilter: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    data() {
      return {
        sortKey: this.initialSortKey,
        nameFilter: this.initialNameFilter,
        genusFilter: this.initialGenusFilter,
        habitatFilter: this.initialHabitatFilter,
        attackTypeFilter: this.initialAttackTypeFilter,
        hatchableFilter: this.initialHatchableFilter,
        deviantsFilter: this.initialDeviantsFilter,
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

        if (this.nameFilter != null) {
          result = getMonstersByName(this.nameFilter, result);
        }

        if (this.genusFilter != null) {
          result = getMonstersByGenus(this.genusFilter, result);
        }

        if (this.habitatFilter != null) {
          result = getMonstersByHabitat(this.habitatFilter, result);
        }

        if (this.attackTypeFilter != null) {
          result = getMonstiesByAttackType(this.attackTypeFilter, result);
        }

        if (this.hatchableFilter != null) {
          result = getMonstersByHatchable(this.hatchableFilter, result);
        }

        if (this.deviantsFilter != null) {
          result = getMonstersByIsDeviant(this.deviantsFilter, result);
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

      resultCount() {
        return this.sortedMonsters.length;
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
          this.nameFilter !== this.initialNameFilter &&
          this.genusFilter !== this.initialGenusFilter &&
          this.habitatFilter !== this.initialHabitatFilter &&
          this.attackTypeFilter !== this.initialAttackTypeFilter &&
          this.hatchableFilter !== this.initilHatchableTypeFilter &&
          this.deviantsFilter !== this.initialDeviantsFilter
        );
      },
    },

    watch: {
      sortKey: 'update',
      nameFilter: 'update',
      genusFilter: 'update',
      habitatFilter: 'update',
      attackTypeFilter: 'update',
      hatchableFilter: 'update',
      deviantsFilter: 'update',
    },

    created() {
      this.update();
    },

    methods: {
      update() {
        this.$emit('updated', {
          groupedMonsters: this.groupedMonsters,
          resultCount: this.resultCount,
          isEmpty: this.isEmpty,
          isGrouped: this.isGrouped,
          sortKey: this.sortKey,
          nameFilter: this.genusFilter,
          genusFilter: this.genusFilter,
          habitatFilter: this.habitatFilter,
          attackTypeFilter: this.attackTypeFilter,
          hatchableFilter: this.hatchableFilter,
          deviantsFilter: this.deviantsFilter,
          canReset: this.canReset,
        });
      },

      reset() {
        this.sortKey = this.initialSortKey;
        this.nameFilter = this.initialNameFilter;
        this.genusFilter = this.initialGenusFilter;
        this.habitatFilter = this.initialHabitatFilter;
        this.attackTypeFilter = this.initialAttackTypeFilter;
        this.hatchableFilter = this.initialHatchableFilter;
        this.deviantsFilter = this.initialDeviantsFilter;
      },
    },
  };
</script>
