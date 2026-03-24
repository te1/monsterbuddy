<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import type { Mode } from '~/stores/3/baseMonsterFilter';
  import { formatMonsterInfo } from '~/services/3/presentation';
  import useMonstieFilter from '~/stores/3/monstieFilter';

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
  const stats = computed(() => props.monster?.stats?.base);

  const showLocation = computed(() => props.mode === 'location');
  const showRidingActions = computed(() => props.mode === 'ridingActions');
  const showRank = computed(() => props.mode === 'rank');
  const showStats = computed(() => props.mode === 'stats');

  function getStatClass(...statKeys: string[]) {
    statKeys = statKeys.map((statKey) => 'stats.base.' + statKey);

    if (statKeys.includes(monstieFilter.sortKey ?? '')) {
      return ['text-primary-600', 'dark:text-primary-400'];
    }
    return undefined;
  }
</script>

<template>
  <div class="min-w-0">
    <div class="min-h-lh leading-tight text-muted" v-text="info" />
    <div class="text-base leading-snug font-medium" v-text="monster.name" />

    <template v-if="showLocation || showRank">
      <div v-text="monster.genus" />
      <!-- TODO location
      <div v-text="monster.habitat" />

      <div v-if="showLocation && location" v-text="location" />
      --->

      <div v-if="showRank">
        Rank
        <strong class="font-bold" v-text="monster.rank" />
      </div>
    </template>

    <div v-if="showRidingActions" class="whitespace-normal">
      <span v-for="(action, index) in monster?.monstie?.ridingActions" :key="action">
        <span v-text="action" />
        <span v-if="index + 1 < (monster?.monstie?.ridingActions?.length ?? 0)">, </span>
      </span>
    </div>

    <div v-if="showStats">
      <div v-if="stats?.attack || stats?.speed || stats?.crit">
        Attack
        <strong class="font-bold" :class="getStatClass('attack')" v-text="stats?.attack" />, Speed
        <strong class="font-bold" :class="getStatClass('speed')" v-text="stats?.speed" />, Crit
        <strong class="font-bold" :class="getStatClass('crit')" v-text="stats?.crit" />
      </div>

      <div v-if="stats?.hp || stats?.defense">
        HP
        <strong class="font-bold" :class="getStatClass('hp')" v-text="stats?.hp" />, Defense
        <strong class="font-bold" :class="getStatClass('defense')" v-text="stats?.defense" />
      </div>

      <div v-if="stats?.bulk || stats?.total">
        Bulk
        <strong class="font-bold" :class="getStatClass('bulk')" v-text="stats?.bulk" />, Major
        <strong class="font-bold" :class="getStatClass('total')" v-text="stats?.total" />
      </div>
    </div>
  </div>
</template>
