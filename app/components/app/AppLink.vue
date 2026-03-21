<script lang="ts" setup>
  withDefaults(
    defineProps<{
      text?: string;
      /** no color */
      plain?: boolean;
      /** no external link icon */
      bare?: boolean;
    }>(),
    {
      text: undefined,
      plain: false,
      bare: false,
    }
  );
</script>

<template>
  <a
    v-bind="$attrs"
    target="_blank"
    rel="noopener noreferrer"
    :class="[
      'transition-all',
      'border-b border-transparent hover:border-[currentColor]',
      'focus-visible:outline-primary',
      { ['text-primary active:opacity-80']: !plain },
    ]"
  >
    <template v-if="text">{{ text }}</template>
    <slot v-else />
  </a>

  <UIcon
    v-if="!bare"
    name="ph:arrow-up-right"
    class="ml-0.5 size-3.5 shrink-0 opacity-70"
    aria-hidden
  />
</template>
