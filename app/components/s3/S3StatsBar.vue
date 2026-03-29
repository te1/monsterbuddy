<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      value?: number;
      label: string;
    }>(),
    {
      value: undefined,
    }
  );

  function getColor(n: number) {
    if (props.value != null && props.value >= n) {
      return 'bg-primary-600/75 dark:bg-primary-500/75';
    }
    return 'bg-neutral-500/25 dark:bg-neutral-400/25';
  }
</script>

<template>
  <div v-if="value != null" class="flex items-center gap-2">
    <span class="w-18" v-text="label" />

    <span class="flex flex-1 gap-0.5">
      <div v-for="n in 10" :key="n" class="h-4 flex-1" :class="getColor(n)" />
    </span>

    <span class="w-4 text-right font-semibold" v-text="value" />
  </div>
</template>
