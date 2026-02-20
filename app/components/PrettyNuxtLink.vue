<script lang="ts" setup>
  withDefaults(
    defineProps<{
      /** no color */
      plain?: boolean;
    }>(),
    {
      plain: false,
    }
  );
</script>

<template>
  <NuxtLink
    v-bind="$attrs"
    :class="[
      'transition-all duration-300',
      'border-b border-transparent hover:border-[currentColor]',
      'focus-visible:outline-primary',
      { ['text-primary active:opacity-80']: !plain },
    ]"
  >
    <slot />
  </NuxtLink>
</template>
