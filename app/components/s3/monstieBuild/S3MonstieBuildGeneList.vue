<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import { groupBy, uniqBy } from 'es-toolkit/array';

  const props = defineProps<{ build: MonstieBuild }>();

  const uniqueGenes = computed(() => {
    return props.build.uniqueGenes;
  });

  const passiveGenes = computed(() => {
    return uniqueGenes.value.filter((gene) => !gene.active);
  });

  const activeGenes = computed(() => {
    return uniqueGenes.value.filter((gene) => gene.active);
  });

  const sortedGenes = computed(() => {
    return props.build.sortedGenes;
  });

  const duplicateGenes = computed(() => {
    return Object.values(groupBy(sortedGenes.value, (gene) => gene.slug))
      .filter((group) => group.length > 1)
      .map((group) => group[0]!);
  });

  const nonStackingGenes = computed(() => {
    const withBaseName = sortedGenes.value.filter((gene) => gene.baseName != null);
    const byBaseName = Object.values(groupBy(withBaseName, (gene) => gene.baseName!));
    const withMultipleSizes = byBaseName.filter((group) => {
      return uniqBy(group, (gene) => gene.size).length > 1;
    });

    return uniqBy(withMultipleSizes.flat(), (gene) => gene.slug);
  });
</script>

<template>
  <section class="flex flex-col gap-2">
    <div v-if="passiveGenes.length > 0">
      <h3 class="px-4 pt-2 text-lg font-semibold">Passive Genes</h3>

      <div v-for="(gene, index) in passiveGenes" :key="gene.slug">
        <div v-if="index > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

        <div class="box-link">
          <NuxtLink :to="`/3/genes/${gene.slug}`" prefetchOn="interaction">
            <S3GeneListItem :gene="gene" showAll class="px-2.5" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="activeGenes.length > 0">
      <h3 class="px-4 pt-2 text-lg font-semibold">Active Genes</h3>

      <div v-for="(gene, index) in activeGenes" :key="gene.slug">
        <div v-if="index > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

        <div class="box-link">
          <NuxtLink :to="`/3/genes/${gene.slug}`" prefetchOn="interaction">
            <S3GeneListItem :gene="gene" showAll class="px-2.5" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="duplicateGenes.length > 0">
      <h3 class="px-4 pt-2 text-lg font-semibold">Duplicates</h3>

      <div class="px-4 pb-1 text-red-500">You only get the effect once</div>

      <div v-for="(gene, index) in duplicateGenes" :key="gene.slug">
        <div v-if="index > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

        <div class="box-link">
          <NuxtLink :to="`/3/genes/${gene.slug}`" prefetchOn="interaction">
            <S3GeneListItem :gene="gene" showAll class="px-2.5" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="nonStackingGenes.length > 0">
      <h3 class="px-4 pt-2 text-lg font-semibold">Sizes don't stack</h3>

      <div class="px-4 pb-1 text-red-500">You only get the effect once for the largest size</div>

      <div v-for="(gene, index) in nonStackingGenes" :key="gene.slug">
        <div v-if="index > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

        <div class="box-link">
          <NuxtLink :to="`/3/genes/${gene.slug}`" prefetchOn="interaction">
            <S3GeneListItem :gene="gene" showAll class="px-2.5" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
