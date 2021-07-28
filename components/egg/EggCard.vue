<template>
  <div class="flex items-center h-[122px]">
    <EggImage
      class="w-[120px] h-[120px] -mx-3"
      :monster="monster"
    />

    <div class="ml-3 text-sm whitespace-nowrap">
      <div
        class="text-gray-500 -mb-0.5"
        v-text="info"
      />
      <div
        class="text-base font-semibold"
        v-text="monster.name"
      />
      <div v-text="monster.genus" />
      <div v-text="monster.habitat" />
      <div v-text="attackType" />
    </div>

    <MonsterImage
      class="w-auto h-full ml-auto object-contain overflow-hidden"
      :monster="monster"
    />
  </div>
</template>

<script>
  import { formatMonsterInfo, formatAttackType } from '~/services/utils';

  export default {
    name: 'EggCard',

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

      attackType() {
        return formatAttackType(this.monster);
      },
    },
  };
</script>
