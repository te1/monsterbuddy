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

    <div class="ml-3 text-sm whitespace-nowrap">
      <div
        class="leading-tight text-gray-500 dark:text-cool-400"
        v-text="info"
      />
      <div
        class="text-base font-semibold leading-snug"
        v-text="monster.name"
      />
      <div v-text="monster.genus" />
      <div v-text="monster.habitat" />
      <div
        :class="{ 'opacity-0': !hasLocation }"
        v-text="location"
      />
    </div>

    <MonsterImage
      class="w-auto h-full ml-auto object-contain overflow-hidden"
      :monster="monster"
      hideFallback
    />
  </div>
</template>

<script>
  import {
    formatMonsterInfo,
    formatMonsterPrimaryLocation,
  } from '~/services/utils';

  export default {
    name: 'MonsterListItem',

    props: {
      monster: {
        type: Object,
        required: true,
      },
    },

    computed: {
      info() {
        return formatMonsterInfo(this.monster);
      },

      location() {
        return formatMonsterPrimaryLocation(this.monster);
      },

      hasLocation() {
        return this.location !== '-';
      },
    },
  };
</script>
