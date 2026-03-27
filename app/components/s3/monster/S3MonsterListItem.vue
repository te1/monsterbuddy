<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import type { Mode } from '~/stores/3/baseMonsterFilter';
  import { take } from 'es-toolkit/array';
  import {
    formatLocationType,
    formatMonsterInfoShort,
    formatState,
    intensityToIcon,
    intensityToTextColor,
  } from '~/services/3/presentation';
  import { getMonsterLocations } from '~/services/3/data';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      mode?: Mode;
      eager?: boolean;
    }>(),
    {
      mode: 'location',
      eager: false,
    }
  );

  const info = computed(() => formatMonsterInfoShort(props.monster));

  const locations = computed(() => take(getMonsterLocations(props.monster), 3));

  const combatStates = computed(() => {
    return take(Object.entries(props.monster.monster?.states ?? {}), 3);
  });

  const elementalResistances = computed(() => {
    return Object.entries(props.monster.stats?.elementalResistance ?? {})
      .filter(([, value]) => value != null && value < 0)
      .sort((a, b) => (a[1] ?? 0) - (b[1] ?? 0)) as [ElementType, number][];
  });

  const showLocation = computed(() => props.mode === 'location');
  const showCombat = computed(() => props.mode === 'combat');
  const showRank = computed(() => props.mode === 'rank');
</script>

<template>
  <div class="relative flex min-h-[122px] items-center">
    <div class="-mx-3 flex size-[120px] shrink-0 flex-col items-center justify-center gap-2">
      <S3MonsterIcon :monster="monster" :eager="eager" noTooltip />

      <img
        v-if="monster.hatchable"
        src="~/assets/icon/hatchable.svg"
        alt="Hatchable"
        width="20"
        height="20"
        class="size-8"
      />
    </div>

    <div class="mt-3 ml-3 w-full self-start text-sm whitespace-nowrap">
      <div class="text-base leading-snug font-medium" v-text="monster.name" />

      <template v-if="showLocation || showRank">
        <div>
          <span v-text="monster.genus" />
          <span v-if="info" class="text-muted">, {{ info }}</span>
        </div>

        <template v-if="showLocation">
          <div
            v-for="location in locations"
            :key="`${location.type}_${location.region}_${location.area}`"
          >
            {{ formatLocationType(location.type) }}: {{ location.area ?? location.region }}
          </div>

          <!-- <div v-if="monster.tags.includes('mutation')" v-text="formatMonsterTag('mutation')" /> -->
        </template>

        <div v-if="showRank">
          Rank
          <span class="font-bold" v-text="monster.rank ?? '?'" />
        </div>
      </template>

      <template v-if="showCombat">
        <div v-for="[state, data] in combatStates" :key="state">
          {{ formatState(state) }}:

          <AttackTypeLabel class="medium" :type="data.attack" />
        </div>

        <div v-if="elementalResistances.length > 0" class="mt-1 flex gap-2.5">
          <span
            v-for="[element, value] in elementalResistances"
            :key="element"
            class="inline-flex items-center"
          >
            <UIcon
              :name="intensityToIcon(value)"
              class="text-xl"
              :class="intensityToTextColor(value)"
            />
            <ElementIcon class="size-6" :element="element" noTooltip />
          </span>
        </div>
      </template>
    </div>

    <S3MonsterImage
      class="size-full max-h-[122px] overflow-hidden object-contain p-2"
      style="flex-basis: 250px"
      :monster="monster"
      :eager="eager"
      hideFallback
      noTooltip
    />
  </div>
</template>
