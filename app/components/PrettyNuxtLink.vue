<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      /** no color */
      plain?: boolean;
    }>(),
    {
      plain: false,
    }
  );

  const classes = computed(() => [
    'hover:underline',
    // 'visited:hover:underline',
    ...(props.plain
      ? []
      : [
          'transition-colors duration-300',
          'text-primary-600 dark:text-primary-500',
          'active:text-primary-400 active:dark:text-neutral-400',
          // 'visited:active:text-primary-400 visited:active:dark:text-neutral-400',
          'visited:text-primary-800 visited:dark:text-primary-400',
        ]),
  ]);
</script>

<template>
  <NuxtLink v-bind="$attrs" :class="classes">
    <slot />
  </NuxtLink>
</template>
