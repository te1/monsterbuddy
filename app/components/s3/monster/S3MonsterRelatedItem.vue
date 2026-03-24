<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import useHistoryStore from '~/stores/3/historyStore';

  const props = defineProps<{ monster: Monster }>();

  const history = useHistoryStore();

  const showMonstie = computed(() => {
    return history.shouldShowMonstie(props.monster);
  });

  const showEgg = computed(() => {
    return history.shouldShowEgg(props.monster);
  });

  const mode = computed(() => {
    return history.lastListModeSmart(props.monster);
  });
</script>

<template>
  <NuxtLink :to="`/3/monsters/${monster.slug}`" prefetchOn="interaction">
    <S3EggListItem v-if="showEgg" class="ml-2" :monster="monster" :mode="mode" />

    <S3MonstieListItem v-else-if="showMonstie" :monster="monster" :mode="mode" />

    <S3MonsterListItem v-else :monster="monster" :mode="mode" />
  </NuxtLink>
</template>
