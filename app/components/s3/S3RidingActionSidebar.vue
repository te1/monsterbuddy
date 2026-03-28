<script lang="ts" setup>
  import useRidingActionDisplays from '~/stores/3/ridingActionDisplays';

  const displays = useRidingActionDisplays();

  const tabs = [{ label: 'View', slot: 'view' }];
</script>

<template>
  <LazyUTabs color="neutral" variant="link" :items="tabs" hydrateOnIdle>
    <template #view>
      <S3MonsterViewOptions :displays="displays" />
    </template>
  </LazyUTabs>
</template>
