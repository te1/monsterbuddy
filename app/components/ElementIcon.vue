<script lang="ts" setup>
  import { getElementIconUrl } from '~/services/assets';

  const props = withDefaults(
    defineProps<{
      element?: ElementType;
    }>(),
    {
      element: undefined,
    }
  );

  const caption = computed(() => formatElement(props.element));
  const imageUrl = computed(() => getElementIconUrl(props.element));
</script>

<template>
  <UTooltip :text="caption">
    <img :src="imageUrl" :alt="caption" width="30" height="30" />
  </UTooltip>
</template>
