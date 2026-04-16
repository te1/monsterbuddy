<script lang="ts" setup>
  import type { BuffDetail } from '~/services/3/types';
  import { formatBuffDetailType, formatGeneElement } from '~/services/3/presentation';

  const props = withDefaults(
    defineProps<{
      detail: BuffDetail;
      showSize?: boolean;
    }>(),
    {
      showSize: false,
    }
  );

  const label = computed(() => {
    switch (props.detail.type) {
      case 'damageDone':
        if (props.detail.element == null) {
          return 'Damage done';
        }
        if (props.detail.element === 'all') {
          return 'All damage done';
        }
        return `${formatGeneElement(props.detail.element)} damage done`;

      case 'damageTaken':
        if (props.detail.element == null) {
          return 'Damage taken';
        }
        if (props.detail.element === 'all') {
          return 'All damage taken';
        }
        return `${formatGeneElement(props.detail.element)} damage taken`;

      case 'critRate':
        return 'Crit rate';

      case 'evasionRate':
        return 'Evasion';

      case 'accuracyRate':
        return 'Accuracy';

      case 'maxHpRecovery':
        if (props.detail.value < 0) {
          return 'Max HP damage per turn';
        }
        return 'Max HP recovery per turn';

      case 'rawSpeed':
        return 'Speed';

      case 'rawStaminaRegen':
        return 'Stamina regeneration';

      case 'wyvernfell':
        return 'Wyvernfell damage done';

      case 'wyvernsoulDamageTaken':
        return 'Wyvernsoul damage taken';

      case 'leech':
        return 'Leech';

      case 'ailmentInflictRate':
        return 'Ailment inflict rate';

      case 'effectChance':
        return 'Effect chance';

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
    const sign = props.detail.value < 0 ? '' : '+';

    switch (props.detail.type) {
      case 'damageDone':
      case 'damageTaken':
        return `${op.value}${valueForOp.value}`;

      case 'critRate':
      case 'evasionRate':
      case 'accuracyRate':
      case 'ailmentInflictRate':
        return `${sign}${props.detail.value}%`;

      case 'rawSpeed':
      case 'rawStaminaRegen':
        return `${sign}${props.detail.value}`;

      case 'maxHpRecovery':
      case 'leech':
      case 'effectChance':
        return `${props.detail.value * 100}%`;

      case 'wyvernfell':
      case 'wyvernsoulDamageTaken':
        return `${sign}${props.detail.value * 100}%`;

      default:
        return props.detail.value;
    }
  });
</script>

<template>
  <div class="space-x-1">
    <span v-if="showSize" class="inline-block min-w-5 font-semibold" v-text="detail.size" />
    <AppTooltip :tooltip="formatBuffDetailType(detail.type)">
      <span v-text="label" />
    </AppTooltip>
    <span class="font-semibold" v-text="value" />
  </div>
</template>
