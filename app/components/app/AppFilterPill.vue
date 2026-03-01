<script lang="ts" setup>
  import type { SortOrder } from '~/stores/2/base'; // TODO move up

  const props = withDefaults(
    defineProps<{
      caption: string;
      filterTarget: string;
      showRemove?: boolean;
      sortOrder?: SortOrder;
    }>(),
    {
      showRemove: false,
      sortOrder: undefined,
    }
  );

  defineEmits<{
    remove: [];
  }>();

  const sortOrderIcon = computed(() => {
    switch (props.sortOrder) {
      case 'asc':
        return 'i-lucide-move-up';
      case 'desc':
        return 'i-lucide-move-down';
      default:
        return null;
    }
  });

  const captionClass = computed(() => {
    if (props.showRemove) {
      return 'pr-0.5';
    }

    if (sortOrderIcon.value != null) {
      return 'pr-1';
    }

    return 'pr-2.5';
  });
</script>

<template>
  <NuxtLink :to="filterTarget">
    <span
      class="transition-opacity-slow-interactive flex cursor-pointer items-center rounded-full bg-white ring-2 ring-neutral-300 select-none active:opacity-75 dark:bg-neutral-800 dark:ring-neutral-700"
    >
      <div class="my-0.5 h-5 pl-2.5 text-sm" :class="captionClass" v-text="caption" />

      <div
        v-if="showRemove"
        class="transition-colors-slow-interactive m-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-300 text-xs text-neutral-600 hover:text-neutral-900 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100"
        title="Remove filter"
        @click.prevent="$emit('remove')"
      >
        <UIcon name="i-lucide-x" />
      </div>

      <div v-if="sortOrderIcon" class="flex items-center pr-2 text-base">
        <UIcon :name="sortOrderIcon" />
      </div>
    </span>
  </NuxtLink>
</template>
