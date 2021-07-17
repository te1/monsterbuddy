<template>
  <div class="flex items-center cursor-pointer bg-white rounded shadow border border-gray-300
    hover:bg-blue-50 hover:border-blue-200
    active:bg-blue-100 active:border-blue-300">
    <img
      :src="require(`~/assets/eggs/${monster.name}.svg`)"
      :alt="monster.name"
      class="h-[120px] -mx-2 my-2"
    >

    <div class="h-full flex-1 min-w-[160px] ml-2 py-3 flex flex-col text-gray-600 font-semibold tracking-wide">
      <div class="text-gray-400 leading-tight">
        {{ formattedNo }}
      </div>

      <div class="flex-1 text-black text-xl">
        {{ monster.name }}
      </div>

      <div class="flex items-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
          />
        </svg>

        <div class="ml-1">
          {{ monster.genus }}
        </div>
      </div>

      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clip-rule="evenodd"
          />
        </svg>

        <div class="ml-1">
          {{ monster.habitat }}
        </div>
      </div>
    </div>

    <MonsterImage
      class="h-[120px] mr-1 my-2 overflow-hidden"
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
    },
  };
</script>
