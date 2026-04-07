<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';

  const props = defineProps<{ gene: Gene }>();

  const info = computed(() => (props.gene.active ? 'Active' : 'Passive'));
</script>

<template>
  <section class="flex flex-col gap-2">
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
