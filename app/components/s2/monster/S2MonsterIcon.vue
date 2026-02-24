<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import { getMonsterIconUrl } from '~/services/2/assets';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      showHatchable?: boolean;
      showAttackType?: boolean;
    }>(),
    {
      showHatchable: false,
      showAttackType: false,
    }
  );

  const imageUrl = computed(() => getMonsterIconUrl(props.monster));
</script>

<template>
  <UTooltip :text="monster.name">
    <img :src="imageUrl" :alt="monster.name" width="60" height="60" />
  </UTooltip>

  <UTooltip v-if="showHatchable && monster.hatchable" text="Hatchable">
    <img src="~/assets/icon/hatchable.svg" alt="Hatchable" width="20" height="20" />
  </UTooltip>

  <AttackTypeIcon v-if="showAttackType" :monster="monster" width="20" height="20" />
</template>
