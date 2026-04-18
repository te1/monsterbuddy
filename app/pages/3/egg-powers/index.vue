<script lang="ts" setup>
  // import S3HabitatSidebar from '~/components/s3/S3HabitatSidebar.vue';

  definePageMeta({
    // sidebarComponent: S3HabitatSidebar,
  });

  useSeoMeta({
    title: `Egg Powers In ${gameTypeToFullLabel('mhst3')}`,
    description: 'Overview of egg powers and regions where you can find them',
  });
  const headline = gameTypeToFullName('mhst3');

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: gameTypeToShortLabel('mhst3'), item: '/3' },
        { name: 'Egg Powers' },
      ],
    }),
  ]);

  defineOgImage(
    'Title',
    {
      title: 'Egg Powers',
      description: headline,
      lines: ['Regions', 'Ranks', 'Effects'],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );
</script>

<template>
  <div>
    <AppPageHeader
      title="Egg Powers"
      description="All egg powers and regions where you can find them"
      :headline="headline"
    />

    <UPageBody> CONTENT </UPageBody>
  </div>
</template>
