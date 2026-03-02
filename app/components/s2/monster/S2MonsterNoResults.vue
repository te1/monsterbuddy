<script lang="ts" setup>
  import { filterStoreKey } from '~/stores/2/base';

  const filterStore = inject(filterStoreKey);
</script>

<template>
  <!-- TODO CSS -->

  <div class="box flex flex-col items-center space-y-4 py-4">
    <span class="text-2xl font-semibold text-neutral-500 dark:text-neutral-300">
      <slot>No results found</slot>
    </span>

    <UIcon class="h-16! w-16! text-neutral-400 dark:text-neutral-400" name="i-lucide-frown" />

    <UButton color="neutral" variant="soft" class="w-[160px]" @click="filterStore?.resetFilter">
      Reset filter
    </UButton>
  </div>
</template>
