<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import {
    formatState,
    intensityToIcon,
    intensityToOpacity,
    intensityToTextColor,
    intensityToTooltip,
  } from '~/services/3/presentation';
  import useHistoryStore from '~/stores/3/historyStore';

  const props = defineProps<{ monster: Monster }>();

  const history = useHistoryStore();

  const hasCombatStates = computed(() => {
    return !isEmptyObject(props.monster.monster?.states);
  });

  const elementalResistances = computed(() => props.monster.stats?.elementalResistance);

  // TOOD ailment resistance

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

    <div v-if="elementalResistances" class="flex pt-2">
      <h3 class="w-36 text-lg font-medium">Resistance</h3>

      <div class="mt-1 flex gap-2 pt-0.5">
        <div v-for="(value, element) in elementalResistances" :key="element">
          <UTooltip :text="intensityToTooltip(value, element)">
            <div class="flex flex-col items-center gap-1">
              <ElementIcon
                class="size-6"
                :class="intensityToOpacity(value)"
                :element="element"
                noTooltip
              />
              <UIcon
                :name="intensityToIcon(value)"
                class="text-xl"
                :class="intensityToTextColor(value)"
              />
            </div>
          </UTooltip>
        </div>
      </div>

      <!-- TODO ailment resistance -->
    </div>

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
