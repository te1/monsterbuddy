<template>
  <div class="flex items-center py-1 cursor-pointer bg-white rounded shadow border border-gray-300
    hover:bg-blue-50 hover:border-blue-200
    active:bg-blue-100 active:border-blue-300">
    <MonsterIcon
      class="mx-2"
      :monster="monster"
      showHatchable
    />

    <div class="flex-1 min-w-[130px] ml-1 text-sm text-gray-700 font-semibold tracking-wide">
      <div class="text-gray-500 -mb-1">
        {{ formattedNo }}
      </div>

      <div class="mb-1.5 text-black text-base">
        {{ monster.name }}
      </div>

      <div class="flex items-center mb-1">
        <IconGenus class="text-gray-400" />

        <div class="ml-1">
          {{ monster.genus }}
        </div>
      </div>

      <div class="flex items-center">
        <IconHabitat class="text-gray-400" />

        <div class="ml-1">
          {{ monster.habitat }}
        </div>
      </div>
    </div>

    <div class="mr-1">
      <MonsterImage
        class="max-h-[120px] w-auto"
        :monster="monster"
        hideFallback
      />
    </div>
  </div>
</template>

<script>
  import { formatNo } from '~/services/utils';

  export default {
    name: 'MonsterCard',

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

      formattedNo() {
        return formatNo(this.monster.no);
      },
    },
  };
</script>
