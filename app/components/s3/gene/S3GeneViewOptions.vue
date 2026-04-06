<script lang="ts" setup>
  import type { Mode, SortKey } from '~/stores/3/geneFilter';
  import type { SourcesStore } from '~/stores/3/geneSources';
  import useGeneFilter, { modes } from '~/stores/3/geneFilter';

  const props = withDefaults(
    defineProps<{
      sources?: SourcesStore;
      disabled?: boolean;
      hideSearch?: boolean;
      hideSort?: boolean;
      modalLayout?: boolean;
    }>(),
    {
      sources: undefined,
      disabled: false,
      hideSearch: false,
      hideSort: false,
      modalLayout: false,
    }
  );

  const filter = useGeneFilter();

  const variant = computed(() => {
    return props.modalLayout ? 'soft-filter-modal' : 'soft-filter';
  });

  const sortConfig = computed(() => {
    const result: {
      value: SortKey;
      label: string;
      default?: SortOrder;
      mode?: Mode;
    }[] = [
      { value: 'name', label: 'Name' },
      { value: 'element', label: 'Element', default: 'asc' },
      { value: 'type', label: 'Type', default: 'asc' },
      { value: 'size', label: 'Size', default: 'desc' },
      { value: 'stamina', label: 'Stamina', default: 'asc', mode: 'stats' },
      { value: 'power', label: 'Power', default: 'desc', mode: 'stats' },
      { value: 'wyvernfell', label: 'Wyvernfell', default: 'desc', mode: 'stats' },
    ];

    return result;
  });

  function setSortKey(value: SortKey) {
    if (value === filter.sortKey) {
      return;
    }

    const config = sortConfig.value.find((entry) => entry.value === value);

    filter.setSort(value, config?.default ?? 'asc');

    if (config?.mode && filter.autoSwitchModes.includes(config.mode)) {
      filter.$patch({ mode: config.mode });
    }
  }
</script>

<template>
  <div class="flex flex-col gap-3">
    <ClientOnly v-if="sources != null">
      <URadioGroup
        color="neutral"
        variant="table"
        orientation="horizontal"
        indicator="hidden"
        :ui="{ item: 'grow select-none' }"
        :modelValue="sources.current"
        :items="sources.items"
        @update:modelValue="sources.setCurrent($event)"
      />

      <template #fallback>
        <URadioGroup
          color="neutral"
          variant="table"
          orientation="horizontal"
          indicator="hidden"
          :ui="{ item: 'grow select-none' }"
          :modelValue="sources.items[0]?.value"
          :items="[sources.items[0]!]"
        />
      </template>
    </ClientOnly>

    <UFormField
      v-if="!hideSearch && filter != null"
      label="Name"
      orientation="horizontal"
      :data-modal-layout="modalLayout"
    >
      <AppInputSearch
        :modelValue="filter.nameFilter"
        :disabled="disabled"
        :modalLayout="modalLayout"
        @update:modelValue="filter.$patch({ nameFilter: $event })"
      />
    </UFormField>

    <UFormField
      v-if="modes != null"
      label="Show"
      orientation="horizontal"
      :data-modal-layout="modalLayout"
    >
      <USelect
        :modelValue="filter.mode"
        color="neutral"
        :variant="variant"
        :items="modes"
        class="w-full"
        :disabled="disabled"
        @update:modelValue="filter.$patch({ mode: $event })"
      />
    </UFormField>

    <UFormField
      v-if="!hideSort"
      label="Sort By"
      orientation="horizontal"
      :ui="{ container: 'flex gap-1' }"
      :data-modal-layout="modalLayout"
    >
      <USelect
        :modelValue="filter.sortKey"
        color="neutral"
        :variant="variant"
        :items="sortConfig"
        class="w-full truncate"
        :disabled="disabled"
        @update:modelValue="setSortKey"
      />
      <AppSortOrderToggle
        :modelValue="filter.sortOrder"
        :disabled="disabled"
        :modalLayout="modalLayout"
        @update:modelValue="filter.setSortOrder($event)"
      />
    </UFormField>
  </div>
</template>
