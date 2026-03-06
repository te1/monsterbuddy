<script lang="ts" setup>
  import type { Modes } from './S2MonsterViewOptions.vue';
  import useMonsterFilter from '~/stores/2/monsterFilter';
  import useMonsterDisplay from '~/stores/2/monsterDisplay';

  const filter = useMonsterFilter();
  const display = useMonsterDisplay();

  const tabs = [
    { label: 'View', slot: 'view' },
    { label: 'Filter', slot: 'filter' },
  ];

  const modes: Modes = [
    { value: 'location', label: 'Location' },
    { value: 'location-eldersLair', label: "Elder's Lair" },
    { value: 'combat', label: 'Attack Pattern' },
    { value: 'rarity', label: 'Rarity' },
  ];
</script>

<template>
  <UTabs color="neutral" variant="link" :items="tabs">
    <template #view>
      <S2MonsterViewOptions :filter="filter" :display="display" :modes="modes" />
    </template>

    <template #filter>
      <S2MonsterFilter
        :filter="filter"
        showHabitatFilter
        showCatavanFilter
        showEldersLairFilter
        showHatchableFilter
      />
    </template>
  </UTabs>
</template>
