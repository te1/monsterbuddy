<script lang="ts" setup>
  import type { SkillDetail } from '~/services/3/types';

  const props = defineProps<{ detail: SkillDetail }>();

  const label = computed(() => {
    switch (props.detail.type) {
      // -- SkillDetailValue
      case 'critRate':
        return 'Crit Rate';

      case 'staminaRecovery':
        return 'Stamina Recovery';

      case 'startingStamina':
        return 'Starting Stamina';

      case 'maxHpRecovery':
        return 'Max HP Recovery';

      case 'kinship':
        return 'Kinship';

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
        return `${props.detail.value}%`;

      case 'maxHpRecovery':
        return `${props.detail.value * 100}%`;

      // -- SkillDetailFactor
      case 'damageDone':
      case 'damageTaken':
      case 'staminaCost':
      case 'maxHp':
      case 'kinshipGeneration':
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
