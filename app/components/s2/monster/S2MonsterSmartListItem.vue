<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import type { Mode } from '~/stores/2/baseMonsterFilter';
  import useHistoryStore from '~/stores/2/historyStore';

  export type Display = 'monster' | 'monstie' | 'egg';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      display?: Display;
      mode?: Mode;
      ticket?: string;
      eager?: boolean;
    }>(),
    {
      display: undefined,
      mode: undefined,
      ticket: undefined,
      eager: false,
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
  <NuxtLink :to="`/2/monsters/${monster.slug}`" prefetchOn="interaction">
    <S2EggListItem
      v-if="showEgg"
      class="box box-link overflow-hidden px-1 [contain-intrinsic-size:122px] [content-visibility:auto]"
      :monster="monster"
      :mode="smartMode"
      :ticket="ticket"
      :eager="eager"
    />

    <S2MonstieListItem
      v-else-if="showMonstie"
      class="box box-link overflow-hidden px-1 [contain-intrinsic-size:122px] [content-visibility:auto]"
      :monster="monster"
      :mode="smartMode"
      :ticket="ticket"
      :eager="eager"
    />

    <S2MonsterListItem
      v-else
      class="box box-link overflow-hidden px-1 [contain-intrinsic-size:122px] [content-visibility:auto]"
      :monster="monster"
      :mode="smartMode"
      :ticket="ticket"
      :eager="eager"
    />
  </NuxtLink>
</template>
