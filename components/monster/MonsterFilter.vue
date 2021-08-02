<template>
  <div class="box flex flex-col px-2 py-2 space-y-1">
    <div class="flex items-center">
      <label
        class="flex-1 cursor-pointer"
        for="MonsterFilter_SortKey"
      >
        Sorting
      </label>

      <select
        id="MonsterFilter_SortKey"
        v-model="store.sortKey"
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
        v-model="store.nameFilter"
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
        v-model="store.genusFilter"
        class="w-[150px] px-2 py-1 rounded focus:ring-brand-500 focus:border-brand-500"
      >
        <option :value="null">All</option>

        <option
          v-for="genus in store.allGenera"
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
        v-model="store.habitatFilter"
        class="w-[150px] px-2 py-1 rounded focus:ring-brand-500 focus:border-brand-500"
      >
        <option :value="null">All</option>

        <option
          v-for="habitat in store.allHabitats"
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
        v-model="store.attackTypeFilter"
        class="w-[150px] px-2 py-1 rounded focus:ring-brand-500 focus:border-brand-500"
      >
        <option :value="null">All</option>

        <option
          v-for="type in ['power', 'speed', 'technical']"
          :key="type"
          :value="type"
          v-text="formatAttackType(type)"
        />
      </select>
    </div>

    <div
      v-if="showAttackElementFilter"
      class="flex items-center"
    >
      <label
        class="flex-1 cursor-pointer"
        for="MonsterFilter_AttackElementFilter"
      >
        Attack element
      </label>

      <select
        id="MonsterFilter_AttackElementFilter"
        v-model="store.attackElementFilter"
        class="w-[150px] px-2 py-1 rounded focus:ring-brand-500 focus:border-brand-500"
      >
        <option :value="null">All</option>

        <option
          v-for="element in ['none', 'fire', 'water', 'thunder', 'ice', 'dragon']"
          :key="element"
          :value="element"
          v-text="formatElement(element)"
        />
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
        v-model="store.hatchableFilter"
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
        v-model="store.deviantsFilter"
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
        v-text="store.resultCount"
      />
    </div>

    <div class="self-end">
      <div
        class="w-[150px] px-2 py-1 font-semibold rounded border-transparent text-gray-800 active:text-gray-300 bg-brand-500 hover:bg-brand-400 active:bg-gray-500"
        @click="store.reset"
      >
        Reset
      </div>
    </div>
  </div>
</template>

<script>
  import { formatAttackType, formatElement } from '~/services/utils';

  export default {
    name: 'MonsterFilter',

    inject: ['useFilterStore'],

    props: {
      showAttackTypeFilter: {
        type: Boolean,
        required: false,
        default: false,
      },

      showAttackElementFilter: {
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

    computed: {
      store() {
        return this.useFilterStore();
      },
    },

    methods: {
      formatAttackType,
      formatElement,
    },
  };
</script>
