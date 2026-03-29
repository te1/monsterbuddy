<script lang="ts" setup>
  import useRidingActionDisplays from '~/stores/3/ridingActionDisplays';

  const displays = useRidingActionDisplays();

  const tabs = [{ label: 'View', slot: 'view' }];
</script>

<template>
  <UTabs color="neutral" variant="link" :items="tabs">
    <template #view>
      <S3MonsterViewOptions :displays="displays" />
    </template>
  </UTabs>
</template>
