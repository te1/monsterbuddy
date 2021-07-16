<template>
  <div class="flex items-center cursor-pointer bg-white rounded shadow border border-gray-300
    hover:bg-blue-50 hover:border-blue-200
    active:bg-blue-100 active:border-blue-300">
    <img
      :src="require(`~/assets/eggs/${monster.name}.svg`)"
      :alt="monster.name"
      class="h-[110px] my-2"
    >

    <div class="flex-1 self-start1 mx-4 my-2 flex flex-col text-gray-600 font-semibold tracking-wide">
      <div class="text-gray-400 leading-none">
        {{ formattedNo }}
      </div>

      <div class="text-black text-xl">
        {{ monster.name }}
      </div>

      <div>
        {{ monster.genus }}
      </div>

      <div>
        {{ monster.habitat }}
      </div>
    </div>

    <MonsterImage
      class="h-[110px] m-2"
      :monster="monster"
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
