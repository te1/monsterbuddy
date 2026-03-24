<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import { formatState } from '~/services/3/presentation';
  import useHistoryStore from '~/stores/3/historyStore';

  const props = defineProps<{ monster: Monster }>();

  const history = useHistoryStore();

  const hasCombatStates = computed(() => {
    return !isEmptyObject(props.monster.monster?.states);
  });

  // TOOD elemental weakness, ailment weakness?

  const isPinned = computed(() => {
    return history.isMonsterPinned(props.monster.slug);
  });

  function togglePin() {
    history.togglePinnedMonster(props.monster.slug);
  }
</script>

<template>
  <section v-if="hasCombatStates" class="relative flex flex-col gap-2">
    <div>
      <h3 class="text-lg font-medium">Attack Patterns</h3>

      <div class="flex flex-col gap-1">
        <div
          v-for="(data, state) in monster.monster?.states"
          :key="state"
          class="flex items-center"
        >
          <span class="w-36" v-text="formatState(state)" />

          <AttackTypeIcon class="mr-1.5 size-8" :type="data.attack" />
          <AttackTypeLabel class="font-medium" :type="data.attack" />

          <!--
          <AttackTypeLabel
            class="ml-1.5 font-medium"
            :type="getCounterAttackType(attackType)"
          /> -->
        </div>
      </div>
    </div>

    <div>
      <h3 class="text-lg font-medium">Parts</h3>

      <!-- TODO better UI for different states -->
      <div>
        <div
          v-for="(stateData, state) in monster.monster?.states"
          :key="state"
          class="flex flex-col gap-1"
        >
          {{ state }}

          <div v-for="(partData, part) in stateData.parts" :key="part" class="flex items-center">
            <span class="w-36" v-text="part" />

            <WeaponEffectiveness :types="partData" />
          </div>
        </div>
      </div>
    </div>

    <!-- TODO elemental weakness, ailment weakness?
    <div v-if="hasElementalWeakness" class="flex pt-2">
      <h3 class="w-36 pt-0.5 text-lg font-medium">Weakness</h3>

      <div class="flex flex-col gap-2">
        <div
          v-for="(weakness, label) in elementalWeaknesses"
          :key="weakness"
          class="mr-4 flex items-center"
        >
          <ElementIcon class="mr-1 size-8" :element="weakness" />
          <ElementLabel class="font-medium" :element="weakness" />
          <span v-if="label !== 'DEFAULT'" class="ml-1">({{ label }})</span>
        </div>
      </div>
    </div>
    -->

    <div class="absolute top-1 right-1">
      <ClientOnly>
        <AppPinToggle
          :modelValue="isPinned"
          subject="monster attack pattern"
          noLabel
          @update:modelValue="togglePin"
        />
      </ClientOnly>
    </div>
  </section>
</template>
