<template>
  <div>
    <div class="w-full h-full flex items-center justify-center">
      <div class="relative w-[60px] h-[60px]">
        <img
          :src="imageUrl"
          :alt="monster.name"
          :title="monster.name"
          width="60"
          height="60"
        >

        <div class="absolute bottom-0 flex items-center justify-between w-full pointer-events-none select-none">
          <div
            v-if="showNo"
            class="pl-1 text-lg text-white font-semibold tracking-wide"
            style="text-shadow: 0 0 6px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;"
          >
            {{ formattedNo }}
          </div>

          <img
            v-if="showHatchable && monster.hatchable"
            :src="require('~/assets/icons/hatchable.svg')"
            :alt="monster.name"
            width="20"
            height="20"
            class="w-1/3 h-1/3"
          >

          <AttackTypeIcon
            v-if="showAttackType"
            :monster="monster"
            width="20"
            height="20"
            class="w-1/3 h-1/3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatMonsterNo } from '~/services/utils';

  export default {
    name: 'MonsterIcon',

    props: {
      monster: {
        type: Object,
        required: true,
      },

      showNo: {
        type: Boolean,
        required: false,
        default: false,
      },

      showHatchable: {
        type: Boolean,
        required: false,
        default: false,
      },

      showAttackType: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    computed: {
      imageUrl() {
        try {
          return require(`~/assets/monster-icons/${this.monster.name}.png`);
        } catch (e) {
          return require('~/assets/monster-icons/_Unknown.png');
        }
      },

      formattedNo() {
        return formatMonsterNo(this.monster.no, false);
      },
    },
  };
</script>
