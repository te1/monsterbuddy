import type { Gene } from '~/services/3/types';
import { pull } from 'es-toolkit/array';
import { useLocalStorage } from '@vueuse/core';
import { skipHydrate } from 'pinia';
import { genes, genesBySlug } from '~/services/3/genes';

const useGeneHistoryStore = defineStore('s3/geneHistory', () => {
  // -- state
  const recentGeneSlugs = useLocalStorage<string[]>('s3/history/recentGeneSlugs', []);
  const pinnedGeneSlugs = useLocalStorage<string[]>('s3/history/pinnedGeneSlugs', []);

  // -- getters
  const recentGenes = computed<Gene[]>(() => {
    return recentGeneSlugs.value
      .map((slug) => genesBySlug.get(slug))
      .filter((gene): gene is Gene => gene != null);
  });

  const hasRecentGenes = computed(() => {
    return recentGenes.value.length > 0;
  });

  const pinnedGenes = computed(() => {
    return genes.filter((gene) => {
      return pinnedGeneSlugs.value.includes(gene.slug);
    });
  });

  const hasPinnedGenes = computed(() => {
    return pinnedGenes.value.length > 0;
  });

  const isGenePinned = (slug: string) => {
    return pinnedGeneSlugs.value.includes(slug);
  };

  // -- actions
  function addRecentGene(slug: string) {
    const maxRecentItems = 50;

    pull(recentGeneSlugs.value, [slug]);

    while (recentGeneSlugs.value.length >= maxRecentItems) {
      recentGeneSlugs.value.pop();
    }

    recentGeneSlugs.value.unshift(slug);
  }

  function togglePinnedGene(slug: string) {
    if (isGenePinned(slug)) {
      pull(pinnedGeneSlugs.value, [slug]);
    } else {
      pinnedGeneSlugs.value.unshift(slug);
    }
  }

  return {
    // -- state
    recentGeneSlugs: skipHydrate(recentGeneSlugs),
    pinnedGeneSlugs: skipHydrate(pinnedGeneSlugs),

    // -- getters
    recentGenes,
    hasRecentGenes,
    pinnedGenes,
    hasPinnedGenes,
    isGenePinned,

    // -- actions
    addRecentGene,
    togglePinnedGene,
  };
});

export default useGeneHistoryStore;
