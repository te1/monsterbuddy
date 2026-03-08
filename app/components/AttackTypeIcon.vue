<script lang="ts" setup>
  import { getAttackTypeIconUrl } from '~/services/assets';

  const props = withDefaults(
    defineProps<{
      type?: AttackType;
      monster?: GenericMonster;
      noTooltip?: boolean;
    }>(),
    {
      type: undefined,
      monster: undefined,
      noTooltip: false,
    }
  );

  const resolvedType = computed(() => props.type ?? props.monster?.monstie?.attackType);
  const caption = computed(() => formatAttackType(resolvedType.value));
  const imageUrl = computed(() => getAttackTypeIconUrl(resolvedType.value));
</script>

<template>
  <UTooltip :text="noTooltip ? undefined : caption" :content="{ side: 'top' }">
    <img :src="imageUrl" :alt="caption" width="60" height="60" />
  </UTooltip>
</template>
