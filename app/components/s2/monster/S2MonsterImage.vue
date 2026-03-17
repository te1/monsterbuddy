<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import { getMonsterImageUrl } from '~/services/2/assets';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      noTooltip?: boolean;
      hideFallback?: boolean;
      eager?: boolean;
    }>(),
    {
      noTooltip: false,
      hideFallback: false,
      eager: false,
    }
  );

  const imageUrl = computed(() => getMonsterImageUrl(props.monster));
  const hasImage = computed(() => !!imageUrl.value);
</script>

<template>
  <UTooltip v-if="hasImage && !noTooltip" :text="monster.name">
    <img :src="imageUrl" :alt="monster.name" :loading="eager ? 'eager' : 'lazy'" decoding="async" />
  </UTooltip>

  <img
    v-else-if="hasImage"
    :src="imageUrl"
    :alt="monster.name"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
  />

  <div v-else-if="!hideFallback" class="flex size-full items-center justify-center">
    <S2MonsterIcon :monster="monster" :noTooltip="noTooltip" :eager="eager" />
  </div>
</template>
