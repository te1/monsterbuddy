<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import { getMonsterImageUrl, hasMonsterImage } from '~/services/3/assets';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      noTooltip?: boolean;
      hideFallback?: boolean;
      eager?: boolean;
      small?: boolean;
    }>(),
    {
      noTooltip: false,
      hideFallback: false,
      eager: false,
      small: false,
    }
  );

  const imageUrl = shallowRef<string | null>(null);
  const hasImage = computed(() => hasMonsterImage(props.monster, props.small));

  async function updateImageUrl() {
    imageUrl.value = hasImage.value ? await getMonsterImageUrl(props.monster, props.small) : null;
  }

  await updateImageUrl();

  watch([() => props.monster.slug, () => props.small], updateImageUrl);
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
    <S3MonsterIcon :monster="monster" :noTooltip="noTooltip" :eager="eager" />
  </div>
</template>
