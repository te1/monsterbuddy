<script lang="ts" setup>
  import { getAttackTypeIconUrl, getAttackTypeIconUrl2 } from '~/services/assets';

  const props = withDefaults(
    defineProps<{
      type?: AttackType;
      noTooltip?: boolean;
      icon2?: boolean;
    }>(),
    {
      type: undefined,
      noTooltip: false,
      icon2: false,
    }
  );

  const caption = computed(() => formatAttackType(props.type));
  const imageUrl = computed(() =>
    props.icon2 ? getAttackTypeIconUrl2(props.type) : getAttackTypeIconUrl(props.type)
  );
</script>

<template>
  <UTooltip :text="noTooltip ? undefined : caption" :content="{ side: 'top' }">
    <img :src="imageUrl" :alt="caption" width="60" height="60" />
  </UTooltip>
</template>
