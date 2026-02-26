<script lang="ts" setup>
  import type { GenericMonster } from '~/services/types';

  const props = withDefaults(
    defineProps<{
      type?: AttackType;
      monster?: GenericMonster;
    }>(),
    {
      type: undefined,
      monster: undefined,
    }
  );

  const resolvedType = computed(() => props.type ?? props.monster?.monstie?.attackType);
  const caption = computed(() => formatAttackType(resolvedType.value));
  const classes = computed(() => {
    switch (resolvedType.value) {
      case 'power':
        return 'text-power dark:brightness-150';

      case 'speed':
        return 'text-speed  dark:brightness-150';

      case 'technical':
        return 'text-technical dark:brightness-150';

      default:
        return undefined;
    }
  });
</script>

<template>
  <span :class="classes" v-text="caption" />
</template>
