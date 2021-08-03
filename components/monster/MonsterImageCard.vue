<template>
  <section class="flex justify-around">
    <MonsterImage
      class="overflow-hidden"
      :monster="monster"
    />
  </section>
</template>

<script>
  export default {
    name: 'MonsterImageCard',

    props: {
      monster: {
        type: Object,
        required: true,
      },
    },
  };
</script>
