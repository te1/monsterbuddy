<template>
  <div class="box flex flex-col items-center py-4 space-y-4">
    <span class="text-2xl font-semibold text-gray-500 dark:text-cool-300">
      <slot>
        No results found
      </slot>
    </span>

    <FaIcon
      class="!w-16 !h-16 text-gray-400 dark:text-cool-400"
      :icon="['far', 'sad-cry']"
    />

    <AppTextButton
      class="w-[160px]"
      @click="store.resetFilter"
    >
      Reset filter
    </AppTextButton>
  </div>
</template>

<script>
  export default {
    name: 'MonsterNoResults',

    inject: ['useFilterStore'],

    computed: {
      store() {
        return this.useFilterStore();
      },
    },
  };
</script>
