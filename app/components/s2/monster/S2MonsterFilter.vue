<script lang="ts" setup>
  import type { FilterKey, FilterStore, Mode } from '~/stores/2/base';

  const props = defineProps<{ store: FilterStore }>();

  const inputName = useTemplateRef('inputName');

  const genusItems = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      ...props.store.allGenera.map((genus) => ({
        label: genus,
        value: genus,
      })),
    ];
  });

  function setNameFilter(value: string) {
    props.store.$patch({ nameFilter: value });
  }

  function clearNameFilter() {
    props.store.$patch({ nameFilter: undefined });

    inputName.value?.inputRef?.focus();
  }

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
      <UInput
        ref="inputName"
        :modelValue="props.store.nameFilter"
        color="neutral"
        variant="soft2"
        icon="i-lucide-search"
        placeholder="Search..."
        :ui="{ trailing: 'pe-1' }"
        class="w-full"
        @update:model-value="setNameFilter"
      >
        <template v-if="props.store.nameFilter?.length" #trailing>
          <UTooltip text="Clear filter">
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              icon="i-lucide-x"
              aria-label="Clear filter"
              @click="clearNameFilter"
            />
          </UTooltip>
        </template>
      </UInput>
    </UFormField>

    <UFormField label="Genus" orientation="horizontal">
      <USelect
        :modelValue="props.store.genusFilter ?? 'ALL'"
        color="neutral"
        variant="soft2"
        :items="genusItems"
        class="w-full"
        @update:model-value="setGenusFilter"
      />
    </UFormField>
  </div>
</template>
