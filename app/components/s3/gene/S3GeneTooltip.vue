<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import { formatGeneInfo } from '~/services/3/presentation';

  const props = defineProps<{ gene: Gene }>();

  const info = computed(() => formatGeneInfo(props.gene));
</script>

<template>
  <AppRichTooltip :link="`/3/genes/${gene.slug}`" linkText="Go to gene page">
    <slot />

    <template #content>
      <div class="text-sm">
        <div class="@container flex items-center justify-between gap-3">
          <div>
            <div class="-mb-0.5 text-muted" v-text="info" />

            <div class="text-base leading-snug font-semibold" v-text="gene.name" />
          </div>

          <div v-if="gene.active" class="hidden self-start text-muted @xs:flex">
            <span v-if="gene.stamina != null" class="whitespace-nowrap">
              Stam
              <strong class="font-bold" v-text="gene.stamina" />
            </span>

            <span v-if="gene.power != null" class="whitespace-nowrap">
              , Pwr
              <strong class="font-bold" v-text="gene.power" />
            </span>

            <span v-if="gene.wyvernfell != null" class="whitespace-nowrap">
              , Wyvf
              <strong class="font-bold" v-text="gene.wyvernfell" />
            </span>
          </div>
        </div>

        <div v-text="gene.description" />
      </div>
    </template>
  </AppRichTooltip>
</template>
