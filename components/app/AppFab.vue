<template>
  <div class="relative">
    <div
      class="fixed bottom-16 right-4 z-10 flex items-center justify-center w-12 h-12 rounded-full drop-shadow-md text-2xl cursor-pointer bg-brand-500 text-white dark:text-cool-200"
      :title="title"
      @click="$emit('click')"
    >
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppFab',

    props: {
      title: {
        type: String,
        required: false,
        default: null,
      },
    },
  };
</script>
