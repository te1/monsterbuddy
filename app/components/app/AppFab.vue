<script lang="ts" setup>
  withDefaults(
    defineProps<{
      tooltip?: string;
      icon?: string;
    }>(),
    {
      tooltip: undefined,
      icon: undefined,
    }
  );

  const emit = defineEmits<{
    click: [];
  }>();
</script>

<template>
  <UTooltip :text="tooltip">
    <UButton
      color="neutral"
      variant="fab"
      size="xl"
      :ui="{ leadingIcon: 'size-9' }"
      :icon="icon"
      @click="emit('click')"
    />
  </UTooltip>
</template>
