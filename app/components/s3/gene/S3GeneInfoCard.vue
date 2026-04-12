<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import {
    formatGeneElement,
    formatGeneType,
    formatSkillEffect,
    formatSkillEffectDetails,
  } from '~/services/3/presentation';

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

  const effects = computed(() => {
    const ignored = [
      //
      'procBlastblight',
      'procBurn',
      'procParalysis',
    ];

    return props.gene.effects?.filter((effect) => !ignored.includes(effect)) ?? [];
  });
</script>

<template>
  <section class="relative flex flex-col gap-3">
    <div class="flex justify-between">
      <div>
        <h3 class="sr-only">General Gene Info</h3>

        <div class="-mb-1 text-muted" v-text="info" />

        <div class="mb-1 text-2xl font-medium" v-text="gene.name" />

        <div v-text="gene.description" />
      </div>

      <S3GeneIcon class="-mr-2 shrink-0" size="size-18" :gene="gene" />
    </div>

    <div v-if="gene.active" class="@container">
      <div class="text-lg font-semibold">Stats</div>

      <div class="grid @sm:grid-cols-2 @sm:gap-x-12 @3xl:grid-cols-3">
        <div v-if="gene.stamina != null" class="flex items-center justify-between gap-2">
          <span>Stamina Cost</span>
          <span class="text-right font-semibold" v-text="gene.stamina" />
        </div>

        <div
          v-if="gene.power != null || gene.wyvernfell != null"
          class="hidden @sm:block @3xl:hidden"
        />

        <div v-if="gene.power != null" class="flex items-center justify-between gap-2">
          <span>Power</span>
          <span class="text-right font-semibold" v-text="gene.power" />
        </div>

        <div v-if="gene.pps != null" class="flex items-center justify-between gap-2">
          <span>Power / Stam</span>
          <span class="text-right font-semibold" v-text="gene.pps" />
        </div>

        <div v-if="gene.wyvernfell != null" class="flex items-center justify-between gap-2">
          <span>Wyvernfell</span>
          <span class="text-right font-semibold" v-text="gene.wyvernfell" />
        </div>

        <div v-if="gene.wps != null" class="flex items-center justify-between gap-2">
          <span>Wyvernfell / Stam</span>
          <span class="text-right font-semibold" v-text="gene.wps" />
        </div>
      </div>
    </div>

    <div
      v-if="gene.target != null || gene.breath || (gene.details && gene.details.length > 0)"
      class="@container"
    >
      <div class="text-lg font-semibold">Characteristics</div>

      <div class="grid @md:grid-cols-2 @md:gap-x-12 @3xl:grid-cols-3">
        <div v-if="gene.target != null" class="flex items-center justify-between gap-2">
          <div>Target</div>
          <div><S3SkillTarget :target="gene.target" /></div>
        </div>

        <div v-if="gene.breath">
          Grants <AppNuxtLink to="/3/riding-actions/breath" text="Breath" /> Riding Action
        </div>

        <template v-if="gene.details && gene.details.length > 0">
          <S3SkillDetail v-for="detail in gene.details" :key="detail.type" :detail="detail" />
        </template>
      </div>
    </div>

    <div v-if="gene.ailments && gene.ailments.length > 0" class="flex flex-col gap-1">
      <div class="text-lg font-semibold">Ailments</div>

      <div class="flex gap-2">
        <S3AilmentIcon
          v-for="ailment in gene.ailments"
          :key="ailment"
          :ailment="ailment"
          class="-my-1 h-8 w-6 object-cover"
        />
      </div>
    </div>

    <div v-if="gene.buffs && gene.buffs.length > 0">
      <div class="text-lg font-semibold">Buffs</div>

      <div class="flex flex-col gap-1">
        <S3GeneBuffDetails v-for="buff in gene.buffs" :key="buff.type" :buff="buff" />
      </div>
    </div>

    <div v-if="gene.debuffs && gene.debuffs.length > 0">
      <div class="text-lg font-semibold">Debuffs</div>

      <div class="flex flex-col gap-1">
        <S3GeneDebuffDetails v-for="debuff in gene.debuffs" :key="debuff.type" :debuff="debuff" />
      </div>
    </div>

    <div v-if="effects.length > 0">
      <div class="text-lg font-semibold">Effects</div>

      <div>
        <template v-for="(effect, index) in effects" :key="index">
          <AppTooltip :tooltip="formatSkillEffectDetails(effect)">
            <span v-text="formatSkillEffect(effect)" />
          </AppTooltip>
          <span v-if="index < effects.length - 1">, </span>
        </template>
      </div>
    </div>
  </section>
</template>
