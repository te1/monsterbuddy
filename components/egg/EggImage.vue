<template>
  <img
    :src="imageUrl"
    :alt="imageAlt"
    :title="imageAlt"
    width="120"
    height="120"
  >
</template>

<script>
  export default {
    name: 'EggImage',

    props: {
      monster: {
        type: Object,
        required: true,
      },
    },

    computed: {
      imageUrl() {
        try {
          return require(`~/assets/eggs/${this.monster.name}.svg`);
        } catch (e) {
          return require('~/assets/eggs/_Unknown.svg');
        }
      },

      imageAlt() {
        return `${this.monster.name} egg`;
      },
    },
  };
</script>
