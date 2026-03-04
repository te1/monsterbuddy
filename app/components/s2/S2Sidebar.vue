<script lang="ts" setup>
  import type { FilterKey, FilterStore, Mode, SortKey } from '~/stores/2/base';

  export type Modes = {
    value: Mode;
    label: string;
  }[];

  const props = withDefaults(
    defineProps<{
      store: FilterStore;
      modes: Modes;
      showSortByStats?: boolean;
    }>(),
    {
      showSortByStats: false,
    }
  );

  const inputName = useTemplateRef('inputName');

  const items = [{ label: 'View' }]; // TODO move to template

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

  const genusItems = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      ...props.store.allGenera.map((genus) => ({
        label: genus,
        value: genus,
      })),
    ];
  });

  function setMode(value: Mode) {
    props.store.$patch({ mode: value });
  }

  function setNameFilter(value: string) {
    props.store.$patch({ nameFilter: value });
  }

  function clearNameFilter() {
    props.store.$patch({ nameFilter: undefined });

    inputName.value?.inputRef?.focus();
  }

  function setSortKey(value: SortKey) {
    if (value === props.store.sortKey) {
      return;
    }

    const config = sortConfig.value.find((config) => config.value === value);

    props.store.$patch({
      sortKey: value,
      sortOrder: config?.default ?? 'asc',
      mode:
        config?.mode &&
        props.store.mode !== 'compact' &&
        props.store.autoSwitchModes.includes(config.mode)
          ? config.mode
          : props.store.mode,
    });
  }

  function setSortOrder(value: SortOrder) {
    props.store.$patch({ sortOrder: value });
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
  <UTabs
    color="neutral"
    variant="link"
    :items="items"
    :ui="{ list: 'gap-4', trigger: 'px-0 py-0', content: 'xl:mt- mt-1' }"
  >
    <template #content>
      <div class="flex flex-col gap-1 px-1">
        <UFormField label="Info" orientation="horizontal">
          <USelect
            :modelValue="props.store.mode"
            color="neutral"
            variant="soft2"
            :items="modes"
            class="w-full"
            @update:model-value="setMode"
          />
        </UFormField>

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

        <UFormField label="Sort By" orientation="horizontal">
          <USelect
            :modelValue="props.store.sortKey"
            color="neutral"
            variant="soft2"
            :items="sortConfig"
            class="w-full"
            @update:model-value="setSortKey"
          />
        </UFormField>

        <UFormField label="Order" orientation="horizontal">
          <AppSortOrderToggle :value="props.store.sortOrder" @update="setSortOrder" />
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
  </UTabs>
</template>
