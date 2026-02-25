<script lang="ts" setup>
  import { coopQuestsBySlug } from '~/services/2/data';
  import { getCoopQuestSeo } from '~/services/2/seo';
  import { formatCoopQuest } from '~/services/2/presentation';

  const route = useRoute();
  const coopQuest = coopQuestsBySlug.get(route.params.slug as string);

  if (!coopQuest) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }

  useSeoMeta(getCoopQuestSeo(coopQuest, 42)); // TODO monsterCount

  const description = computed(() => formatCoopQuest(coopQuest));
  const headline = gameTypeToFullName('mhst2');
</script>

<template>
  <div>
    <UPageHeader :title="coopQuest.name" :description="description" :headline="headline" />

    <!-- TODO List of monsties on this co-op quest -->
  </div>
</template>
