<script lang="ts" setup>
  import type { DisplayStore } from '~/stores/2/baseMonsterDisplay';
  import type { FilterStore, Mode, SortKey } from '~/stores/2/baseMonsterFilter';

  export type Modes = { value: Mode; label: string }[];

  const props = withDefaults(
    defineProps<{
      filter: FilterStore;
      display: DisplayStore;
      modes: Modes;
      showSortByStats?: boolean;
    }>(),
    {
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
    if (value === props.filter.sortKey) {
      return;
    }

    const config = sortConfig.value.find((config) => config.value === value);

    props.filter.setSort(value, config?.default ?? 'asc');

    if (
      config?.mode &&
      props.filter.mode !== 'compact' &&
      props.filter.autoSwitchModes.includes(config.mode)
    ) {
      props.filter.$patch({ mode: config.mode });
    }
  }
</script>

<template>
  <div class="flex flex-col gap-3">
    <UFormField label="Name" orientation="horizontal">
      <AppInputSearch
        :modelValue="props.filter.nameFilter"
        @update:modelValue="props.filter.$patch({ nameFilter: $event })"
      />
    </UFormField>

    <UFormField label="List" orientation="horizontal">
      <div class="flex flex-col gap-1">
        <ClientOnly>
          <UButton
            v-for="item in display.items"
            :key="item.value"
            color="neutral"
            :variant="display.current === item.value ? 'subtle2' : 'soft2'"
            :label="item.label"
            class="w-full"
            :ui="{ base: 'font-normal' }"
            @click="display.setCurrent(item.value, props.filter)"
          />

          <template #fallback>
            <UButton
              color="neutral"
              variant="soft2"
              :label="display.items[0]?.label"
              class="w-full"
              :ui="{ base: 'font-normal' }"
            />
          </template>
        </ClientOnly>
      </div>
    </UFormField>

    <UFormField label="Show" orientation="horizontal">
      <USelect
        :modelValue="props.filter.mode"
        color="neutral"
        variant="soft2"
        :items="modes"
        class="w-full"
        @update:modelValue="props.filter.$patch({ mode: $event })"
      />
    </UFormField>

    <UFormField label="Sort By" orientation="horizontal" :ui="{ container: 'flex flex-col gap-1' }">
      <USelect
        :modelValue="props.filter.sortKey"
        color="neutral"
        variant="soft2"
        :items="sortConfig"
        class="w-full"
        @update:modelValue="setSortKey"
      />
      <AppSortOrderToggle
        :modelValue="props.filter.sortOrder"
        @update:modelValue="props.filter.setSortOrder($event)"
      />
    </UFormField>
  </div>
</template>
