<template>
  <NuxtLink :to="filterTarget">
    <span class="flex items-center cursor-pointer select-none rounded-full hover:transition-opacity hover:duration-300 active:transition-opacity active:duration-300 bg-white ring-2 ring-gray-300 active:opacity-75 dark:bg-cool-800 dark:ring-cool-700">
      <span
        class="pl-2.5 pr-0.5 text-sm"
        v-text="caption"
      />

      <span
        class="w-5 h-5 m-0.5 text-xs flex items-center justify-center rounded-full hover:transition-colors hover:duration-300 active:transition-colors active:duration-300 bg-gray-300 text-gray-600 hover:text-gray-900 dark:bg-cool-700 dark:text-cool-400 dark:hover:text-cool-100"
        title="Remove filter"
        @click.prevent="$emit('remove')"
      >
        <FaIcon :icon="['fas', 'times']" />
      </span>
    </span>
  </NuxtLink>
</template>

<script>
  export default {
    name: 'AppFilterPill',

    props: {
      caption: {
        type: String,
        required: true,
      },

      filterTarget: {
        type: String,
        required: true,
      },
    },
  };
</script>
