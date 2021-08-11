<template>
  <div class="relative">
    <button
      type="button"
      class="fixed bottom-16 right-4 z-10 flex items-center justify-center w-12 h-12 rounded-full drop-shadow-md text-2xl cursor-pointer transition-colors bg-brand-500 text-white dark:text-cool-200 hover:bg-brand-600 active:bg-gray-500 dark:active:bg-cool-500"
      :title="title"
      @click="$emit('click')"
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
  };
</script>
