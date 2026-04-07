<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import { genesByName } from '~/services/3/genes';

  const props = defineProps<{ gene: Gene }>();

  const relatedSizes = computed(() => {
    return (props.gene.sizes ?? [])
      .map((name) => genesByName.get(name))
      .filter((gene): gene is Gene => gene != null);
  });

  const hasRelated = computed(() => relatedSizes.value.length > 0);
</script>

<template>
  <section v-if="hasRelated">
    <h3 class="px-4 pt-2 text-lg font-semibold">Related</h3>

    <div v-for="(related, index) in relatedSizes" :key="related.name">
      <div v-if="index > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

      <div class="box-link">
        <NuxtLink :to="`/3/genes/${related.slug}`" prefetchOn="interaction">
          <S3GeneListItem :gene="related" mode="stats" class="pl-2.5" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
