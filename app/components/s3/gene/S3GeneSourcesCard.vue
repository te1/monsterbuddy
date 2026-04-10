<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import { formatGeneElement } from '~/services/3/presentation';
  import {
    getEggSkillSources,
    getInnateGeneSources,
    getPassiveGeneSources,
    getSpecialGeneSources,
    getSRankGeneSources,
  } from '~/services/3/genes';
  import useGeneHistoryStore from '~/stores/3/geneHistoryStore';

  const props = defineProps<{ gene: Gene }>();

  const history = useGeneHistoryStore();

  const innateSources = computed(() => getInnateGeneSources(props.gene));
  const sRankSources = computed(() => getSRankGeneSources(props.gene));
  const specialSources = computed(() => getSpecialGeneSources(props.gene));
  const eggSkillSources = computed(() => getEggSkillSources(props.gene));
  const passiveSources = computed(() => getPassiveGeneSources(props.gene));

  const isPinned = computed(() => history.isGenePinned(props.gene.slug));

  function togglePin() {
    history.togglePinnedGene(props.gene.slug);
  }
</script>

<template>
  <section class="relative flex flex-col gap-2">
    <div v-if="innateSources.length > 0">
      <h3 class="px-4 pt-2 text-lg font-semibold">Innate Genes</h3>

      <div class="px-4 pb-1">These genes are always present but may have level requirements.</div>

      <div v-for="(monster, index) in innateSources" :key="monster.slug">
        <div v-if="index > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

        <div class="box-link">
          <NuxtLink :to="`/3/monsters/${monster.slug}/genes`" prefetchOn="interaction">
            <S3MonstieListItem :monster="monster" mode="location" class="px-2.5" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="sRankSources.length > 0">
      <h3 class="px-4 pt-2 text-lg font-semibold">S Rank Genes</h3>

      <div class="px-4 pb-1">
        These genes are only present if the monstie's Ecosystem Rank is S.
      </div>

      <div v-for="(monster, index) in sRankSources" :key="monster.slug">
        <div v-if="index > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

        <div class="box-link">
          <NuxtLink :to="`/3/monsters/${monster.slug}/genes`" prefetchOn="interaction">
            <S3MonstieListItem :monster="monster" mode="location" class="px-2.5" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="specialSources.length > 0">
      <h3 class="px-4 pt-2 text-lg font-semibold">Unlockable Genes</h3>

      <div class="px-4 pb-1">These genes have special requirements.</div>

      <div v-for="(monster, index) in specialSources" :key="monster.slug">
        <div v-if="index > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

        <div class="box-link">
          <NuxtLink :to="`/3/monsters/${monster.slug}/genes`" prefetchOn="interaction">
            <S3MonstieListItem :monster="monster" mode="location" class="px-2.5" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="eggSkillSources.length > 0">
      <h3 class="px-4 pt-2 text-lg font-semibold">Egg Skills</h3>

      <div class="px-4 pb-1">
        These genes are only present if the monstie's Ecosystem Rank is S. The
        <AppNuxtLink to="/3/habitats" prefetchOn="interaction" text="Area Element" /> must be
        {{ formatGeneElement(gene.element) }}.
      </div>

      <div v-for="(monster, index) in eggSkillSources" :key="monster.slug">
        <div v-if="index > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

        <div class="box-link">
          <NuxtLink :to="`/3/monsters/${monster.slug}/genes`" prefetchOn="interaction">
            <S3MonstieListItem
              :monster="monster"
              mode="location"
              :areaElement="gene.element"
              class="px-2.5"
            />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="passiveSources.length > 0">
      <h3 class="px-4 pt-2 text-lg font-semibold">Passive Genes</h3>

      <div class="px-4 pb-1">
        These genes are randomly selected. Shiny eggs and higher Ecosystem Rank increase the chances
        of getting better / larger genes.
      </div>

      <div v-for="(monster, index) in passiveSources" :key="monster.slug">
        <div v-if="index > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

        <div class="box-link">
          <NuxtLink :to="`/3/monsters/${monster.slug}/genes`" prefetchOn="interaction">
            <S3MonstieListItem :monster="monster" mode="location" class="px-2.5" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="absolute top-1 right-1">
      <ClientOnly>
        <AppPinToggle
          :modelValue="isPinned"
          subject="gene"
          noLabel
          @update:modelValue="togglePin"
        />
      </ClientOnly>
    </div>
  </section>
</template>
