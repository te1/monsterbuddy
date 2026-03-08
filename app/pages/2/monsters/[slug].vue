<script lang="ts" setup>
  import S2MonsterDetailsSidebar from '~/components/s2/monster/S2MonsterDetailsSidebar.vue';
  import { monstersBySlug } from '~/services/2/data';
  import { getMonsterSeo } from '~/services/2/seo';
  import useHistoryStore from '~/stores/2/historyStore';

  definePageMeta({
    sidebarComponent: S2MonsterDetailsSidebar,
  });

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

    <UPageBody
      class="mt-0 grid grid-cols-1 gap-3 space-y-0 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
    >
      <S2MonsterInfoCard :monster="monster" class="box order-1 px-4 py-2" />
      <S2MonsterCombatCard :monster="monster" class="box order-2 px-4 py-2" />
      <S2MonstieEggCard v-if="monster.hatchable" :monster="monster" class="box order-3 px-4 py-2" />
      <S2MonsterImageCard
        :monster="monster"
        class="box order-4 p-3 md:order-5 lg:order-4 xl:order-5"
      />
      <S2MonstieInfoCard
        v-if="monster.hatchable"
        :monster="monster"
        class="box order-5 px-4 py-2 md:order-4 lg:order-5 xl:order-4"
      />
      <S2MonstieStatsCard
        v-if="monster.hatchable"
        :monster="monster"
        class="box order-6 px-4 py-2"
      />
      <S2MonsterRelatedCard :monster="monster" class="box order-7 px-4 py-2" />
    </UPageBody>
  </div>
</template>
