<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import useMonsterHistoryStore from '~/stores/3/monsterHistoryStore';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      linkGenes?: boolean;
    }>(),
    {
      linkGenes: false,
    }
  );

  const history = useMonsterHistoryStore();

  const showMonstie = computed(() => {
    return history.shouldShowMonstie(props.monster);
  });

  const showEgg = computed(() => {
    return history.shouldShowEgg(props.monster);
  });

  const mode = computed(() => {
    return history.lastListModeSmart(props.monster);
  });

  const target = computed(() => {
    return props.linkGenes && props.monster.hatchable
      ? `/3/monsters/${props.monster.slug}/genes`
      : `/3/monsters/${props.monster.slug}`;
  });
</script>

<template>
  <NuxtLink :to="target" prefetchOn="interaction">
    <S3EggListItem v-if="showEgg" class="ml-2" :monster="monster" :mode="mode" />

    <S3MonstieListItem v-else-if="showMonstie" :monster="monster" :mode="mode" />

    <S3MonsterListItem v-else :monster="monster" :mode="mode" />
  </NuxtLink>
</template>
