<script lang="ts" setup>
  withDefaults(
    defineProps<{
      text?: string;
      /** no color */
      plain?: boolean;
    }>(),
    {
      text: undefined,
      plain: false,
    }
  );
</script>

<template>
  <NuxtLink
    v-bind="$attrs"
    :class="[
      'transition-all',
      'border-b border-transparent hover:border-[currentColor]',
      'focus-visible:outline-primary',
      { ['text-primary active:opacity-80']: !plain },
    ]"
  >
    <template v-if="text">{{ text }}</template>
    <slot v-else />
  </NuxtLink>
</template>
