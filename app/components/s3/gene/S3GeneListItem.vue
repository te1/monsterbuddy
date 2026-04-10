<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import type { Mode } from '~/stores/3/geneFilter';
  import useGeneFilter from '~/stores/3/geneFilter';

  const props = withDefaults(
    defineProps<{
      gene: Gene;
      mode?: Mode;
      showAll?: boolean;
      eager?: boolean;
    }>(),
    {
      mode: 'description',
      showAll: true,
      eager: false,
    }
  );

  const filter = useGeneFilter();

  const showDescription = computed(
    () => props.mode === 'description' || props.gene.active !== true
  );

  const showStats = computed(() => props.mode === 'stats' && props.gene.active);

  function getStatClass(...statKeys: string[]) {
    if (statKeys.includes(filter.sortKey ?? '')) {
      return ['text-primary-600', 'dark:text-primary-400'];
    }
    return undefined;
  }
</script>

<template>
  <div class="@container flex h-[74px] items-center gap-1">
    <div class="m-1.5 size-14 shrink-0">
      <S3GeneIcon :gene="gene" :eager="eager" noTooltip />
    </div>

    <div class="my-1.5 mr-1.5 flex-1 self-start text-sm">
      <div class="flex items-center justify-between">
        <div class="text-base leading-snug font-semibold" v-text="gene.name" />

        <div v-if="showAll && gene.active" class="hidden text-muted @md:flex">
          <span v-if="gene.stamina != null">
            Stam
            <strong class="font-bold" :class="getStatClass('stamina')" v-text="gene.stamina" />
          </span>

          <span v-if="gene.power != null">
            , Pwr
            <strong class="font-bold" :class="getStatClass('power')" v-text="gene.power" />
          </span>

          <span v-if="gene.wyvernfell != null">
            , Wyvf
            <strong
              class="font-bold"
              :class="getStatClass('wyvernfell')"
              v-text="gene.wyvernfell"
            />
          </span>
        </div>
      </div>

      <div v-if="showDescription" class="line-clamp-2" v-text="gene.description" />

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
            , Power
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

        <div v-if="gene.pps != null || gene.wps != null">
          <span v-if="gene.pps != null">
            <strong class="font-bold" :class="getStatClass('pps')" v-text="gene.pps" />
            Pwr / Stam{{ gene.wps ? ', ' : '' }}
          </span>

          <span v-if="gene.wps != null">
            <strong class="font-bold" :class="getStatClass('wps')" v-text="gene.wps" />
            Wyvf / Stam
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
