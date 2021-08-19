<template>
  <button
    type="button"
    class="cursor-pointer transition-colors hover:text-black dark:hover:text-white active:text-gray-500 dark:active:text-cool-400"
    :title="title"
    @click="onClick"
  >
    <slot>
      <FaIcon :icon="icon" />
    </slot>
  </button>
</template>

<script>
  export default {
    name: 'AppIconButton',

    props: {
      icon: {
        type: Array,
        required: false,
        default: null,
      },

      title: {
        type: String,
        required: false,
        default: null,
      },
    },

    methods: {
      onClick() {
        this.$emit('click');

        if (document.activeElement) {
          // blur to disable active/focus styles
          document.activeElement.blur();
        }
      },
    },
  };
</script>
