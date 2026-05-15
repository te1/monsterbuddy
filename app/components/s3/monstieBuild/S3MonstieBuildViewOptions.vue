<script lang="ts" setup>
  import type { SourcesStore } from '~/stores/3/monstieBuildSources';
  import type { SortKey } from '~/stores/3/monstieBuildFilter';
  import useMonstieBuildFilter from '~/stores/3/monstieBuildFilter';

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

  const filter = useMonstieBuildFilter();

  const variant = computed(() => {
    return props.modalLayout ? 'soft-filter-modal' : 'soft-filter';
  });

  const sortConfig: {
    value: SortKey;
    label: string;
    default?: SortOrder;
  }[] = [
    { value: 'name', label: 'Name' },
    { value: 'monstie', label: 'Monstie', default: 'asc' },
    { value: 'monstieElement', label: 'Element', default: 'asc' },
    { value: 'monstieAttackType', label: 'Type', default: 'asc' },
  ];

  function setSortKey(value: SortKey) {
    if (value === filter.sortKey) {
      return;
    }

    const config = sortConfig.find((entry) => entry.value === value);

    filter.setSort(value, config?.default ?? 'asc');
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
          :items="[sources.items[0] ?? { value: 'default', label: 'All' }]"
        />
      </template>
    </ClientOnly>

    <UFormField
      v-if="!hideSearch"
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
