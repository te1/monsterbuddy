<script lang="ts" setup>
  import type { AilmentType } from '~/services/3/types';
  import { formatAilment } from '~/services/3/presentation';
  import { getAilmentIconUrl } from '~/services/3/assets';

  const props = withDefaults(
    defineProps<{
      ailment: AilmentType;
      noTooltip?: boolean;
    }>(),
    {
      noTooltip: false,
    }
  );

  const caption = computed(() => formatAilment(props.ailment));
  const imageUrl = computed(() => getAilmentIconUrl(props.ailment));
</script>

<template>
  <UTooltip :text="noTooltip ? undefined : caption" :content="{ side: 'top' }">
    <img :src="imageUrl" :alt="caption" width="30" height="30" />
  </UTooltip>
</template>
