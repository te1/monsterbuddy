<script lang="ts" setup>
  import S2MonsterDetailsSidebar from '~/components/s2/monster/S2MonsterDetailsSidebar.vue';
  import { isDeviant, monstersBySlug } from '~/services/2/data';
  import { getMonsterSeo } from '~/services/2/seo';
  import useHistoryStore from '~/stores/2/historyStore';

  definePageMeta({
    sidebarComponent: S2MonsterDetailsSidebar,
    back: {
      show: true,
      fallback: '/2/monsters',
    },
    middleware: [
      (to) => {
        const monster = monstersBySlug.get(to.params.slug as string);
        if (monster) {
          to.meta.mobileHeaderTitle = monster.name;
        }
      },
    ],
  });

  const route = useRoute();
  const monster = monstersBySlug.get(route.params.slug as string);

  if (!monster) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }

  useSeoMeta(getMonsterSeo(monster));
  const headline = gameTypeToFullName('mhst2');

  const description = computed(() => {
    let result = `${monster.rarity} star rarity `;

    if (monster.hatchable) {
      result += 'hatchable ';
    }

    if (isDeviant(monster)) {
      result += 'Deviant ';
    }

    result += `${monster.genus} found in ${monster.habitat}`;

    return result;
  });

  const history = useHistoryStore();

  onMounted(() => {
    history.addRecentMonster(monster.slug);
  });
</script>

<template>
  <div>
    <AppPageHeader
      :title="monster.name"
      :headline="headline"
      :description="description"
      :hideDescription="true"
    />

    <UPageBody class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      <S2MonsterInfoCard :monster="monster" class="box order-1 px-4 py-2" />
      <S2MonsterCombatCard :monster="monster" class="box order-2 px-4 py-2" />
      <S2MonstieEggCard v-if="monster.hatchable" :monster="monster" class="box order-3 px-4 py-2" />
      <S2MonsterImageCard
        :monster="monster"
        class="box order-4 px-4 py-2 md:order-5 lg:order-4 xl:order-5"
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
      <S2MonsterRelatedCard :monster="monster" class="box order-7 overflow-hidden" />
    </UPageBody>
  </div>
</template>
