<script lang="ts" setup>
  import useCoopQuestDisplays from '~/stores/2/coopQuestDisplays';

  const displays = useCoopQuestDisplays();

  const tabs = [{ label: 'View', slot: 'view' }];
</script>

<template>
  <LazyUTabs color="neutral" variant="link" :items="tabs" hydrateOnIdle>
    <template #view>
      <S2MonsterViewOptions :displays="displays" />
    </template>
  </LazyUTabs>
</template>
