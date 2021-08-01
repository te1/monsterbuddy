<template>
  <img
    :src="imageUrl"
    :alt="caption"
    :title="caption"
    width="30"
    height="30"
  >
</template>

<script>
  import { formatElement } from '~/services/utils';

  export default {
    name: 'ElementIcon',

    props: {
      element: {
        type: String,
        required: false,
        default: null,
      },
    },

    computed: {
      imageUrl() {
        try {
          return require(`~/assets/icons/element-${this.element}.svg`);
        } catch (e) {
          return require('~/assets/icons/type-unknown.svg');
        }
      },

      caption() {
        return formatElement(this.element);
      },
    },
  };
</script>
