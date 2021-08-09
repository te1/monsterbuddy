<template>
  <div class="flex flex-col items-center">
    <EggImage
      class="w-[120px] h-[120px] -mx-3"
      :monster="monster"
    />

    <div
      class="mb-2 font-semibold whitespace-nowrap"
      v-text="monster.name"
    />
  </div>
</template>

<script>
  export default {
    name: 'EggGridItem',

    props: {
      monster: {
        type: Object,
        required: true,
      },
    },
  };
</script>
