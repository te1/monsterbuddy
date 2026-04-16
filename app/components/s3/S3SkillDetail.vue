<script lang="ts" setup>
  import type { SkillDetail } from '~/services/3/types';

  const props = defineProps<{ detail: SkillDetail }>();

  const label = computed(() => {
    switch (props.detail.type) {
      // -- SkillDetailValue
      case 'critRate':
        return 'Crit Rate';

      case 'evasionRate':
        return 'Evasion';

      case 'staminaRecovery':
        return 'Stamina Recovery';

      case 'startingStamina':
        return 'Starting Stamina';

      case 'maxHpRecovery':
        return 'Max HP Recovery';

      case 'kinship':
        return 'Kinship';

      case 'wyvernfell':
        return 'Wyvernfell';

      case 'accuracy':
        return 'Accuracy';

      case 'ailmentChance':
        return 'Ailment Chance';

      case 'blastblightTurns':
        return 'Blastblight Turns';

      case 'debuffExtension':
        return 'Debuff Extension';

      case 'effectChance':
        if (props.detail.label) {
          return `${props.detail.label} Chance`;
        }
        return 'Effect Chance';

      // -- SkillDetailFactor
      case 'damageDone':
        return 'Damage Done';

      case 'damageTaken':
        return 'Damage Taken';

      case 'staminaCost':
        return 'Stamina Cost';

      case 'maxHp':
        return 'Max HP';

      case 'kinshipGeneration':
        return 'Kinship Generation';

      case 'wyvernsoulDamage':
        return 'Wyvernsoul Damage';

      default:
        return undefined;
    }
  });

  const op = computed(() => {
    if (!('op' in props.detail)) {
      return undefined;
    }

    switch (props.detail.op) {
      case 'multiplier':
        return '×';

      case 'additive':
        if (props.detail.value < 0) {
          return ''; // value already has minus sign
        }
        return '+';

      default:
        return undefined;
    }
  });

  const valueForOp = computed(() => {
    if (!('op' in props.detail)) {
      return props.detail.value;
    }

    switch (props.detail.op) {
      case 'multiplier':
        return props.detail.value;

      case 'additive':
        return `${props.detail.value * 100}%`;

      default:
        return props.detail.value;
    }
  });

  const value = computed(() => {
    switch (props.detail.type) {
      // -- SkillDetailValue
      case 'critRate':
      case 'evasionRate':
        return `+${props.detail.value}%`;

      case 'maxHpRecovery':
      case 'accuracy':
      case 'ailmentChance':
      case 'effectChance':
        return `${props.detail.value * 100}%`;

      case 'debuffExtension':
        return `${props.detail.value} turns`;

      // -- SkillDetailFactor
      case 'damageDone':
      case 'damageTaken':
      case 'staminaCost':
      case 'maxHp':
      case 'kinshipGeneration':
      case 'wyvernsoulDamage':
        return `${op.value}${valueForOp.value}`;

      default:
        return props.detail.value;
    }
  });
</script>

<template>
  <div class="flex items-center justify-between gap-2">
    <div v-text="label" />
    <div class="font-semibold" v-text="value" />
  </div>
</template>
