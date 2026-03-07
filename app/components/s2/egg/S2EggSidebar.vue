<script lang="ts" setup>
  import type { Modes } from '../monster/S2MonsterViewOptions.vue';
  import useEggsDisplay from '~/stores/2/eggDisplays';
  import useEggFilter from '~/stores/2/eggFilter';
  import useEggSources from '~/stores/2/eggSources';

  const displays = useEggsDisplay();
  const filter = useEggFilter();
  const sources = useEggSources();

  const disableSortingAndFiltering = computed(() => {
    return displays.current === 'egg';
  });

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

  // switch to source: all when entering egg finder
  watch(
    () => displays.current,
    (newValue) => {
      if (newValue === 'egg') {
        sources.setCurrent('default', filter);
      }
    }
  );

  // turn off egg finder when switching sources
  watch(
    () => sources.current,
    (newValue) => {
      if (newValue !== 'default') {
        displays.setCurrent('monstie');
      }
    }
  );
</script>

<template>
  <UTabs color="neutral" variant="link" :items="tabs">
    <template #view>
      <S2MonsterViewOptions
        :displays="displays"
        :filter="filter"
        :sources="sources"
        :modes="modes"
        :disabled="disableSortingAndFiltering"
      />
    </template>

    <template #filter>
      <S2MonsterFilter
        :displays="displays"
        :filter="filter"
        :sources="sources"
        :disabled="disableSortingAndFiltering"
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
