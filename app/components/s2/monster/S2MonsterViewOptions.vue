<script lang="ts" setup>
  import type { DisplaysStore } from '~/stores/2/baseDisplays';
  import type { FilterStore, Mode, SortKey } from '~/stores/2/baseMonsterFilter';
  import type { SourcesStore } from '~/stores/2/baseMonsterSources';

  export type Modes = { value: Mode; label: string }[];

  const props = withDefaults(
    defineProps<{
      displays?: DisplaysStore;
      filter?: FilterStore;
      sources?: SourcesStore;
      modes?: Modes;
      hideSort?: boolean;
      showSortByStats?: boolean;
    }>(),
    {
      displays: undefined,
      filter: undefined,
      sources: undefined,
      modes: undefined,
      hideSort: false,
      showSortByStats: false,
    }
  );

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
      :ui="{ item: 'grow' }"
      :modelValue="displays.current"
      :items="displays.items"
      @update:modelValue="displays.setCurrent($event)"
    />

    <UFormField v-if="filter != null" label="Name" orientation="horizontal">
      <AppInputSearch
        :modelValue="filter.nameFilter"
        @update:modelValue="filter.$patch({ nameFilter: $event })"
      />
    </UFormField>

    <UFormField v-if="sources != null" label="List" orientation="horizontal">
      <div class="flex flex-col gap-1">
        <ClientOnly>
          <UButton
            v-for="item in sources.items"
            :key="item.value"
            color="neutral"
            :variant="sources.current === item.value ? 'subtle2' : 'soft2'"
            :label="item.label"
            class="w-full"
            :ui="{ base: 'font-normal' }"
            @click="sources.setCurrent(item.value, filter)"
          />

          <template #fallback>
            <UButton
              color="neutral"
              variant="soft2"
              :label="sources.items[0]?.label"
              class="w-full"
              :ui="{ base: 'font-normal' }"
            />
          </template>
        </ClientOnly>
      </div>
    </UFormField>

    <UFormField v-if="filter != null && modes != null" label="Show" orientation="horizontal">
      <USelect
        :modelValue="filter.mode"
        color="neutral"
        variant="soft2"
        :items="modes"
        class="w-full"
        @update:modelValue="filter.$patch({ mode: $event })"
      />
    </UFormField>

    <UFormField
      v-if="!hideSort && filter != null"
      label="Sort By"
      orientation="horizontal"
      :ui="{ container: 'flex flex-col gap-1' }"
    >
      <USelect
        :modelValue="filter.sortKey"
        color="neutral"
        variant="soft2"
        :items="sortConfig"
        class="w-full"
        @update:modelValue="setSortKey"
      />
      <AppSortOrderToggle
        :modelValue="filter.sortOrder"
        @update:modelValue="filter.setSortOrder($event)"
      />
    </UFormField>
  </div>
</template>
