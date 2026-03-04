<script lang="ts" setup>
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
</script>

<template>
  <span
    :class="{
      'text-power': resolvedType === 'power',
      'text-speed': resolvedType === 'speed',
      'text-technical': resolvedType === 'technical',
    }"
    class="dark:brightness-150"
    v-text="caption"
  />
</template>
