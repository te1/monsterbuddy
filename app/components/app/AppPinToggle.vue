<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      pinned: boolean;
      subject?: string;
    }>(),
    {
      subject: undefined,
    }
  );

  const emit = defineEmits<{
    (e: 'toggle', pinned: boolean): void;
  }>();

  const title = computed(() => {
    if (props.subject) {
      if (props.pinned) {
        return `Remove ${props.subject} bookmark`;
      }
      return `Bookmark ${props.subject}`;
    }

    if (props.pinned) {
      return 'Remove bookmark';
    }
    return 'Bookmark';
  });

  function togglePin() {
    emit('toggle', !props.pinned);
  }
</script>

<template>
  <ClientOnly>
    <UTooltip :text="title">
      <UButton
        :color="pinned ? 'primary' : 'neutral'"
        variant="link"
        icon="i-lucide-bookmark"
        @click="togglePin"
      />
    </UTooltip>
  </ClientOnly>
</template>
