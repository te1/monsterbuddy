<script lang="ts" setup>
  import { filterStoreKey } from '~/stores/3/baseMonsterFilter';

  const filterStore = inject(filterStoreKey);
</script>

<template>
  <div class="box flex flex-col items-center gap-6 py-6">
    <span class="text-2xl font-medium">
      <slot>No results found</slot>
    </span>

    <UIcon class="h-16 w-16 text-dimmed" name="ph:smiley-sad-light" />

    <!-- TODO increase contrast -->
    <UButton
      color="neutral"
      variant="soft"
      class="w-32"
      trailingIcon="ph:arrow-counter-clockwise"
      label="Reset filter"
      :ui="{ base: 'justify-between font-normal', trailingIcon: 'text-dimmed' }"
      @click="filterStore?.resetFilter"
    />
  </div>
</template>
