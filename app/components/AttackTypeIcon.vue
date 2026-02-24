<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import { getAttackTypeIconUrl } from '~/services/assets';

  const props = withDefaults(
    defineProps<{
      type?: AttackType;
      monster?: Monster;
    }>(),
    {
      type: undefined,
      monster: undefined,
    }
  );

  const resolvedType = computed(() => props.type ?? props.monster?.monstie?.attackType);
  const caption = computed(() => formatAttackType(resolvedType.value));
  const imageUrl = computed(() => getAttackTypeIconUrl(resolvedType.value));
</script>

<template>
  <UTooltip :text="caption">
    <img :src="imageUrl" :alt="caption" width="60" height="60" />
  </UTooltip>
</template>
