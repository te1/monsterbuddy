<script lang="ts" setup>
  import type { Modes } from '~/components/s2/monster/S2MonsterViewOptions.vue';
  import useEldersLairFilter from '~/stores/2/eldersLairFilter';

  const filter = useEldersLairFilter();

  const tabs = [
    { label: 'View', slot: 'view' },
    { label: 'Filter', slot: 'filter' },
  ];

  const modes: Modes = [
    { value: 'location', label: 'Location' },
    { value: 'combat', label: 'Attack Pattern' },
  ];
</script>

<template>
  <UTabs color="neutral" variant="link" :items="tabs">
    <template #view>
      <S2MonsterViewOptions :filter="filter" :modes="modes" hideSort />
    </template>

    <template #filter>
      <S2MonsterFilter :filter="filter" showEldersLairFilter showHatchableFilter />
    </template>
  </UTabs>
</template>
