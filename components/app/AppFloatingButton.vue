<template>
  <div class="relative">
    <div
      class="fixed bottom-16 right-0 z-20 w-12 h-12 scale-125"
      :class="classes"
    />

    <button
      type="button"
      class="fixed bottom-16 right-0 z-20 flex items-center justify-center w-12 h-12 rounded-l-md border border-r-0 drop-shadow-md text-2xl bg-brand-500 text-white dark:text-cool-200 border-white dark:border-cool-200 opacity-75 hover:opacity-100 active:bg-brand-600 cursor-pointer transition-opacity-slow transition-colors-slow"
      :class="classes"
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

      secondary: {
        type: Boolean,
        required: false,
        default: false,
      },

      tertiary: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    computed: {
      classes() {
        if (this.secondary) {
          return ['mb-16'];
        } else if (this.tertiary) {
          return ['mb-32'];
        }
        return null;
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
