<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import type { Mode } from '~/stores/3/geneFilter';
  import useGeneFilter from '~/stores/3/geneFilter';

  const props = withDefaults(
    defineProps<{
      gene: Gene;
      mode?: Mode;
      eager?: boolean;
    }>(),
    {
      mode: 'description',
      eager: false,
    }
  );

  const filter = useGeneFilter();

  // TODO content

  const showDescription = computed(() => props.mode === 'description');

  const showStats = computed(() => props.mode === 'stats');

  function getStatClass(...statKeys: string[]) {
    if (statKeys.includes(filter.sortKey ?? '')) {
      return ['text-primary-600', 'dark:text-primary-400'];
    }
    return undefined;
  }
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

      <div v-if="showDescription">
        <div v-text="gene.description" />
      </div>

      <div v-if="showStats">
        <div
          v-if="gene.stamina != null || gene.power != null || gene.wyvernfell != null"
          class="flex"
        >
          <span v-if="gene.stamina != null">
            Stamina
            <strong class="font-bold" :class="getStatClass('stamina')" v-text="gene.stamina" />
          </span>

          <span v-if="gene.power != null">
            , Power:
            <strong class="font-bold" :class="getStatClass('power')" v-text="gene.power" />
          </span>

          <span v-if="gene.wyvernfell != null">
            , Wyvernfell
            <strong
              class="font-bold"
              :class="getStatClass('wyvernfell')"
              v-text="gene.wyvernfell"
            />
          </span>
        </div>
      </div>

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
