<script lang="ts" setup>
  import type { FilterKey, FilterStore, Mode } from '~/stores/2/base';

  const props = defineProps<{ store: FilterStore }>();

  const genusItems = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      ...props.store.allGenera.map((genus) => ({
        label: genus,
        value: genus,
      })),
    ];
  });

  function setGenusFilter(value: string) {
    setFilter('genusFilter', value, 'location');
  }

  function setFilter<T>(filterKey: FilterKey, value: T, mode?: Mode) {
    if (value === props.store[filterKey]) {
      return;
    }

    props.store.$patch({
      [filterKey]: value === 'ALL' ? undefined : value,
      mode:
        value != null &&
        mode != null &&
        props.store.mode !== 'compact' &&
        props.store.autoSwitchModes.includes(mode)
          ? mode
          : props.store.mode,
    });
  }
</script>

<template>
  <div class="flex flex-col gap-1">
    <UFormField label="Name" orientation="horizontal">
      <AppInputSearch
        :modelValue="props.store.nameFilter"
        @update:modelValue="store.$patch({ nameFilter: $event })"
      />
    </UFormField>

    <UFormField label="Genus" orientation="horizontal">
      <USelect
        :modelValue="props.store.genusFilter ?? 'ALL'"
        color="neutral"
        variant="soft2"
        :items="genusItems"
        class="w-full"
        @update:modelValue="setGenusFilter"
      />
    </UFormField>
  </div>
</template>
