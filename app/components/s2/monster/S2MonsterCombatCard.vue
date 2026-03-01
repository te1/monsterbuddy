<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import { formatPart, formatPhase } from '~/services/2/presentation';
  import useHistoryStore from '~/stores/2/historyStore';

  const props = defineProps<{ monster: Monster }>();

  const history = useHistoryStore();

  const hasAttackPatterns = computed(() => {
    return !isEmptyObject(props.monster.monster?.attackPatterns);
  });

  const hasParts = computed(() => {
    return !isEmptyObject(props.monster.monster?.parts);
  });

  const hasElementalWeakness = computed(() => {
    return props.monster.monster?.elementalWeakness != null;
  });

  const elementalWeaknesses = computed(() => {
    const result = props.monster.monster?.elementalWeakness;

    if (typeof result === 'string') {
      return { DEFAULT: result };
    }

    return result;
  });

  const hasCombatInfo = computed(() => {
    return hasAttackPatterns.value || hasParts.value || hasElementalWeakness.value;
  });

  const isPinned = computed(() => {
    return history.isMonsterPinned(props.monster.slug);
  });

  function togglePin() {
    history.togglePinnedMonster(props.monster.slug);
  }
</script>

<template>
  <section v-if="hasCombatInfo" class="relative space-y-2 overflow-hidden">
    <div v-if="hasAttackPatterns">
      <h3 class="text-lg font-semibold">Attack Patterns</h3>

      <div class="space-y-1">
        <div
          v-for="(attackType, phase) in monster.monster?.attackPatterns"
          :key="phase"
          class="flex items-center"
        >
          <span class="w-36" v-text="formatPhase(phase)" />

          <AttackTypeIcon class="mr-1.5 w-8" :type="attackType" />
          <AttackTypeLabel class="font-semibold" :type="attackType" />

          <!--
          <AttackTypeLabel
            class="ml-1.5 font-semibold"
            :type="getCounterAttackType(attackType)"
          /> -->
        </div>
      </div>
    </div>

    <div v-if="hasParts">
      <h3 class="text-lg font-semibold">Parts</h3>

      <div class="space-y-1">
        <div
          v-for="(weaponTypes, part) in monster.monster?.parts"
          :key="part"
          class="flex items-center"
        >
          <span class="w-36" v-text="formatPart(part)" />

          <WeaponEffectiveness :types="weaponTypes" />
        </div>
      </div>
    </div>

    <div v-if="hasElementalWeakness" class="flex pt-2">
      <h3 class="w-36 pt-0.5 text-lg font-semibold">Weakness</h3>

      <div class="space-y-2">
        <div
          v-for="(weakness, label) in elementalWeaknesses"
          :key="weakness"
          class="mr-4 flex items-center"
        >
          <ElementIcon class="mr-1 w-8" :element="weakness" />
          <ElementLabel class="font-semibold" :element="weakness" />
          <span v-if="label !== 'DEFAULT'" class="ml-1">({{ label }})</span>
        </div>
      </div>
    </div>

    <div class="absolute top-0 right-0 pt-1 pr-3">
      <AppPinToggle :pinned="isPinned" subject="monster attack pattern" @toggle="togglePin" />
    </div>
  </section>
</template>
