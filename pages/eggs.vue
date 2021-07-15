<template>
  <div>
    <h2>Eggs</h2>
    <ul>
      <li
        v-for="monstie in monsties"
        :key="monstie.no"
      >
        {{ monstie.no}}
        {{ monstie.name }}
        <img
          :src="require(`~/assets/images/monster-icons/${monstie.name}.png`)"
          :alt="monstie.name"
        >
        <img
          :src="require(`~/assets/images/eggs/${monstie.name}.svg`)"
          :alt="monstie.name"
        >
      </li>
    </ul>
  </div>
</template>

<script>
  import { monsties, habitats, genera } from '~/services/data';

  export default {
    data() {
      return {
        monsties,
        habitats,
        genera,
      };
    },
  };
</script>
