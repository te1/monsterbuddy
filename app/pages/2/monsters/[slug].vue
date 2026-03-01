<script lang="ts" setup>
  import { monstersBySlug } from '~/services/2/data';
  import { getMonsterSeo } from '~/services/2/seo';
  import useHistoryStore from '~/stores/2/historyStore';

  const route = useRoute();
  const monster = monstersBySlug.get(route.params.slug as string);

  if (!monster) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }

  useSeoMeta(getMonsterSeo(monster));
  const headline = gameTypeToFullName('mhst2');

  const history = useHistoryStore();

  onMounted(() => {
    history.addRecentMonster(monster.slug);
  });
</script>

<template>
  <div>
    <UPageHeader :title="monster.name" :headline="headline" />

    <S2MonsterInfoCard :monster="monster" />
    <S2MonsterCombatCard :monster="monster" />
    <S2MonstieEggCard v-if="monster.hatchable" :monster="monster" />
    <S2MonsterImageCard :monster="monster" />
    <S2MonstieInfoCard v-if="monster.hatchable" :monster="monster" />
    <S2MonstieStatsCard v-if="monster.hatchable" :monster="monster" />
    <S2MonsterRelatedCard :monster="monster" />
  </div>
</template>
