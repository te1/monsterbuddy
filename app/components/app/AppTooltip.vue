<script lang="ts" setup>
  import type { TooltipProps } from '@nuxt/ui';

  const props = defineProps<{
    text?: string;
    tooltip?: string;
    content?: TooltipProps['content'];
  }>();

  const open = ref(false);

  function toggle() {
    if (props.tooltip == null) {
      return;
    }
    open.value = !open.value;
  }
</script>

<template>
  <UTooltip
    v-model:open="open"
    :text="tooltip"
    :content="content"
    :ui="{
      content: 'h-fit max-w-[95dvw] text-base sm:text-sm lg:text-xs',
      text: 'whitespace-normal',
    }"
  >
    <span
      class="decoration-neutral-600 decoration-dotted underline-offset-4 dark:decoration-neutral-400"
      :class="{ underline: !!tooltip }"
      @click="toggle"
    >
      <slot>
        {{ text }}
      </slot>
    </span>
  </UTooltip>
</template>
