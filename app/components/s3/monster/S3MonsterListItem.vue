<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import type { Mode } from '~/stores/3/baseMonsterFilter';
  import { take } from 'es-toolkit/array';
  import { formatLocationType, formatMonsterInfo, formatState } from '~/services/3/presentation';
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

  const info = computed(() => formatMonsterInfo(props.monster));

  const locations = computed(() => take(getMonsterLocations(props.monster), 2));

  const combatStates = computed(() => {
    return take(Object.entries(props.monster.monster?.states ?? {}), 3);
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
      <div class="min-h-lh leading-tight text-muted" v-text="info" />
      <div class="text-base leading-snug font-medium" v-text="monster.name" />

      <template v-if="showLocation || showRank">
        <div v-text="monster.genus" />

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
