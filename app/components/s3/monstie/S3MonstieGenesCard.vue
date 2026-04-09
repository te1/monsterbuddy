<script lang="ts" setup>
  import type { Gene, Monster } from '~/services/3/types';
  import { genesByName } from '~/services/3/genes';

  const props = defineProps<{ monster: Monster }>();

  const innateGenes = computed(() => {
    return (props.monster.monstie?.genes?.innate ?? [])
      .map((gene) => {
        return genesByName.get(gene);
      })
      .filter((gene): gene is Gene => gene != null);
  });

  const sRankGene = computed(() => genesByName.get(props.monster.monstie?.genes?.sRank ?? ''));

  // TODO egg skill genes
  // TODO random passive genes
</script>

<template>
  <section class="flex flex-col gap-2">
    <div v-if="innateGenes.length > 0">
      <h3 class="px-4 pt-2 text-lg font-semibold">Innate Genes</h3>

      <div v-for="(gene, index) in innateGenes" :key="gene.slug">
        <div v-if="index > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

        <div class="box-link">
          <NuxtLink :to="`/3/genes/${gene.slug}`" prefetchOn="interaction">
            <S3GeneListItem :gene="gene" mode="stats" class="pl-2.5" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="sRankGene">
      <h3 class="px-4 pt-2 text-lg font-semibold">S Rank Gene</h3>

      <div>
        <div class="box-link">
          <NuxtLink :to="`/3/genes/${sRankGene.slug}`" prefetchOn="interaction">
            <S3GeneListItem :gene="sRankGene" mode="stats" class="pl-2.5" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
