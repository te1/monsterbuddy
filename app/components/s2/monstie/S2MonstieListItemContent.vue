<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import type { Mode } from '~/stores/2/baseMonsterFilter';
  import { take } from 'es-toolkit/array';
  import { coopQuests as coopQuestsData, getMonsterLocations } from '~/services/2/data';
  import {
    formatCoopQuest,
    formatMonsterInfo,
    formatMonsterPrimaryLocation,
  } from '~/services/2/presentation';
  import useMonstieFilter from '~/stores/2/monstieFilter';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      mode?: Mode;
    }>(),
    {
      mode: 'location',
    }
  );

  const monstieFilter = useMonstieFilter();

  const info = computed(() => formatMonsterInfo(props.monster));
  const location = computed(() => formatMonsterPrimaryLocation(props.monster));

  const coopQuests = computed(() => {
    const locations = take(getMonsterLocations(props.monster, 'coopQuest'), 3);

    const quests = locations.map((location) => {
      return coopQuestsData.find((coopQuest) => coopQuest.name === location.main);
    });

    return quests.filter((coopQuest) => coopQuest != null);
  });

  const eldersLairFloors = computed(() => {
    const locations = take(getMonsterLocations(props.monster, 'eldersLair'), 3);

    return locations.map((location) => location.main);
  });

  const retreat = computed(() => {
    return parseSomeMarkdown(props.monster?.monstie?.retreat ?? '');
  });

  const hasStats = computed(() => props.monster?.monstie?.stats?.base?.maxHp != null);

  const defense = computed(() => {
    const result: number[] = [];

    if (props.monster?.monstie?.stats?.bestDefense?.value != null) {
      result.push(props.monster.monstie.stats.bestDefense.value);
    }

    if (props.monster?.monstie?.stats?.otherDefense?.value != null) {
      result.push(props.monster.monstie.stats.otherDefense.value);
    }

    if (props.monster?.monstie?.stats?.worstDefense?.value != null) {
      result.push(props.monster.monstie.stats.worstDefense.value);
    }

    return result.join(' / ');
  });

  const showLocation = computed(() => props.mode === 'location');
  const showCoopQuests = computed(() => props.mode === 'location-coop');
  const showEldersLairFloors = computed(() => props.mode === 'location-eldersLair');
  const showRidingActions = computed(() => props.mode === 'ridingActions');
  const showRetreat = computed(() => props.mode === 'retreat');
  const showRarity = computed(() => props.mode === 'rarity');
  const showStats = computed(() => props.mode === 'stats');

  function getStatClass(...statKeys: string[]) {
    statKeys = statKeys.map((statKey) => 'monstie.stats.' + statKey);

    if (statKeys.includes(monstieFilter.sortKey ?? '')) {
      return ['text-primary-600', 'dark:text-primary-400'];
    }
    return undefined;
  }
</script>

<template>
  <div class="min-w-0">
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
      <div v-for="coopQuest in coopQuests" :key="coopQuest" class="@container truncate">
        <span class="inline @3xs:hidden" v-text="coopQuest.name" />
        <span class="hidden @3xs:inline" v-text="formatCoopQuest(coopQuest)" />
      </div>
    </template>

    <template v-if="showEldersLairFloors">
      <div v-for="floor in eldersLairFloors" :key="floor">Elder's Lair - {{ floor }}</div>
    </template>

    <!-- eslint-disable vue/no-v-html -->
    <div v-if="showRetreat" class="line-clamp-3 whitespace-normal" v-html="retreat" />

    <div v-if="showRidingActions" class="whitespace-normal">
      <span v-for="(action, index) in monster?.monstie?.ridingActions" :key="action">
        <span v-text="action" />
        <span v-if="index + 1 < (monster?.monstie?.ridingActions?.length ?? 0)">, </span>
      </span>
    </div>

    <div v-if="showStats">
      <div v-if="hasStats">
        HP
        <span
          class="font-bold"
          :class="getStatClass('base.maxHp')"
          v-text="monster?.monstie?.stats?.base?.maxHp"
        />, Speed
        <span
          class="font-bold"
          :class="getStatClass('base.speed')"
          v-text="monster?.monstie?.stats?.base?.speed"
        />, Crit
        <span
          class="font-bold"
          :class="getStatClass('base.critRate')"
          v-text="monster?.monstie?.stats?.base?.critRate"
        />
      </div>

      <div v-if="monster?.monstie?.stats?.bestAttack">
        Attack
        <span
          class="font-bold"
          :class="getStatClass('bestAttack.value')"
          v-text="monster.monstie.stats.bestAttack.value"
        />
      </div>

      <div v-if="defense">
        Defense
        <span
          class="font-bold"
          :class="getStatClass('bestDefense.value', 'otherDefense.value', 'worstDefense.value')"
          v-text="defense"
        />
      </div>
    </div>
  </div>
</template>
