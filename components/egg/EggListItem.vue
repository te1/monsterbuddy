<template>
  <div class="flex items-center h-[122px]">
    <EggImage
      class="w-[120px] h-[120px] -mx-3"
      :monster="monster"
    />

    <div class="ml-3 text-sm whitespace-nowrap">
      <div
        class="text-gray-500 leading-tight"
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
    />
  </div>
</template>

<script>
  import {
    formatMonsterInfo,
    formatMonsterPrimaryLocation,
  } from '~/services/utils';

  export default {
    name: 'EggListItem',

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
