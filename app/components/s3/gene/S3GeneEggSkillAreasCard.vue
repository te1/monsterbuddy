<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import { getAreasByElement } from '~/services/3/data';
  import { formatGeneElement } from '~/services/3/presentation';

  const props = defineProps<{ gene: Gene }>();

  const areas = computed(() => {
    if (!props.gene.eggSkill || props.gene.element === 'all') {
      return [];
    }
    return getAreasByElement(props.gene.element);
  });
</script>

<template>
  <section v-if="areas.length > 0">
    <h3 class="text-lg font-semibold">{{ formatGeneElement(gene.element) }} Areas</h3>

    <div class="mb-1">
      Eggs from these areas can carry <strong class="font-semibold">{{ gene.name }}</strong> if the
      monstie's Ecosystem Rank is S.
    </div>

    <div v-for="item in areas" :key="`${item.region.slug}_${item.area.slug}`">
      <AppNuxtLink
        :to="`/3/habitats/${item.region.slug}/${item.area.slug}`"
        prefetchOn="interaction"
      >
        {{ item.region.name }} - {{ item.area.name }}
      </AppNuxtLink>
    </div>
  </section>
</template>
