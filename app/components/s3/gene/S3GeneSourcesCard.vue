<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import useGeneHistoryStore from '~/stores/3/geneHistoryStore';

  const props = defineProps<{ gene: Gene }>();

  const history = useGeneHistoryStore();

  const isPinned = computed(() => {
    return history.isGenePinned(props.gene.slug);
  });

  function togglePin() {
    history.togglePinnedGene(props.gene.slug);
  }
</script>

<template>
  <section class="relative">
    <h3 class="px-4 pt-2 text-lg font-semibold">Sources</h3>

    <div>
      <div v-if="0 > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

      <div class="box-link">
        <NuxtLink to="/3/monsters/rathalos" prefetchOn="interaction">
          <!-- <S3GeneListItem :gene="related" mode="stats" class="pl-2.5" /> -->
        </NuxtLink>
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
