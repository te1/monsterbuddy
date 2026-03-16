<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import { getMonsterImageUrl } from '~/services/2/assets';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      noTooltip?: boolean;
      hideFallback?: boolean;
    }>(),
    {
      noTooltip: false,
      hideFallback: false,
    }
  );

  const imageUrl = computed(() => getMonsterImageUrl(props.monster));
  const hasImage = computed(() => !!imageUrl.value);
</script>

<template>
  <UTooltip v-if="hasImage" :text="noTooltip ? undefined : monster.name">
    <img :src="imageUrl" :alt="monster.name" />
  </UTooltip>

  <div v-else-if="!hideFallback" class="flex size-full items-center justify-center">
    <S2MonsterIcon :monster="monster" :noTooltip="noTooltip" />
  </div>
</template>
