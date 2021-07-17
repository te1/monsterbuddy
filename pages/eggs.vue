<template>
  <div>
    <h2 class="mb-2 text-lg text-gray-700 font-semibold tracking-wide">
      Eggs
    </h2>

    <div class="grid gap-2 lg:grid-cols-2 2xl:grid-cols-3">
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
