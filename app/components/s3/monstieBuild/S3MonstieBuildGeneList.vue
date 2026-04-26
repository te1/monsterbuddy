<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import { uniqBy } from 'es-toolkit/array';

  const props = defineProps<{ build: MonstieBuild }>();

  const genes = computed(() => {
    const all = props.build.genes.filter((gene) => gene != null);

    return uniqBy(all, (gene) => gene.baseName);
  });

  const passiveGenes = computed(() => {
    return genes.value.filter((gene) => !gene.active);
  });

  const activeGenes = computed(() => {
    return genes.value.filter((gene) => gene.active);
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
  </section>
</template>
