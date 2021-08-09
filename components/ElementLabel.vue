<template>
  <span
    :class="classes"
    v-text="caption"
  />
</template>

<script>
  import { formatElement } from '~/services/utils';

  export default {
    name: 'ElementLabel',

    props: {
      element: {
        type: String,
        required: false,
        default: null,
      },

      justText: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    computed: {
      caption() {
        return formatElement(this.element);
      },

      classes() {
        if (this.justText) {
          return null;
        }
        return 'dark:brightness-150';
      },
    },
  };
</script>
