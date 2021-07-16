<template>
  <div>
    <h2>Eggs</h2>

    <div>
      <EggCard
        v-for="monstie in monsties"
        :key="monstie.no"
        :monster="monstie"
      />
    </div>
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
