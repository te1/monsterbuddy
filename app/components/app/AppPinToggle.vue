<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      subject?: string;
    }>(),
    {
      subject: undefined,
    }
  );

  const pinned = defineModel<boolean>({
    required: true,
  });

  const title = computed(() => {
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
  <ClientOnly>
    <UTooltip :text="title">
      <UButton
        :color="pinned ? 'primary' : 'neutral'"
        variant="link"
        icon="i-lucide-bookmark"
        @click="pinned = !pinned"
      />
    </UTooltip>
  </ClientOnly>
</template>
