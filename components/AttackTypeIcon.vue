<template>
  <img
    :src="imageUrl"
    :alt="caption"
    :title="caption"
    width="60"
    height="60"
  >
</template>

<script>
  import _ from 'lodash';

  export default {
    name: 'AttackTypeIcon',

    props: {
      type: {
        type: String,
        required: true,
      },
    },

    computed: {
      imageUrl() {
        try {
          return require(`~/assets/icons/${this.type}.svg`);
        } catch (e) {
          return require('~/assets/icons/unknown-type.svg');
        }
      },

      caption() {
        return _.upperFirst(this.type);
      },
    },
  };
</script>
