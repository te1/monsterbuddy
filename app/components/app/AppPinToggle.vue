<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      subject?: string;
      noLabel?: boolean;
    }>(),
    {
      subject: undefined,
      noLabel: false,
    }
  );

  const pinned = defineModel<boolean>({
    required: true,
  });

  const tooltip = computed(() => {
    if (props.subject) {
      if (pinned.value) {
        return `Remove ${props.subject} bookmark`;
      }
      return `Bookmark ${props.subject}`;
    }

    if (pinned.value) {
      return 'Remove bookmark';
    }
    return 'Bookmark';
  });

  const label = computed(() => {
    if (props.subject) {
      if (pinned.value) {
        return `Remove ${props.subject} bookmark`;
      }
      return `Bookmark ${props.subject}`;
    }

    if (pinned.value) {
      return 'Remove bookmark';
    }
    return 'Bookmark';
  });
</script>

<template>
  <UTooltip v-if="noLabel" :text="tooltip">
    <UButton
      :color="pinned ? 'primary' : 'neutral'"
      variant="link"
      :icon="pinned ? 'ph:bookmark-simple-fill' : 'ph:bookmark-simple'"
      @click="pinned = !pinned"
    />
  </UTooltip>

  <UButton
    v-else
    color="neutral"
    variant="link"
    :label="label"
    :icon="pinned ? 'ph:bookmark-simple-fill' : 'ph:bookmark-simple'"
    :ui="{ base: 'px-0 font-normal' }"
    @click="pinned = !pinned"
  />
</template>
