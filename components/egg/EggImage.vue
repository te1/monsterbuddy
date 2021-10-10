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
      imageUrl() {
        try {
          if (this.genus) {
            return require(`~/assets/eggs/_${this.genus}.svg`);
          }
          return require(`~/assets/eggs/${this.monster.name}.svg`);
        } catch (e) {
          return require('~/assets/eggs/_Unknown.svg');
        }
      },

      imageAlt() {
        if (this.genus) {
          return `${this.genus} egg`;
        }
        return `${this.monster.name} egg`;
      },
    },
  };
</script>
