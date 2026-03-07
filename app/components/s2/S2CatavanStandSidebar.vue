<script lang="ts" setup>
  import useCatavanStandDisplay from '~/stores/2/catavanStandDisplay';

  const display = useCatavanStandDisplay();

  const tabs = [{ label: 'View', slot: 'view' }];
</script>

<template>
  <UTabs color="neutral" variant="link" :items="tabs">
    <template #view>
      <S2MonsterViewOptions :display="display" />
    </template>
  </UTabs>
</template>
