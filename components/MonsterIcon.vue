<template>
  <div class="relative">
    <img
      :src="imageUrl"
      :alt="monster.name"
      width="100"
      height="100"
    >

    <div
      v-if="showNo"
      class="absolute -bottom-2 w-full text-center text-lg text-white font-bold"
      style="text-shadow: 0 0 6px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;"
    >
      {{ formattedNo }}
    </div>

    <img
      v-if="showHatchable && monster.hatchable"
      :src="require('~/assets/icons/hatchable.svg')"
      :alt="monster.name"
      class="absolute -bottom-2 right-1 w-1/4 h-1/4"
    >
  </div>
</template>

<script>
  import { formatNo } from '../services/utils';

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
