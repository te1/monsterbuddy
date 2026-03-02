<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';

  defineProps<{ monster: Monster }>();
</script>

<template>
  <NuxtLink :to="`/2/monsters/${monster.slug}`">
    <div class="flex items-center gap-3 px-1 text-muted hover:text-default">
      <S2MonsterIcon :monster="monster" noTooltip class="hidden h-9 w-9 xl:block" />
      <div v-text="monster.name" />
    </div>
  </NuxtLink>
</template>
