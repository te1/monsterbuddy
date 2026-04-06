<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import type { Mode } from '~/stores/3/geneFilter';

  const props = withDefaults(
    defineProps<{
      gene: Gene;
      mode?: Mode;
      eager?: boolean;
    }>(),
    {
      mode: 'location',
      eager: false,
    }
  );

  // TODO content

  const showLocation = computed(() => props.mode === 'location');
  const showCombat = computed(() => props.mode === 'combat');
  const showRank = computed(() => props.mode === 'rank');
</script>

<template>
  <div class="@container flex h-[122px] items-center">
    <div class="-mx-3 flex size-[120px] shrink-0 flex-col items-center justify-center gap-2">
      <div class="size-[60px]">
        <S3GeneIcon :gene="gene" :eager="eager" noTooltip />
      </div>
    </div>

    <div class="mx-3 mt-3 w-full self-start text-sm">
      <div class="text-base leading-snug font-semibold" v-text="gene.name" />

      <!--
      <template v-if="showLocation || showRank">
        <div>
          <span v-text="monster.genus" />
          <span v-if="info" class="text-muted">, {{ info }}</span>
        </div>

        <div v-if="showRank">
          Rank
          <span class="font-bold" v-text="monster.rank ?? '?'" />
        </div>
      </template>
      -->
    </div>
  </div>
</template>
