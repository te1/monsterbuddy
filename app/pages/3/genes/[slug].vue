<script lang="ts" setup>
  import S3GeneDetailsSidebar from '~/components/s3/gene/S3GeneDetailsSidebar.vue';
  import { genesBySlug } from '~/services/3/genes';
  import { formatGeneElement, formatGeneType } from '~/services/3/presentation';
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

  const monsterCount = 99; // TODO

  useSeoMeta(getGeneSeo(gene));
  const headline = gameTypeToFullName('mhst3');

  const descriptionParts = computed(() => {
    const part1 = 'This ';
    const part2 = 'gene';
    const part3 = ` can be found on ${monsterCount} monsties`;

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

  defineOgImage(
    'Title',
    {
      title: gene.name,
      description: headline,
      lines: [
        `${formatGeneElement(gene.element)} Gene`,
        gene.type == null || gene.type === 'all' ? '' : formatGeneType(gene.type),
      ],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );

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

    <UPageBody class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      <S3GeneInfoCard :gene="gene" class="box px-4 py-2" />
      <!-- TODO bookmark -->
      <!-- TODO ailments, buffs, debuffs, effects? -->
      <!-- TODO related sizes -->
      <!-- TODO monstie sources -->
    </UPageBody>
  </div>
</template>
