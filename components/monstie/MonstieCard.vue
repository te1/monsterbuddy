<template>
  <div class="flex items-center h-[122px]">
    <div class="w-[120px] h-[120px] -mx-3 flex flex-col gap-1 items-center justify-center">
      <MonsterIcon :monster="monster" />

      <AttackTypeIcon
        class="w-10 h-10"
        :monster="monster"
      />
    </div>

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
      <div v-text="attackType" />
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
    name: 'MonstieCard',

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
