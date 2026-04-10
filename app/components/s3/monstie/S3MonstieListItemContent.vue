<script lang="ts" setup>
  import type { GeneElement, Monster } from '~/services/3/types';
  import type { Mode } from '~/stores/3/baseMonsterFilter';
  import { formatLocationType, formatMonsterInfoShort } from '~/services/3/presentation';
  import useMonstieFilter from '~/stores/3/monstieFilter';
  import { take } from 'es-toolkit/array';
  import { getMonsterLocations } from '~/services/3/data';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      mode?: Mode;
      areaElement?: GeneElement;
    }>(),
    {
      mode: 'location',
      areaElement: undefined,
    }
  );

  const monstieFilter = useMonstieFilter();

  const info = computed(() => formatMonsterInfoShort(props.monster));

  const locations = computed(() => take(getMonsterLocations(props.monster), 3));

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
  <div>
    <div class="text-base leading-snug font-semibold" v-text="monster.name" />

    <template v-if="showLocation || showRank">
      <div>
        <span v-text="monster.genus" />
        <span v-if="info" class="text-muted">, {{ info }}</span>
      </div>

      <template v-if="showLocation">
        <div
          v-for="location in locations"
          :key="`${location.type}_${location.region}_${location.area}`"
          :class="{ 'text-dimmed': areaElement != null && location.areaElement !== areaElement }"
        >
          {{ formatLocationType(location.type) }}: {{ location.area ?? location.region }}
        </div>

        <!-- <div v-if="monster.tags.includes('mutation')" v-text="formatMonsterTag('mutation')" /> -->
      </template>

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
      <div v-if="stats?.hp || stats?.defense || stats?.bulk" class="flex">
        <span v-if="stats?.hp">
          HP
          <strong class="font-bold" :class="getStatClass('hp')" v-text="stats?.hp" />
        </span>

        <span v-if="stats?.defense">
          , Defense
          <strong class="font-bold" :class="getStatClass('defense')" v-text="stats?.defense" />
        </span>

        <span v-if="stats?.bulk">
          , Bulk
          <strong class="font-bold" :class="getStatClass('bulk')" v-text="stats?.bulk" />
        </span>
      </div>

      <div v-if="stats?.attack || stats?.speed || stats?.total" class="flex">
        <span v-if="stats?.attack">
          Attack
          <strong class="font-bold" :class="getStatClass('attack')" v-text="stats?.attack" />
        </span>

        <span v-if="stats?.speed">
          , Speed
          <strong class="font-bold" :class="getStatClass('speed')" v-text="stats?.speed" />
        </span>

        <span v-if="stats?.total">
          , Major
          <strong class="font-bold" :class="getStatClass('total')" v-text="stats?.total" />
        </span>
      </div>

      <div v-if="stats?.crit || stats?.wyvernfell" class="flex">
        <span v-if="stats?.crit">
          Crit
          <strong class="font-bold" :class="getStatClass('crit')" v-text="stats?.crit" />
        </span>

        <span v-if="stats?.wyvernfell">
          , Wyvernfell
          <strong
            class="font-bold"
            :class="getStatClass('wyvernfell')"
            v-text="stats?.wyvernfell"
          />
        </span>
      </div>

      <div v-if="stats?.startingStamina || stats?.rawRecovery" class="flex">
        <span v-if="stats?.startingStamina">
          Starting Stamina
          <strong
            class="font-bold"
            :class="getStatClass('startingStamina')"
            v-text="stats?.startingStamina"
          />
        </span>

        <span v-if="stats?.rawRecovery">
          , Recovery
          <strong
            class="font-bold"
            :class="getStatClass('rawRecovery')"
            v-text="stats?.rawRecovery"
          />
        </span>
      </div>
    </div>
  </div>
</template>
