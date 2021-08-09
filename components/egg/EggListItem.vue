<template>
  <div class="flex items-center h-[122px]">
    <EggImage
      class="w-[120px] h-[120px] -mx-3 flex-shrink-0"
      :monster="monster"
    />

    <div class="mt-3 ml-3 text-sm whitespace-nowrap self-start">
      <div
        class="leading-tight text-gray-500  dark:text-cool-400"
        v-text="info"
      />
      <div
        class="text-base font-semibold leading-snug"
        v-text="monster.name"
      />
      <div v-text="monster.genus" />
      <div v-text="monster.habitat" />
      <div v-text="location" />
    </div>

    <MonsterImage
      class="w-full h-full p-2 object-contain object-right"
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
    },
  };
</script>
