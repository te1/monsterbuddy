<script lang="ts" setup>
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

  const emit = defineEmits<{
    remove: [];
  }>();

  const sortOrderIcon = computed(() => {
    switch (props.sortOrder) {
      case 'asc':
        return 'ph:arrow-up';
      case 'desc':
        return 'ph:arrow-down';
      default:
        return null;
    }
  });
</script>

<template>
  <NuxtLink :to="filterTarget" aria-label="Filter">
    <UBadge
      color="neutral"
      variant="soft-filter"
      :trailingIcon="sortOrderIcon"
      :label="caption"
      :class="['pr-1', showRemove ? '' : 'py-1.25']"
    >
      <template v-if="showRemove" #trailing>
        <UTooltip text="Remove filter">
          <UButton
            color="neutral"
            variant="soft"
            size="xs"
            icon="ph:x"
            class="p-0.25"
            @click.prevent="emit('remove')"
          />
        </UTooltip>
      </template>
    </UBadge>
  </NuxtLink>
</template>
