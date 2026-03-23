<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import S3MonsterIcon from '~/components/s3/monster/S3MonsterIcon.vue';
  import { getMonsterImageUrl, hasMonsterImage } from '~/services/3/assets';

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

  const imageUrl = shallowRef<string | null>(null);
  const hasImage = computed(() => hasMonsterImage(props.monster));

  async function updateImageUrl() {
    imageUrl.value = hasImage.value ? await getMonsterImageUrl(props.monster) : null;
  }

  await updateImageUrl();

  watch(() => props.monster.slug, updateImageUrl);
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
