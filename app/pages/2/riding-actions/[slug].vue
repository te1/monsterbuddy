<script lang="ts" setup>
  import { getMonstiesByRidingAction, ridingActionsBySlug } from '~/services/2/data';
  import { getRidingActionSeo } from '~/services/2/seo';

  const route = useRoute();
  const ridingAction = ridingActionsBySlug.get(route.params.slug as string);

  if (!ridingAction) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }
  const monsters = computed(() => getMonstiesByRidingAction(ridingAction.name));

  useSeoMeta(getRidingActionSeo(ridingAction, monsters.value));

  const headline = gameTypeToFullName('mhst2');
</script>

<template>
  <div>
    <UPageHeader
      :title="ridingAction.name"
      :description="ridingAction.description"
      :headline="headline"
    />

    <!-- TODO List of monsties with this riding action -->
  </div>
</template>
