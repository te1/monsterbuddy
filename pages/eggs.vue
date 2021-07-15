<template>
  <div>
    <h2>Eggs</h2>
    <ul>
      <li
        v-for="monstie in monsties"
        :key="monstie.no"
        class="flex justify-between items-center"
      >
        <div>
          {{ formatNo(monstie.no) }}
        </div>

        <div>
          {{ monstie.name }}
        </div>

        <img
          :src="require(`~/assets/images/monster-icons/${monstie.name}.png`)"
          :alt="monstie.name"
        >

        <img
          :src="require(`~/assets/images/eggs/${monstie.name}.svg`)"
          :alt="monstie.name"
          class="w-32 h-32"
        >
      </li>
    </ul>
  </div>
</template>

<script>
  import _ from 'lodash';
  import { monsties, habitats, genera } from '~/services/data';

  export default {
    data() {
      return {
        monsties,
        habitats,
        genera,
      };
    },

    methods: {
      formatNo(no) {
        return '#' + _.padStart(no, 3, '0');
      },
    },
  };
</script>
