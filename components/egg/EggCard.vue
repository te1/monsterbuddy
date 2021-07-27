<template>
  <div class="flex items-center h-[122px]">
    <EggImage
      class="w-[120px] h-auto -mx-3"
      :monster="monster"
    />

    <div class="flex-1 min-w-[145px] ml-3 text-sm">
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
      eggImageUrl() {
        try {
          return require(`~/assets/eggs/${this.monster.name}.svg`);
        } catch (e) {
          return require('~/assets/eggs/_Unknown.svg');
        }
      },

      info() {
        return formatMonsterInfo(this.monster);
      },

      attackType() {
        return formatAttackType(this.monster);
      },
    },
  };
</script>
