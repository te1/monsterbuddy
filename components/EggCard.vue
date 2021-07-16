<template>
  <div class="flex justify-between items-center bg-gray-200 rounded-xl m-2">
    <img
      :src="require(`~/assets/eggs/${monster.name}.svg`)"
      :alt="monster.name"
      class="h-24 my-1"
    >

    <div class="flex-1 self-start1 m-2 flex flex-col">
      <div class="text-2xl font-semibold tracking-wide">
        <!-- {{ formattedNo }} -->
        {{ monster.name }}
      </div>

      <div>
        {{ monster.genus }}
      </div>

      <div>
        {{ monster.habitat }}
      </div>
    </div>

    <img
      width=100
      :src="imgUrl"
      :alt="monster.name"
    >

    <MonsterIcon
      :monster="monster"
      showNo
    />
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
    },

    computed: {
      formattedNo() {
        return formatNo(this.monster.no);
      },

      imgUrl() {
        try {
          return require(`~/assets/monsters/${this.monster.name}.png`);
        } catch (e) {
          return null;
        }
      },
    },
  };
</script>
