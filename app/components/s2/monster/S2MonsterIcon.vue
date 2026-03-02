<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import { getMonsterIconUrl } from '~/services/2/assets';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      noTooltip?: boolean;
    }>(),
    {
      noTooltip: false,
    }
  );

  const imageUrl = computed(() => getMonsterIconUrl(props.monster));
</script>

<template>
  <UTooltip v-if="!noTooltip" :text="monster.name">
    <img :src="imageUrl" :alt="monster.name" width="60" height="60" />
  </UTooltip>

  <img v-else :src="imageUrl" :alt="monster.name" width="60" height="60" />
</template>
