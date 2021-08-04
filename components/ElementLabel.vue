<template>
  <span
    class="dark:brightness-150"
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
    },

    computed: {
      caption() {
        return formatElement(this.element);
      },
    },
  };
</script>
