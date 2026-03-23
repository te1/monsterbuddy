<script lang="ts" setup>
  import { getAttackTypeIconUrl } from '~/services/assets';

  const props = withDefaults(
    defineProps<{
      type?: AttackType;
      noTooltip?: boolean;
    }>(),
    {
      type: undefined,
      noTooltip: false,
    }
  );

  const caption = computed(() => formatAttackType(props.type));
  const imageUrl = computed(() => getAttackTypeIconUrl(props.type));
</script>

<template>
  <UTooltip :text="noTooltip ? undefined : caption" :content="{ side: 'top' }">
    <img :src="imageUrl" :alt="caption" width="60" height="60" />
  </UTooltip>
</template>
