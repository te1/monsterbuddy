<script lang="ts" setup>
  import type { Modes } from './S2MonsterViewOptions.vue';
  import useMonsterFilter from '~/stores/2/monsterFilter';
  import useMonsterSources from '~/stores/2/monsterSources';

  const filter = useMonsterFilter();
  const sources = useMonsterSources();

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
      <S2MonsterViewOptions :filter="filter" :sources="sources" :modes="modes" />
    </template>

    <template #filter>
      <S2MonsterFilter
        :filter="filter"
        :sources="sources"
        showHabitatFilter
        showCatavanFilter
        showEldersLairFilter
        showHatchableFilter
      />
    </template>
  </UTabs>
</template>
