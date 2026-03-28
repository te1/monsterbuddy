<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import { getMonsterIconUrl } from '~/services/3/assets';
  import { rebuildAssetPath } from '~/services/assets';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      noTooltip?: boolean;
      eager?: boolean;
    }>(),
    {
      noTooltip: false,
      eager: false,
    }
  );

  const imageUrl = shallowRef<string | null>(null);

  async function updateImageUrl() {
    imageUrl.value = await getMonsterIconUrl(props.monster);
  }

  await updateImageUrl();

  watch(() => props.monster.slug, updateImageUrl);

  const imageUrl2x = computed(() => {
    return rebuildAssetPath(imageUrl.value, '/img/3/monster-icon-2x');
  });
</script>

<template>
  <UTooltip v-if="!noTooltip" :text="monster.name">
    <img
      :src="imageUrl"
      :srcset="`${imageUrl2x} 2x`"
      :alt="monster.name"
      width="60"
      height="60"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
    />
  </UTooltip>

  <img
    v-else
    :src="imageUrl"
    :srcset="`${imageUrl2x} 2x`"
    :alt="monster.name"
    width="60"
    height="60"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
  />
</template>
