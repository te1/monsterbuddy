<script lang="ts" setup>
  import type { BuffDetail } from '~/services/3/types';
  import { formatGeneElement } from '~/services/3/presentation';

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

      case 'critRate':
        return 'Crit rate';

      case 'maxHpRecovery':
        return 'Max HP recovery per turn';

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
      case 'damageDone':
        return `${op.value}${valueForOp.value}`;

      case 'critRate':
        return `+${props.detail.value}%`;

      case 'maxHpRecovery':
        return `${props.detail.value * 100}%`;

      default:
        return props.detail.value;
    }
  });
</script>

<template>
  <div class="space-x-1">
    <span v-if="showSize" class="inline-block min-w-5 font-semibold" v-text="detail.size" />
    <span v-text="label" />
    <span class="font-semibold" v-text="value" />
  </div>
</template>
