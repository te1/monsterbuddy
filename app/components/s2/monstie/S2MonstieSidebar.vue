<script lang="ts" setup>
  import type { Modes } from '~/components/s2/monster/S2MonsterViewOptions.vue';
  import useMonstieFilter from '~/stores/2/monstieFilter';
  import useMonstieSources from '~/stores/2/monstieSources';

  const filter = useMonstieFilter();
  const sources = useMonstieSources();

  const tabs = [
    { label: 'View', slot: 'view' },
    { label: 'Filter', slot: 'filter' },
  ];

  const modes: Modes = [
    { value: 'location', label: 'Location' },
    { value: 'location-coop', label: 'Co-Op Quest' },
    { value: 'location-eldersLair', label: "Elder's Lair" },
    { value: 'ridingActions', label: 'Riding Actions' },
    { value: 'retreat', label: 'Retreat' },
    { value: 'rarity', label: 'Rarity' },
    { value: 'stats', label: 'Stats' },
  ];
</script>

<template>
  <UTabs color="neutral" variant="link" :items="tabs">
    <template #view>
      <S2MonsterViewOptions :filter="filter" :sources="sources" :modes="modes" showSortByStats />
    </template>

    <template #filter>
      <S2MonsterFilter
        :filter="filter"
        :sources="sources"
        showHabitatFilter
        showCoopQuestFilter
        showCatavanFilter
        showEldersLairFilter
        showAttackTypeFilter
        showAttackElementFilter
        showRidingActionFilter
      />
    </template>
  </UTabs>
</template>
