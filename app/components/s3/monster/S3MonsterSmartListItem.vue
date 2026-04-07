<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import type { Mode } from '~/stores/3/baseMonsterFilter';
  import useMonsterHistoryStore from '~/stores/3/monsterHistoryStore';

  export type Display = 'monster' | 'monstie' | 'egg';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      display?: Display;
      mode?: Mode;
      eager?: boolean;
    }>(),
    {
      display: undefined,
      mode: undefined,
      eager: false,
    }
  );

  const history = useMonsterHistoryStore();

  const showMonstie = computed(() => {
    if (props.display) {
      return props.display === 'monstie' && props.monster.hatchable === true;
    }

    return history.shouldShowMonstie(props.monster);
  });

  const showEgg = computed(() => {
    if (props.display) {
      return props.display === 'egg' && props.monster.hatchable === true;
    }

    return history.shouldShowEgg(props.monster);
  });

  const smartMode = computed(() => {
    return history.listModeSmart(showMonstie.value, showEgg.value, props.mode);
  });
</script>

<template>
  <NuxtLink :to="`/3/monsters/${monster.slug}`" prefetchOn="interaction">
    <S3EggListItem
      v-show="showEgg"
      class="box box-link overflow-hidden px-1 [contain-intrinsic-size:122px] [content-visibility:auto]"
      :monster="monster"
      :mode="smartMode"
      :eager="eager"
    />

    <S3MonstieListItem
      v-show="showMonstie"
      class="box box-link overflow-hidden px-1 [contain-intrinsic-size:122px] [content-visibility:auto]"
      :monster="monster"
      :mode="smartMode"
      :eager="eager"
    />

    <S3MonsterListItem
      v-show="!showEgg && !showMonstie"
      class="box box-link overflow-hidden px-1 [contain-intrinsic-size:122px] [content-visibility:auto]"
      :monster="monster"
      :mode="smartMode"
      :eager="eager"
    />
  </NuxtLink>
</template>
