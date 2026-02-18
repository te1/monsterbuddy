<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      /** no color */
      plain?: boolean;
      /** no external link icon */
      bare?: boolean;
    }>(),
    {
      plain: false,
      bare: false,
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
  <a
    v-bind="$attrs"
    target="_blank"
    rel="noopener noreferrer"
    :class="['inline-flex items-center gap-1']"
  >
    <span :class="classes">
      <slot />
    </span>

    <UIcon
      v-if="!props.bare"
      name="i-lucide-external-link"
      class="size-3.5 shrink-0 opacity-70"
      aria-hidden
    />
  </a>
</template>
