<template>
  <main class="space-y-3">
    <section class="box px-4 py-3 flex flex-col space-y-3">
      <h3 class="text-lg font-semibold -mb-2">
        Sort
      </h3>

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
          class="input w-[180px] px-2 py-1"
        >
          <option value="no">Number</option>
          <option value="name">Name</option>
          <option value="genus">Genus</option>
          <option value="habitat">Habitat</option>
        </select>
      </div>
    </section>

    <section class="box px-4 py-3 flex flex-col space-y-3">
      <h3 class="text-lg font-semibold -mb-2">
        Filter
      </h3>

      <div
        v-if="false"
        class="flex items-center"
      >
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
          class="input w-[180px] px-2 py-1"
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
          class="input w-[180px] px-2 py-1"
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
          class="input w-[180px] px-2 py-1"
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
          class="input w-[180px] px-2 py-1"
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
          class="input w-[180px] px-2 py-1"
        >
          <option :value="null">All</option>

          <option
            v-for="element in allElements"
            :key="element"
            :value="element"
            v-text="formatElement(element)"
          />
        </select>
      </div>

      <div
        v-if="showRidingActionFilter"
        class="flex items-center"
      >
        <label
          class="flex-1 cursor-pointer"
          for="MonsterFilter_RidingActionFilter"
        >
          Riding Action
        </label>

        <select
          id="MonsterFilter_RidingActionFilter"
          v-model="store.ridingActionFilter"
          class="input w-[180px] px-2 py-1"
        >
          <option :value="null">All</option>

          <option
            v-for="ridingAction in store.allRidingActions"
            :key="ridingAction"
            :value="ridingAction"
          >
            {{ ridingAction }}
          </option>
        </select>
      </div>

      <div
        v-if="showHatchableFilter"
        class="flex items-center select-none"
        @click="updateFilter('hatchableFilter')"
      >
        <label class="flex-1 cursor-pointer">
          Hatchable
        </label>

        <AppFilterSwitch
          v-model="store.hatchableFilter"
          class="w-[180px]"
          :texts="['Include', 'Only Hatchable', 'Exclude']"
        />
      </div>

      <div
        v-if="showDeviantsFilter"
        class="flex items-center select-none"
        @click="updateFilter('deviantsFilter')"
      >
        <label class="flex-1 cursor-pointer">
          Deviants
        </label>

        <AppFilterSwitch
          v-model="store.deviantsFilter"
          class="w-[180px]"
          :texts="['Include', 'Only Deviants', 'Exclude']"
        />
      </div>
    </section>

    <section class="box px-4 py-3 flex flex-col space-y-3">
      <h3 class="text-lg font-semibold -mb-2">
        Results
      </h3>

      <div class="flex items-center">
        <span class="flex-1">
          Results
        </span>

        <span
          class="w-[180px]"
          v-text="store.resultCount"
        />
      </div>

      <div class="flex gap-2 justify-center">
        <div class="w-[100px] px-2 py-1 text-center font-semibold rounded border-transparent text-gray-800 active:text-gray-300 bg-brand-500 hover:bg-brand-400 active:bg-gray-500">
          Apply
        </div>

        <div
          class="w-[100px] px-2 py-1 text-center font-semibold rounded border-transparent text-gray-800 active:text-gray-300 bg-brand-500 hover:bg-brand-400 active:bg-gray-500"
          @click="store.reset"
        >
          Reset
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  import { formatAttackType, formatElement, allElements } from '~/services/utils';

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

      showRidingActionFilter: {
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
        allElements,
      };
    },

    computed: {
      store() {
        return this.useFilterStore();
      },
    },

    methods: {
      formatAttackType,
      formatElement,

      updateFilter(key) {
        let value = this.store[key];

        switch (value) {
          case null:
            value = true;
            break;

          case true:
            value = false;
            break;

          case false:
            value = null;
            break;
        }

        this.store[key] = value;
      },
    },
  };
</script>
