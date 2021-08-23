<template>
  <NuxtLink :to="filterTarget">
    <span class="flex items-center cursor-pointer select-none rounded-full hover:transition-opacity hover:duration-300 active:transition-opacity active:duration-300 bg-white ring-2 ring-gray-300 active:opacity-75 dark:bg-cool-800 dark:ring-cool-700">
      <div
        class="h-5 my-0.5 pl-2.5 text-sm"
        :class="captionClass"
        v-text="caption"
      />

      <div
        v-if="showRemove"
        class="w-5 h-5 m-0.5 text-xs flex items-center justify-center rounded-full hover:transition-colors hover:duration-300 active:transition-colors active:duration-300 bg-gray-300 text-gray-600 hover:text-gray-900 dark:bg-cool-700 dark:text-cool-400 dark:hover:text-cool-100"
        title="Remove filter"
        @click.prevent="$emit('remove')"
      >
        <FaIcon :icon="['fas', 'times']" />
      </div>

      <div
        v-if="sortOrderIcon"
        class="pr-2 text-base flex items-center"
      >
        <FaIcon
          :icon="sortOrderIcon"
          :fixedWidth="false"
        />
      </div>
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

      showRemove: {
        type: Boolean,
        required: false,
        default: false,
      },

      sortOrder: {
        type: String,
        required: false,
        default: null,
      },
    },

    computed: {
      captionClass() {
        if (this.showRemove) {
          return 'pr-0.5';
        } else if (this.sortOrderIcon != null) {
          return 'pr-1';
        } else {
          return 'pr-2.5';
        }
      },
      sortOrderIcon() {
        switch (this.sortOrder) {
          case 'asc':
            return ['fas', 'long-arrow-alt-up'];

          case 'desc':
            return ['fas', 'long-arrow-alt-down'];

          default:
            return null;
        }
      },
    },
  };
</script>
