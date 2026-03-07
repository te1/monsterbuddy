<script lang="ts" setup>
  import useRidingActionDisplays from '~/stores/2/ridingActionDisplays';

  const displays = useRidingActionDisplays();

  const tabs = [{ label: 'View', slot: 'view' }];
</script>

<template>
  <UTabs color="neutral" variant="link" :items="tabs">
    <template #view>
      <S2MonsterViewOptions :displays="displays" />
    </template>
  </UTabs>
</template>
