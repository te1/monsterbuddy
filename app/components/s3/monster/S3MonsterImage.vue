<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import { getMonsterImageUrl, hasMonsterImage } from '~/services/3/assets';
  import { rebuildAssetPath } from '~/services/assets';

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

  const imageUrl2x = computed(() => {
    return rebuildAssetPath(
      imageUrl.value,
      props.small ? '/img/3/monster-sm-2x' : '/img/3/monster-2x'
    );
  });
</script>

<template>
  <UTooltip v-if="hasImage && !noTooltip" :text="monster.name">
    <img
      :src="imageUrl"
      :srcset="`${imageUrl2x} 2x`"
      :alt="monster.name"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
    />
  </UTooltip>

  <img
    v-else-if="hasImage"
    :src="imageUrl"
    :srcset="`${imageUrl2x} 2x`"
    :alt="monster.name"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
  />

  <div v-else-if="!hideFallback" class="flex size-full items-center justify-center">
    <S3MonsterIcon :monster="monster" :noTooltip="noTooltip" :eager="eager" />
  </div>
</template>
