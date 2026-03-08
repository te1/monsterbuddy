<script lang="ts" setup>
  import { getElementIconUrl } from '~/services/assets';

  const props = withDefaults(
    defineProps<{
      element?: ElementType;
      noTooltip?: boolean;
    }>(),
    {
      element: undefined,
      noTooltip: false,
    }
  );

  const caption = computed(() => formatElement(props.element));
  const imageUrl = computed(() => getElementIconUrl(props.element));
</script>

<template>
  <UTooltip :text="noTooltip ? undefined : caption" :content="{ side: 'top' }">
    <img :src="imageUrl" :alt="caption" width="30" height="30" />
  </UTooltip>
</template>
