<script lang="ts" setup>
  import { genes } from '~/services/3/genes';

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

    <UPageBody>
      <ul class="flex flex-col gap-3">
        <li v-for="gene in genes" :key="gene.slug">
          <NuxtLink :to="`/3/genes/${gene.slug}`" prefetchOn="interaction">
            {{ gene.name }}
          </NuxtLink>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
