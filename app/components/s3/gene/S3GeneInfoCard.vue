<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import { formatGeneElement, formatGeneType, formatSkillTarget } from '~/services/3/presentation';

  const props = defineProps<{ gene: Gene }>();

  const info = computed(() => {
    const result: string[] = [];

    if (props.gene.element != null) {
      result.push(formatGeneElement(props.gene.element));
    }

    if (props.gene.type != null && props.gene.type !== 'all') {
      result.push(formatGeneType(props.gene.type));
    }

    if (props.gene.active) {
      result.push('Active');
    } else {
      result.push('Passive');
    }

    return result.join(', ');
  });

  // TODO  Ailment, Buff, Debuff, Effect
</script>

<template>
  <section class="flex flex-col gap-3">
    <div class="flex justify-between">
      <div>
        <h3 class="sr-only">General Gene Info</h3>

        <div class="-mb-1 text-muted" v-text="info" />

        <div class="mb-1 text-2xl font-medium" v-text="gene.name" />

        <div v-text="gene.description" />

        <!--
        <div class="flex items-center gap-1">
          <UTooltip text="Genus">
            <UIcon name="ph:dna" class="text-muted" />
          </UTooltip>

          <span v-text="monster.genus" />
        </div>

        <div class="flex items-center gap-1">
          <UTooltip text="Rank">
            <UIcon name="ph:star-fill" class="text-dimmed" />
          </UTooltip>

          <span v-text="monster.rank ?? '?'" />
        </div>
        -->
      </div>

      <S3GeneIcon class="shrink-0" :gene="gene" />
    </div>

    <div v-if="gene.active" class="@container">
      <div class="text-lg font-semibold">Stats</div>

      <div
        class="grid @sm:grid-cols-2 @sm:grid-rows-2 @sm:gap-x-12 @3xl:grid-cols-3 @3xl:grid-rows-1"
      >
        <div v-if="gene.stamina != null" class="flex items-center justify-between gap-2">
          <span>Stamina Cost</span>
          <span class="text-right font-semibold" v-text="gene.stamina" />
        </div>

        <div v-if="gene.power != null" class="flex items-center justify-between gap-2">
          <span>Power</span>
          <span class="text-right font-semibold" v-text="gene.power" />
        </div>

        <div v-if="gene.wyvernfell != null" class="flex items-center justify-between gap-2">
          <span>Wyvernfell</span>
          <span class="text-right font-semibold" v-text="gene.wyvernfell" />
        </div>
      </div>
    </div>

    <div v-if="gene.target != null || gene.breath" class="@container">
      <div class="text-lg font-semibold">Characteristics</div>

      <div
        class="grid @md:grid-cols-2 @md:grid-rows-2 @md:gap-x-12 @3xl:grid-cols-3 @3xl:grid-rows-1"
      >
        <div v-if="gene.target != null" class="flex items-center justify-between gap-2">
          <div>Target</div>
          <div v-text="formatSkillTarget(gene.target)" />
        </div>

        <div v-if="gene.breath">
          Grants <AppNuxtLink to="/3/riding-actions/breath" text="Breath" /> Riding Action
        </div>
      </div>
    </div>

    <!--
    <div v-if="hasLocations">
      <h3 class="text-lg font-semibold">Locations</h3>

      <S3MonsterLocation
        v-for="location in locations"
        :key="`${location.type}_${location.region}_${location.area}`"
        :location="location"
      />
    </div>
    -->
  </section>
</template>
