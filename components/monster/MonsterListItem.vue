<template>
  <div class="flex items-center h-[122px]">
    <div class="w-[120px] h-[120px] -mx-3 flex-shrink-0 flex flex-col gap-2 items-center justify-center">
      <MonsterIcon :monster="monster" />

      <img
        v-if="monster.hatchable"
        :src="require('~/assets/icons/hatchable.svg')"
        alt="Hatchable"
        title="Hatchable"
        width="20"
        height="20"
        class="w-8 h-8"
      >
    </div>

    <div class="w-full mt-3 ml-3 text-sm whitespace-nowrap self-start">
      <div
        class="leading-tight text-gray-500 dark:text-cool-400"
        v-text="info"
      />
      <div
        class="text-base font-semibold leading-snug"
        v-text="monster.name"
      />

      <template v-if="showLocation || showRarity">
        <div v-text="monster.genus" />
        <div v-text="monster.habitat" />

        <div
          v-if="showLocation && location"
          v-text="location"
        />

        <div v-if="showRarity">
          Rarity <span
            class="font-bold"
            v-text="monster.rarity"
          />
        </div>
      </template>

      <template v-if="showCombat">
        <div
          v-for="(attackType, phase) in monster.monster.attackPatterns"
          :key="phase"
        >
          {{ formatPhase(phase) }}:

          <AttackTypeLabel
            class="font-semibold"
            :type="attackType"
          />
        </div>
      </template>
    </div>

    <MonsterImage
      class="w-full h-full p-2 object-contain object-right overflow-hidden"
      style="flex-basis: 250px;"
      :monster="monster"
      hideFallback
    />
  </div>
</template>

<script>
  import _ from 'lodash';
  import {
    formatMonsterInfo,
    formatMonsterPrimaryLocation,
    formatPhase,
  } from '~/services/utils';

  export default {
    name: 'MonsterListItem',

    props: {
      monster: {
        type: Object,
        required: true,
      },

      mode: {
        type: String,
        required: false,
        default: 'location',
      },
    },

    computed: {
      info() {
        return formatMonsterInfo(this.monster);
      },

      location() {
        return formatMonsterPrimaryLocation(this.monster);
      },

      showLocation() {
        return _.includes(['location'], this.mode);
      },

      showCombat() {
        return _.includes(['combat'], this.mode);
      },

      showRarity() {
        return _.includes(['rarity'], this.mode);
      },
    },

    methods: {
      formatPhase,
    },
  };
</script>
