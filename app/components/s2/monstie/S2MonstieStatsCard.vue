<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import { allElements } from '~/services/2/data';
  import { formatGrowth } from '~/services/2/presentation';

  const props = defineProps<{ monster: Monster }>();

  const hasStats = computed(() => {
    return props.monster?.monstie?.stats?.base?.maxHp != null;
  });

  const growth = computed(() => {
    return formatGrowth(props.monster?.monstie?.growth);
  });
</script>

<template>
  <!-- TODO CSS -->

  <section v-if="hasStats" class="space-y-2 overflow-hidden">
    <h3 class="text-lg font-semibold">Monstie Stats</h3>

    <div class="flex gap-6">
      <div class="flex-1 space-y-1">
        <div>Growth: {{ growth }}</div>

        <div class="-mr-10 space-y-1 text-right">
          <div>Max HP</div>
          <div>Speed</div>
          <div>Recovery</div>
          <div>Crit Rate</div>
        </div>
      </div>

      <div class="flex-1 space-y-1">
        <h4 class="pr-4 text-right font-semibold">Basic Stats</h4>

        <div class="space-y-1">
          <StatsBar :value="monster?.monstie?.stats?.base?.maxHp ?? undefined" />
          <StatsBar :value="monster?.monstie?.stats?.base?.speed ?? undefined" />
          <StatsBar :value="monster?.monstie?.stats?.base?.recovery ?? undefined" />
          <StatsBar :value="monster?.monstie?.stats?.base?.critRate ?? undefined" />
        </div>
      </div>
    </div>

    <div class="flex gap-6">
      <div class="flex-1 space-y-1">
        <h4 class="pr-4 text-right font-semibold">Attack</h4>

        <div class="space-y-1">
          <StatsBar
            v-for="element in allElements"
            :key="element"
            :label="formatElement(element)"
            :value="monster?.monstie?.stats?.attack?.[element] ?? undefined"
          >
            <ElementIcon class="w-5" :element="element" />
          </StatsBar>
        </div>
      </div>

      <div class="flex-1 space-y-1">
        <h4 class="pr-4 text-right font-semibold">Defense</h4>

        <div class="space-y-1">
          <StatsBar
            v-for="element in allElements"
            :key="element"
            :label="formatElement(element)"
            :value="monster?.monstie?.stats?.defense?.[element] ?? undefined"
          >
            <ElementIcon class="w-5" :element="element" />
          </StatsBar>
        </div>
      </div>
    </div>

    <div class="flex gap-6 pt-2">
      <div class="flex-1">
        <div v-if="monster?.monstie?.stats?.bestAttack" class="flex items-center gap-2">
          <ElementIcon class="w-5" :element="monster?.monstie?.stats?.bestAttack?.element" />
          <span class="flex-1">Best</span>
          <span class="font-semibold" v-text="monster?.monstie?.stats?.bestAttack?.value" />
        </div>
      </div>

      <div class="flex-1">
        <div v-if="monster?.monstie?.stats?.bestDefense" class="flex items-center gap-2">
          <ElementIcon class="w-5" :element="monster?.monstie?.stats?.bestDefense?.element" />
          <span class="flex-1">Best</span>
          <span class="font-semibold" v-text="monster?.monstie?.stats?.bestDefense?.value" />
        </div>

        <div v-if="monster?.monstie?.stats?.otherDefense" class="flex items-center gap-2">
          <span class="w-5" />
          <span class="flex-1">Other</span>
          <span class="font-semibold" v-text="monster?.monstie?.stats?.otherDefense?.value" />
        </div>

        <div v-if="monster?.monstie?.stats?.worstDefense" class="flex items-center gap-2">
          <ElementIcon class="w-5" :element="monster?.monstie?.stats?.worstDefense?.element" />
          <span class="flex-1">Worst</span>
          <span class="font-semibold" v-text="monster?.monstie?.stats?.worstDefense?.value" />
        </div>
      </div>
    </div>
  </section>
</template>
