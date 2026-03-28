<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import type { Mode } from '~/stores/2/baseMonsterFilter';
  import { take } from 'es-toolkit/array';
  import { coopQuests as coopQuestsData, getMonsterLocations } from '~/services/2/data';
  import {
    formatCoopQuest,
    formatMonsterInfo,
    formatMonsterPrimaryLocation,
    formatPhase,
  } from '~/services/2/presentation';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      mode?: Mode;
      ticket?: string;
      eager?: boolean;
    }>(),
    {
      mode: 'location',
      ticket: undefined,
      eager: false,
    }
  );

  const info = computed(() => formatMonsterInfo(props.monster));

  const location = computed(() => formatMonsterPrimaryLocation(props.monster));

  const coopQuests = computed(() => {
    const locations = take(getMonsterLocations(props.monster, 'coopQuest'), 3);

    const quests = locations.map((location) => {
      return coopQuestsData.find((coopQuest) => coopQuest.name === location.main);
    });

    return quests.filter((coopQuest) => coopQuest != null).map(formatCoopQuest);
  });

  const eldersLairFloors = computed(() => {
    const locations = take(getMonsterLocations(props.monster, 'eldersLair'), 3);

    return locations.map((location) => location.main);
  });

  const attackPatterns = computed(() => {
    return take(Object.entries(props.monster.monster?.attackPatterns ?? {}), 3);
  });

  const showLocation = computed(() => props.mode === 'location');
  const showCoopQuests = computed(() => props.mode === 'location-coop');
  const showEldersLairFloors = computed(() => props.mode === 'location-eldersLair');
  const showCombat = computed(() => props.mode === 'combat');
  const showRarity = computed(() => props.mode === 'rarity');
</script>

<template>
  <div class="relative flex h-[122px] items-center">
    <div class="-mx-3 flex size-[120px] shrink-0 flex-col items-center justify-center gap-2">
      <S2MonsterIcon :monster="monster" :eager="eager" noTooltip />

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
      <div class="leading-tight text-muted" v-text="info" />
      <div class="text-base leading-snug font-medium" v-text="monster.name" />

      <template v-if="showLocation || showRarity">
        <div v-text="monster.genus" />
        <div v-text="monster.habitat" />

        <div v-if="showLocation && location" v-text="location" />

        <div v-if="showRarity">
          Rarity
          <span class="font-bold" v-text="monster.rarity" />
        </div>
      </template>

      <template v-if="showCoopQuests">
        <div v-for="coopQuest in coopQuests" :key="coopQuest">
          {{ coopQuest }}
        </div>
      </template>

      <template v-if="showEldersLairFloors">
        <div v-for="floor in eldersLairFloors" :key="floor">Elder's Lair - {{ floor }}</div>
      </template>

      <template v-if="showCombat">
        <div v-for="[phase, attackType] in attackPatterns" :key="phase">
          {{ formatPhase(phase) }}:

          <AttackTypeLabel class="medium" :type="attackType" />
        </div>
      </template>
    </div>

    <S2MonsterImage
      class="size-full max-h-[122px] overflow-hidden object-contain p-2"
      style="flex-basis: 250px"
      :monster="monster"
      :eager="eager"
      hideFallback
      noTooltip
      small
    />

    <UTooltip v-if="ticket" text="Golden SR ticket required">
      <div
        class="absolute top-0 right-0 rounded-bl bg-gold/75 px-2 py-0.5 text-xs font-medium tracking-widest text-neutral-700 dark:bg-gold/25 dark:text-gold"
      >
        SR
      </div>
    </UTooltip>
  </div>
</template>
