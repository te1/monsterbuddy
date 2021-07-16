<template>
  <div class="relative">
    <img
      :src="require(`~/assets/monster-icons/${monster.name}.png`)"
      :alt="monster.name"
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
      formattedNo() {
        return formatNo(this.monster.no, false);
      },
    },
  };
</script>
