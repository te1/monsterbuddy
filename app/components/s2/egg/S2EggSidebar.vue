<script lang="ts" setup>
  import type { Modes } from '../monster/S2MonsterViewOptions.vue';
  import useEggFilter from '~/stores/2/eggFilter';
  import useEggSources from '~/stores/2/eggSources';

  const filter = useEggFilter();
  const sources = useEggSources();

  const tabs = [
    { label: 'View', slot: 'view' },
    { label: 'Filter', slot: 'filter' },
  ];

  const modes: Modes = [
    { value: 'compact', label: 'Compact' },
    { value: 'location', label: 'Location' },
    { value: 'location-coop', label: 'Co-Op Quest' },
    { value: 'ridingActions', label: 'Riding Actions' },
    { value: 'retreat', label: 'Retreat' },
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
        showEggColorFilter
        showHabitatFilter
        showCoopQuestFilter
        showCatavanFilter
        showAttackTypeFilter
        showAttackElementFilter
        showRidingActionFilter
      />
    </template>
  </UTabs>
</template>
