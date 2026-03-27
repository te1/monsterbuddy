<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import {
    ailmentResistanceTooltip,
    elementalResistanceTooltip,
    formatState,
    intensityToIcon,
    intensityToTextColor,
  } from '~/services/3/presentation';
  import useHistoryStore from '~/stores/3/historyStore';

  const props = defineProps<{ monster: Monster }>();

  const history = useHistoryStore();

  const hasCombatStates = computed(() => {
    return !isEmptyObject(props.monster.monster?.states);
  });

  const combatStatesForParts = computed(() => {
    return Object.entries(props.monster.monster?.states ?? {})
      .map(([stateName, stateData]) => {
        return {
          label: stateName,
          value: stateName,
          parts: stateData.parts,
        };
      })
      .filter(({ parts }) => !isEmptyObject(parts));
  });

  const combatStateName = ref(combatStatesForParts.value[0]?.value);

  const combatState = computed(() => {
    return combatStatesForParts.value.find(({ value }) => value === combatStateName.value);
  });

  const elementalResistances = computed(() => props.monster.stats?.elementalResistance);

  const hasElementalResistances = computed(() => {
    return !isEmptyObject(elementalResistances.value);
  });

  const ailmentResistances = computed(() => props.monster.stats?.ailmentResistance);

  const hasAilmentResistances = computed(() => {
    return !isEmptyObject(ailmentResistances.value);
  });

  const isPinned = computed(() => {
    return history.isMonsterPinned(props.monster.slug);
  });

  function togglePin() {
    history.togglePinnedMonster(props.monster.slug);
  }
</script>

<template>
  <section
    v-if="hasCombatStates || hasElementalResistances"
    class="@container relative flex flex-col gap-3"
  >
    <div v-if="hasCombatStates">
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

    <div v-if="hasCombatStates">
      <h3 class="text-lg font-medium">Parts</h3>

      <UTabs
        v-if="combatStatesForParts.length > 1"
        v-model="combatStateName"
        color="neutral"
        variant="link"
        class="mb-1"
        :items="combatStatesForParts"
        :content="false"
        :ui="{ list: 'px-0' }"
      />

      <div
        v-for="(weaponEffectiveness, part) in combatState?.parts"
        :key="part"
        class="flex items-center"
      >
        <span class="w-36" v-text="part" />

        <WeaponEffectiveness :types="weaponEffectiveness" />
      </div>
    </div>

    <div v-if="hasElementalResistances || hasAilmentResistances" class="flex flex-col @xs:flex-row">
      <h3 class="w-36 text-lg font-medium">Resistance</h3>

      <div class="mt-1 flex flex-col gap-4 @xs:mt-1.5">
        <div v-if="hasElementalResistances" class="flex gap-2">
          <div v-for="(value, element) in elementalResistances" :key="element">
            <UTooltip :text="elementalResistanceTooltip(element, value)">
              <div class="flex flex-col items-center gap-1">
                <ElementIcon class="size-6" :element="element" noTooltip />
                <UIcon
                  :name="intensityToIcon(value)"
                  class="text-xl"
                  :class="intensityToTextColor(value)"
                />
              </div>
            </UTooltip>
          </div>
        </div>

        <div v-if="hasAilmentResistances" class="flex gap-2">
          <div v-for="(value, ailment) in ailmentResistances" :key="ailment">
            <UTooltip :text="ailmentResistanceTooltip(ailment, value)">
              <div class="flex flex-col items-center gap-1">
                <S3AilmentIcon class="-my-1 h-8 w-6 object-cover" :ailment="ailment" noTooltip />
                <UIcon
                  :name="intensityToIcon(value)"
                  class="text-xl"
                  :class="intensityToTextColor(value)"
                />
              </div>
            </UTooltip>
          </div>
        </div>
      </div>
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
