<script lang="ts" setup>
  withDefaults(
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
</script>

<template>
  <a
    v-bind="$attrs"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-1"
  >
    <span
      :class="[
        'transition-all duration-300',
        'border-b border-transparent hover:border-[currentColor]',
        'focus-visible:outline-primary',
        { ['text-primary active:opacity-80']: !plain },
      ]"
    >
      <slot />
    </span>

    <UIcon
      v-if="!bare"
      name="i-lucide-external-link"
      class="size-3.5 shrink-0 opacity-70"
      aria-hidden
    />
  </a>
</template>
