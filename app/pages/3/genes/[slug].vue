<script lang="ts" setup>
  import S3GeneDetailsSidebar from '~/components/s3/gene/S3GeneDetailsSidebar.vue';
  import { genesBySlug, getGeneMonstieCount } from '~/services/3/genes';
  import { getGeneSeo } from '~/services/3/seo';
  import useGeneHistoryStore from '~/stores/3/geneHistoryStore';

  definePageMeta({
    sidebarComponent: S3GeneDetailsSidebar,
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

  const monsterCount = computed(() => getGeneMonstieCount(gene));

  useSeoMeta(getGeneSeo(gene, monsterCount.value));
  const headline = gameTypeToFullName('mhst3');

  const descriptionParts = computed(() => {
    const part1 = 'This ';
    const part2 = 'gene';
    const part3 =
      monsterCount.value === 1
        ? ` can be found on 1 monstie`
        : ` can be found on ${monsterCount.value} monsties`;

    return [part1, part2, part3];
  });

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: 'Genes', item: '/3/genes' },
        { name: gene.name },
      ],
    }),
  ]);

  defineOgImage('GeneS3', { gene, description: headline }, [
    { key: 'og' },
    { key: 'whatsapp', width: 800, height: 800 },
  ]);

  const history = useGeneHistoryStore();

  onMounted(() => {
    history.addRecentGene(gene.slug);
  });
</script>

<template>
  <div>
    <AppPageHeader :title="gene.name" :headline="headline" class="hidden lg:block">
      <template #description>
        {{ descriptionParts[0] }}
        <AppNuxtLink to="/3/genes" :text="descriptionParts[1]" />
        {{ descriptionParts[2] }}
      </template>
    </AppPageHeader>

    <UPageBody class="flex flex-col gap-3 md:flex-row lg:flex-col xl:flex-row">
      <div class="flex flex-1 flex-col gap-3">
        <S3GeneInfoCard :gene="gene" class="box px-4 py-2" />

        <S3GeneRelatedCard :gene="gene" class="box overflow-hidden" />

        <S3GeneEggSkillAreasCard :gene="gene" class="box px-4 py-2" />
      </div>

      <S3GeneSourcesCard :gene="gene" class="box flex-1 overflow-hidden" />
    </UPageBody>
  </div>
</template>
