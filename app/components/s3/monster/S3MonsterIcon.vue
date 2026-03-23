<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import { getMonsterIconUrl } from '~/services/3/assets';

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
</script>

<template>
  <UTooltip v-if="!noTooltip" :text="monster.name">
    <img
      :src="imageUrl"
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
    :alt="monster.name"
    width="60"
    height="60"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
  />
</template>
