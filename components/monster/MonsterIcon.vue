<template>
  <div>
    <div class="w-full h-full flex items-center justify-center">
      <div class="relative w-[75px] h-[75px]">
        <img
          :src="imageUrl"
          :alt="monster.name"
          :title="monster.name"
          width="75"
          height="75"
        >

        <div
          v-if="showNo"
          class="absolute bottom-[1px] w-full text-center text-lg text-white font-semibold tracking-wide"
          style="text-shadow: 0 0 6px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;"
        >
          {{ formattedNo }}
        </div>

        <img
          v-if="showHatchable && monster.hatchable"
          :src="require('~/assets/icons/hatchable.svg')"
          :alt="monster.name"
          width="25"
          height="25"
          class="absolute top-0 right-[-2px] w-1/3 h-1/3"
        >
      </div>
    </div>
  </div>
</template>

<script>
  import { formatNo } from '~/services/utils';

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
        return formatNo(this.monster.no, false);
      },
    },
  };
</script>
