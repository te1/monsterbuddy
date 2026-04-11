<script lang="ts" setup>
  defineProps<{
    text?: string;
    tooltip: string;
  }>();

  const open = ref(false);
</script>

<template>
  <UTooltip
    v-model:open="open"
    :text="tooltip"
    :ui="{
      content: 'h-fit max-w-[95dvw] text-base sm:text-sm lg:text-xs',
      text: 'whitespace-normal',
    }"
  >
    <span
      class="underline decoration-neutral-600 decoration-dotted underline-offset-4 dark:decoration-neutral-400"
      @click="open = !open"
    >
      <slot>
        {{ text }}
      </slot>
    </span>
  </UTooltip>
</template>
