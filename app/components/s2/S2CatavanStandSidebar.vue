<script lang="ts" setup>
  import useCatavanStandDisplays from '~/stores/2/catavanStandDisplays';

  const displays = useCatavanStandDisplays();

  const tabs = [{ label: 'View', slot: 'view' }];
</script>

<template>
  <UTabs color="neutral" variant="link" :items="tabs">
    <template #view>
      <S2MonsterViewOptions :displays="displays" />
    </template>
  </UTabs>
</template>
