<script lang="ts" setup>
  import useEldersLairFilter, { modes } from '~/stores/2/eldersLairFilter';

  const filter = useEldersLairFilter();

  const tabs = [
    { label: 'View', slot: 'view' },
    { label: 'Filter', slot: 'filter' },
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
