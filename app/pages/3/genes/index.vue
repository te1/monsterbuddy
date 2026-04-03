<script lang="ts" setup>
  definePageMeta({
    mobileHeaderTitle: 'Genes',
  });

  useSeoMeta({
    title: `Gene List In ${gameTypeToFullLabel('mhst3')}`,
    description: 'Overview of all genes and on which monsties they can be found',
  });
  const headline = gameTypeToFullName('mhst3');

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [{ name: gameTypeToShortLabel('mhst3'), item: '/3' }, { name: 'Genes' }],
    }),
  ]);

  defineOgImage(
    'Title',
    {
      title: 'All Genes',
      description: headline,
      lines: ['Types', 'Effects', 'Sources'],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );
</script>

<template>
  <div>
    <AppPageHeader
      title="Genes"
      description="All the genes and on which monsties they can be found"
      :headline="headline"
    />

    <UPageBody> CONTENT </UPageBody>
  </div>
</template>
