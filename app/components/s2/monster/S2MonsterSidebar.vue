<script lang="ts" setup>
  import type { Mode, SortKey } from '~/stores/2/base';
  import useMonsterFilter from '~/stores/2/monsterFilter';
  import useMonsterDisplay, { type Display } from '~/stores/2/monsterDisplay';

  const filter = useMonsterFilter();
  const display = useMonsterDisplay();

  const tabs = [
    { label: 'View', slot: 'view' },
    { label: 'Filter', slot: 'filter' },
  ];

  function setDisplay(value: Display) {
    display.current = value;

    if (value === 'pinned') {
      filter.mode = 'combat';
    }
  }

  const modes: { value: Mode; label: string }[] = [
    { value: 'location', label: 'Location' },
    { value: 'location-eldersLair', label: "Elder's Lair" },
    { value: 'combat', label: 'Attack Pattern' },
    { value: 'rarity', label: 'Rarity' },
  ];

  const showSortByStats = false; // TODO

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

    if (showSortByStats) {
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
    if (value === filter.sortKey) {
      return;
    }

    const config = sortConfig.value.find((config) => config.value === value);

    filter.$patch({
      sortKey: value,
      sortOrder: config?.default ?? 'asc',
      mode:
        config?.mode && filter.mode !== 'compact' && filter.autoSwitchModes.includes(config.mode)
          ? config.mode
          : filter.mode,
    });
  }
</script>

<template>
  <UTabs color="neutral" variant="link" :items="tabs">
    <template #view>
      <div class="flex flex-col gap-3">
        <UFormField label="Name" orientation="horizontal">
          <AppInputSearch
            :modelValue="filter.nameFilter"
            @update:modelValue="filter.$patch({ nameFilter: $event })"
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
                @click="setDisplay(item.value)"
              />

              <template #fallback>
                <UButton
                  color="neutral"
                  variant="soft2"
                  :label="display.items[0]?.label"
                  class="w-full"
                />
              </template>
            </ClientOnly>
          </div>
        </UFormField>

        <UFormField label="Show" orientation="horizontal">
          <USelect
            :modelValue="filter.mode"
            color="neutral"
            variant="soft2"
            :items="modes"
            class="w-full"
            @update:modelValue="filter.mode = $event"
          />
        </UFormField>

        <UFormField
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
          <AppSortOrderToggle :value="filter.sortOrder" @update="filter.sortOrder = $event" />
        </UFormField>

        <UFormField label=" " orientation="horizontal"></UFormField>
      </div>
    </template>

    <template #filter>
      <S2MonsterFilter
        :store="filter"
        showHabitatFilter
        showCatavanFilter
        showEldersLairFilter
        showHatchableFilter
      />
    </template>
  </UTabs>
</template>
