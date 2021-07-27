<template>
  <div class="flex items-center h-[122px]">
    <MonsterIcon
      class="w-[60px] h-[120px] ml-1"
      :monster="monster"
      showHatchable
    />

    <div class="flex-1 min-w-[135px] ml-3 text-sm">
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
      <div
        :class="{ 'opacity-0': !monster.hatchable }"
        v-text="attackType"
      />
    </div>

    <MonsterImage
      class="w-auto h-full object-contain overflow-hidden"
      :monster="monster"
      hideFallback
    />
  </div>
</template>

<script>
  import { formatMonsterInfo, formatAttackType } from '~/services/utils';

  export default {
    name: 'MonsterCard',

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
        if (!this.monster.hatchable) {
          return '-';
        }
        return formatAttackType(this.monster);
      },
    },
  };
</script>
