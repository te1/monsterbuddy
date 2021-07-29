<template>
  <div class="flex items-center h-[122px]">
    <MonsterIcon
      class="w-[120px] h-[120px] -mx-3"
      :monster="monster"
      showHatchable
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
      <AttackTypeLabel
        :class="{ 'opacity-0': !monster.hatchable }"
        :monster="monster"
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
  import { formatMonsterInfo } from '~/services/utils';

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
    },
  };
</script>
