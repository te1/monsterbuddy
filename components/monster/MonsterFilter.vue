<template>
  <div class="space-y-3">
    <section class="box px-4 py-3 flex flex-col space-y-3">
      <h3 class="text-lg font-semibold -mb-2">
        Sort
      </h3>

      <AppSortToggle
        v-for="item in sortConfig"
        :key="item.sortKey"
        :value="item.value"
        :caption="item.caption"
        :sortKey.sync="store.sortKey"
        :sortOrder.sync="store.sortOrder"
        :defaultSortOrder="item.default"
      />
    </section>

    <section class="box px-4 py-3 flex flex-col space-y-3">
      <h3 class="text-lg font-semibold -mb-2">
        Filter
      </h3>

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
          class="input w-[180px] px-2 py-1"
          placeholder="Search"
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
        class="py-1 flex items-center select-none"
        @click="updateFilter('hatchableFilter')"
      >
        <label class="flex-1 cursor-pointer">
          Hatchable
        </label>

        <AppFilterToggle
          v-model="store.hatchableFilter"
          class="w-[180px]"
          :texts="['Include', 'Only Hatchable', 'Exclude']"
        />
      </div>

      <div
        v-if="showDeviantsFilter"
        class="py-1 flex items-center select-none"
        @click="updateFilter('deviantsFilter')"
      >
        <label class="flex-1 cursor-pointer">
          Deviants
        </label>

        <AppFilterToggle
          v-model="store.deviantsFilter"
          class="w-[180px]"
          :texts="['Include', 'Only Deviants', 'Exclude']"
        />
      </div>
    </section>

    <section class="box px-4 py-2 flex items-center">
      <h3 class="flex-1 text-lg font-semibold">
        Results
      </h3>

      <span
        class="w-[180px]"
        v-text="store.resultCount"
      />
    </section>
  </div>
</template>

<script>
  import { formatAttackType, formatElement, allElements } from '~/services/utils';

  export default {
    name: 'MonsterFilter',

    inject: ['useFilterStore'],

    props: {
      showSortByStats: {
        type: Boolean,
        require: false,
        default: false,
      },

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

      sortConfig() {
        let result = [
          { value: 'no', caption: 'Number' },
          { value: 'name', caption: 'Name' },
          { value: 'genus', caption: 'Genus' },
          { value: 'habitat', caption: 'Habitat' },
        ];

        if (this.showSortByStats) {
          result.push(
            {
              value: 'monstie.stats.base.maxHp',
              caption: 'Max HP',
              default: 'desc',
            },
            {
              value: 'monstie.stats.base.speed',
              caption: 'Speed',
              default: 'desc',
            },
            {
              value: 'monstie.stats.base.critRate',
              caption: 'Crit Rate',
              default: 'desc',
            },
            {
              value: 'monstie.stats.bestAttack.value',
              caption: 'Best Attack',
              default: 'desc',
            },
            {
              value: 'monstie.stats.bestDefense.value',
              caption: 'Best Defense',
              default: 'desc',
            },
            {
              value: 'monstie.stats.worstDefense.value',
              caption: 'Worst Defense',
              default: 'desc',
            }
          );
        }

        return result;
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
