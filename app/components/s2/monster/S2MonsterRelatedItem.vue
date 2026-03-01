<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import useHistoryStore from '~/stores/2/historyStore';

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
  <NuxtLink :to="`/2/monsters/${monster.slug}`">
    <S2EggListItem
      v-if="showEgg"
      class="box-link-inline -mx-3 overflow-hidden"
      :monster="monster"
      :mode="mode"
    />

    <S2MonstieListItem
      v-else-if="showMonstie"
      class="box-link-inline -mx-3 overflow-hidden"
      :monster="monster"
      :mode="mode"
    />

    <S2MonsterListItem
      v-else
      class="box-link-inline -mx-3 overflow-hidden"
      :monster="monster"
      :mode="mode"
    />
  </NuxtLink>
</template>
