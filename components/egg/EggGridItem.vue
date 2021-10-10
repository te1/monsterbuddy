<template>
  <div class="flex flex-col items-center h-[150px]">
    <EggImage
      class="w-[120px] h-[120px] -mx-3"
      :monster="monster"
      :genus="genus"
    />

    <div
      class="mb-2 font-semibold whitespace-nowrap"
      v-text="text"
    />
  </div>
</template>

<script>
  export default {
    name: 'EggGridItem',

    props: {
      monster: {
        type: Object,
        required: false,
        default: null,
      },

      genus: {
        type: String,
        required: false,
        default: null,
      },
    },

    computed: {
      text() {
        if (this.genus) {
          return this.genus;
        }
        return this.monster.name;
      },
    },
  };
</script>
