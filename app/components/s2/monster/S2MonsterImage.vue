<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import { getMonsterImageUrl } from '~/services/2/assets';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      hideFallback?: boolean;
      right?: boolean;
    }>(),
    {
      hideFallback: false,
      right: false,
    }
  );

  const imageUrl = computed(() => getMonsterImageUrl(props.monster));
  const hasImage = computed(() => !!imageUrl.value);
</script>

<template>
  <!-- TODO CSS -->

  <UTooltip v-if="hasImage" :text="monster.name">
    <img :src="imageUrl" :alt="monster.name" />
  </UTooltip>

  <div
    v-else-if="!hideFallback"
    class="flex h-full w-full items-center p-2"
    :class="right ? 'justify-end' : 'justify-center'"
  >
    <S2MonsterIcon :monster="monster" />
  </div>
</template>
