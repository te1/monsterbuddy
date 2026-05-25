<script lang="ts" setup>
  import useHabitatDisplays from '~/stores/3/habitatDisplay';

  const displays = useHabitatDisplays();

  const tabs = [{ label: 'View', slot: 'view' }];
</script>

<template>
  <UTabs color="neutral" variant="link" :items="tabs">
    <template #view>
      <S3MonsterViewOptions :displays="displays" />
    </template>
  </UTabs>
</template>
