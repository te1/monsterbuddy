<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import {
    getMonstieEggSkills,
    getMonstieInnateGenes,
    getMonstiePassiveGenes,
    getMonstieSRankGene,
  } from '~/services/3/genes';

  const props = defineProps<{ monster: Monster }>();

  const innateGenes = computed(() => getMonstieInnateGenes(props.monster));
  const sRankGene = computed(() => getMonstieSRankGene(props.monster));
  const eggSkills = computed(() => getMonstieEggSkills(props.monster));
  const passiveGenes = computed(() => getMonstiePassiveGenes(props.monster));
</script>

<template>
  <section class="flex flex-col gap-2">
    <div v-if="innateGenes.length > 0">
      <h3 class="px-4 pt-2 text-lg font-semibold">Innate Genes</h3>

      <div class="px-4 pb-1">These genes are always present but may have level requirements.</div>

      <div v-for="(gene, index) in innateGenes" :key="gene.slug">
        <div v-if="index > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

        <div class="box-link">
          <NuxtLink :to="`/3/genes/${gene.slug}`" prefetchOn="interaction">
            <S3GeneListItem :gene="gene" showAll class="px-2.5" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="sRankGene">
      <h3 class="px-4 pt-2 text-lg font-semibold">S Rank Gene</h3>

      <div class="px-4 pb-1">This gene is only present if the monstie's Ecosystem Rank is S.</div>

      <div class="box-link">
        <NuxtLink :to="`/3/genes/${sRankGene.slug}`" prefetchOn="interaction">
          <S3GeneListItem :gene="sRankGene" showAll class="px-2.5" />
        </NuxtLink>
      </div>
    </div>

    <div v-if="eggSkills.length > 0">
      <h3 class="px-4 pt-2 text-lg font-semibold">Egg Skills</h3>

      <div class="px-4 pb-1">
        These genes are only present if the monstie's Ecosystem Rank is S. The
        <AppNuxtLink to="/3/habitats" prefetchOn="interaction" text="Area Element" /> determines the
        element of the Egg Skill.
      </div>

      <div v-for="(eggSkill, index) in eggSkills" :key="eggSkill.gene.slug">
        <div v-if="index > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

        <div class="box-link">
          <NuxtLink :to="`/3/genes/${eggSkill.gene.slug}`" prefetchOn="interaction">
            <S3GeneListItem :gene="eggSkill.gene" showAll class="px-2.5" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="passiveGenes.length > 0">
      <h3 class="px-4 pt-2 text-lg font-semibold">Passive Genes</h3>

      <div class="px-4 pb-1">
        These genes are randomly selected. Shiny eggs and higher Ecosystem Rank increase the chances
        of getting better / larger genes.
      </div>

      <div v-for="(gene, index) in passiveGenes" :key="gene.slug">
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
