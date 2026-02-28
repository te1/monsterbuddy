<template>
  <NuxtLink :to="`/2/monsters/${monster.slug}/`">
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

<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';

  defineProps<{ monster: Monster }>();

  // const history = computed(() => {
  //   // return useHistoryStore();
  //   return null;
  // });

  const showMonstie = computed(() => {
    // return history.value.shouldShowMonstie(props.monster);
    return true;
  });

  const showEgg = computed(() => {
    // return history.value.shouldShowEgg(props.monster);
    return false;
  });

  const mode = computed(() => {
    // return history.value.lastListModeSmart(props.monster);
    return 'location';
  });
</script>
