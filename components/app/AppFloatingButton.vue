<template>
  <div class="relative">
    <div class="fixed bottom-16 right-4 z-20 w-12 h-12 scale-125" />

    <button
      type="button"
      class="fixed bottom-16 right-4 z-20 flex items-center justify-center w-12 h-12 pl-px pt-px rounded-full drop-shadow-md text-2xl cursor-pointer transition-colors-slow bg-brand-500 text-white dark:text-cool-200 hover:bg-brand-600 active:bg-gray-500 dark:active:bg-cool-500"
      :title="title"
      @click="onClick"
    >
      <slot />
    </button>
  </div>
</template>

<script>
  export default {
    name: 'AppFloatingButton',

    props: {
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
