<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      type?: AttackType;
    }>(),
    {
      type: undefined,
      monster: undefined,
    }
  );

  const caption = computed(() => formatAttackType(props.type));
</script>

<template>
  <span
    :class="{
      'text-power': type === 'power',
      'text-speed': type === 'speed',
      'text-technical': type === 'technical',
    }"
    class="dark:brightness-150"
    v-text="caption"
  />
</template>
