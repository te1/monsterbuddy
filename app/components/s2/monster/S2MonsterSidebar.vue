<script lang="ts" setup>
  import type { Modes } from '../S2Sidebar.vue';
  import useMonsterFilter from '~/stores/2/monsterFilter';

  const monsterFilter = useMonsterFilter();

  const modes: Modes = [
    { value: 'location', label: 'Location' },
    { value: 'location-eldersLair', label: "Elder's Lair" },
    { value: 'combat', label: 'Attack Pattern' },
    { value: 'rarity', label: 'Rarity' },
  ];
</script>

<template>
  <S2Sidebar :store="monsterFilter" :modes="modes" />
</template>
