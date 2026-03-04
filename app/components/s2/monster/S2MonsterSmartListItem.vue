<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import type { Mode } from '~/stores/2/base';
  import useHistoryStore from '~/stores/2/historyStore';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      display?: string;
      mode?: Mode;
      ticket?: string;
    }>(),
    {
      display: undefined,
      mode: undefined,
      ticket: undefined,
    }
  );

  const history = useHistoryStore();

  const showMonstie = computed(() => {
    if (props.display) {
      return props.display === 'monstie' && props.monster.hatchable;
    }

    return history.shouldShowMonstie(props.monster);
  });

  const showEgg = computed(() => {
    if (props.display) {
      return props.display === 'egg' && props.monster.hatchable;
    }

    return history.shouldShowEgg(props.monster);
  });

  const smartMode = computed(() => {
    return history.listModeSmart(showMonstie.value, showEgg.value, props.mode);
  });
</script>

<template>
  <!-- TODO CSS -->

  <NuxtLink :to="`/2/monsters/${monster.slug}`">
    <S2EggListItem
      v-if="showEgg"
      class="box box-link overflow-hidden px-1"
      :monster="monster"
      :mode="smartMode"
      :ticket="ticket"
    />

    <S2MonstieListItem
      v-else-if="showMonstie"
      class="box box-link overflow-hidden px-1"
      :monster="monster"
      :mode="smartMode"
      :ticket="ticket"
    />

    <S2MonsterListItem
      v-else
      class="box box-link overflow-hidden px-1"
      :monster="monster"
      :mode="smartMode"
      :ticket="ticket"
    />
  </NuxtLink>
</template>
