<script lang="ts" setup>
  import type { SkillAilmentType } from '~/services/3/types';
  import { formatSkillAilment } from '~/services/3/presentation';
  import { getAilmentIconUrl } from '~/services/3/assets';

  const props = withDefaults(
    defineProps<{
      ailment: SkillAilmentType;
      noTooltip?: boolean;
    }>(),
    {
      noTooltip: false,
    }
  );

  const caption = computed(() => formatSkillAilment(props.ailment));
  const imageUrl = computed(() => getAilmentIconUrl(props.ailment));
</script>

<template>
  <AppTooltip :tooltip="noTooltip ? undefined : caption" :content="{ side: 'top' }">
    <img :src="imageUrl" :alt="caption" width="30" height="30" />
  </AppTooltip>
</template>
