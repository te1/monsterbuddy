<script lang="ts" setup>
  import { getElementIconUrl, getElementIconUrl2 } from '~/services/assets';

  const props = withDefaults(
    defineProps<{
      element?: ElementType;
      noTooltip?: boolean;
      icon2?: boolean;
    }>(),
    {
      element: undefined,
      noTooltip: false,
      icon2: false,
    }
  );

  const caption = computed(() => formatElement(props.element));
  const imageUrl = computed(() =>
    props.icon2 ? getElementIconUrl2(props.element) : getElementIconUrl(props.element)
  );
</script>

<template>
  <UTooltip :text="noTooltip ? undefined : caption" :content="{ side: 'top' }">
    <img :src="imageUrl" :alt="caption" width="30" height="30" />
  </UTooltip>
</template>
