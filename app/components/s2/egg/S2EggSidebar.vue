<script lang="ts" setup>
  import type { Modes } from '../monster/S2MonsterViewOptions.vue';
  import useEggFilter from '~/stores/2/eggFilter';
  import useEggDisplay from '~/stores/2/eggDisplay';

  const filter = useEggFilter();
  const display = useEggDisplay();

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
      <S2MonsterViewOptions :filter="filter" :display="display" :modes="modes" />
    </template>

    <template #filter>
      <S2MonsterFilter
        :filter="filter"
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
