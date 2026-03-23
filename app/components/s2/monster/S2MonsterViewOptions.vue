<script lang="ts" setup>
  import type { DisplaysStore } from '~/stores/baseDisplays';
  import type { FilterStore, Mode, Modes, SortKey } from '~/stores/2/baseMonsterFilter';
  import type { SourcesStore } from '~/stores/2/baseMonsterSources';

  const props = withDefaults(
    defineProps<{
      displays?: DisplaysStore;
      filter?: FilterStore;
      sources?: SourcesStore;
      modes?: Modes;
      disabled?: boolean;
      hideSearch?: boolean;
      hideSort?: boolean;
      showSortByStats?: boolean;
      modalLayout?: boolean;
    }>(),
    {
      displays: undefined,
      filter: undefined,
      sources: undefined,
      modes: undefined,
      disabled: false,
      hideSearch: false,
      hideSort: false,
      showSortByStats: false,
      modalLayout: false,
    }
  );

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
      { value: 'no', label: 'Number' },
      { value: 'name', label: 'Name' },
      { value: 'rarity', label: 'Rarity', default: 'desc', mode: 'rarity' },
      { value: 'genus', label: 'Genus', mode: 'location' },
      { value: 'habitat', label: 'Habitat', mode: 'location' },
    ];

    if (props.showSortByStats) {
      result.push(
        {
          value: 'monstie.stats.base.maxHp',
          label: 'Max HP',
          default: 'desc',
          mode: 'stats',
        },
        {
          value: 'monstie.stats.base.speed',
          label: 'Speed',
          default: 'desc',
          mode: 'stats',
        },
        {
          value: 'monstie.stats.base.critRate',
          label: 'Crit Rate',
          default: 'desc',
          mode: 'stats',
        },
        {
          value: 'monstie.stats.bestAttack.value',
          label: 'Best Attack',
          default: 'desc',
          mode: 'stats',
        },
        {
          value: 'monstie.stats.bestDefense.value',
          label: 'Best Defense',
          default: 'desc',
          mode: 'stats',
        },
        {
          value: 'monstie.stats.worstDefense.value',
          label: 'Worst Defense',
          default: 'desc',
          mode: 'stats',
        }
      );
    }

    return result;
  });

  function setSortKey(value: SortKey) {
    if (value === props.filter?.sortKey) {
      return;
    }

    const config = sortConfig.value.find((config) => config.value === value);

    props.filter?.setSort(value, config?.default ?? 'asc');

    if (
      config?.mode &&
      props.filter?.mode !== 'compact' &&
      props.filter?.autoSwitchModes.includes(config.mode)
    ) {
      props.filter?.$patch({ mode: config.mode });
    }
  }
</script>

<template>
  <div class="flex flex-col gap-3">
    <URadioGroup
      v-if="displays != null"
      color="neutral"
      variant="table"
      orientation="horizontal"
      indicator="hidden"
      :ui="{ item: 'grow select-none' }"
      :modelValue="displays.current"
      :items="displays.items"
      @update:modelValue="displays.setCurrent($event)"
    />

    <ClientOnly v-if="sources != null">
      <URadioGroup
        color="neutral"
        variant="table"
        orientation="horizontal"
        indicator="hidden"
        :ui="{ item: 'grow select-none' }"
        :modelValue="sources.current"
        :items="sources.items"
        @update:modelValue="sources.setCurrent($event, filter)"
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
      v-if="filter != null && modes != null"
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
      v-if="!hideSort && filter != null"
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
