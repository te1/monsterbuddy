<script lang="ts" setup>
  defineProps<{
    text: string;
    tooltip: string;
  }>();

  const open = ref(false);
</script>

<template>
  <UTooltip
    v-model:open="open"
    :text="tooltip"
    :ui="{ content: 'h-fit max-w-[95dvw]', text: 'whitespace-normal' }"
  >
    <span
      class="underline decoration-neutral-600 decoration-dotted underline-offset-4 dark:decoration-neutral-400"
      @click="open = !open"
      v-text="text"
    />
  </UTooltip>
</template>
