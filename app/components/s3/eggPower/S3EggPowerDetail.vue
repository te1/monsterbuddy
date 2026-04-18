<script lang="ts" setup>
  import type { EggPowerDetail } from '~/services/3/types';

  const props = defineProps<{ detail: EggPowerDetail }>();

  const label = computed(() => {
    switch (props.detail.type) {
      case 'damageDone':
        return 'Damage Done';

      case 'damageTaken':
        return 'Damage Taken';

      case 'staminaRecovery':
        return 'Stamina Recovery';

      case 'kinship':
        return 'Starting Kinship';

      case 'kinshipGeneration':
        return 'Kinship Generation';

      case 'kinshipPercent':
        return 'Kinship Gained';

      case 'extraTurns':
        return 'Extra Turns';

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
        return `${formatNumber(props.detail.value * 100, 2)}%`;

      default:
        return props.detail.value;
    }
  });

  const value = computed(() => {
    switch (props.detail.type) {
      case 'damageDone':
      case 'damageTaken':
      case 'kinshipGeneration':
        return `${op.value}${valueForOp.value}`;

      case 'kinshipPercent':
        return `+${formatNumber(props.detail.value * 100, 2)}%`;

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
