<script lang="ts" setup>
  import useMonstieFilter, { modes } from '~/stores/2/monstieFilter';
  import useMonstieSources from '~/stores/2/monstieSources';

  const filter = useMonstieFilter();
  const sources = useMonstieSources();

  const tabs = [
    { label: 'View', slot: 'view' },
    { label: 'Filter', slot: 'filter' },
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
