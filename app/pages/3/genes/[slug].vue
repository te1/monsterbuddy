<script lang="ts" setup>
  import { genesBySlug } from '~/services/3/genes';

  definePageMeta({
    // sidebarComponent: S3RidingActionSidebar,
    back: {
      show: true,
      fallback: '/3/genes',
    },
    middleware: [
      (to) => {
        const gene = genesBySlug.get(to.params.slug as string);
        if (gene) {
          to.meta.mobileHeaderTitle = gene.name;
        }
      },
    ],
  });

  const route = useRoute();
  const gene = genesBySlug.get(route.params.slug as string);

  if (!gene) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }

  // useSeoMeta(getRidingActionSeo(ridingAction, monsters.value.length));
  const headline = gameTypeToFullName('mhst3');

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: 'Genes', item: '/3/genes' },
        { name: gene.name },
      ],
    }),
  ]);

  defineOgImage(
    'Title',
    {
      title: gene.name,
      description: headline,
      lines: ['Gene'],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );
</script>

<template>
  <div>
    <AppPageHeader
      :title="gene.name"
      :headline="headline"
      class="hidden lg:block"
      :description="gene.description"
    />

    <UPageBody> CONTENT </UPageBody>
  </div>
</template>
