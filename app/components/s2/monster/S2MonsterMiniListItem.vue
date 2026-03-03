<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';

  withDefaults(
    defineProps<{
      monster: Monster;
      showEgg?: boolean;
    }>(),
    {
      showEgg: false,
    }
  );
</script>

<template>
  <NuxtLink :to="`/2/monsters/${monster.slug}`">
    <div class="flex items-center gap-3 px-1 hover:text-default">
      <S2EggImage v-if="showEgg" :monster="monster" noTooltip class="hidden h-9 w-9 xl:block" />
      <S2MonsterIcon v-else :monster="monster" noTooltip class="hidden h-9 w-9 xl:block" />
      <div v-text="monster.name" />
    </div>
  </NuxtLink>
</template>
