<script lang="ts" setup>
  import S3MonsterDetailsSidebar from '~/components/s3/monster/S3MonsterDetailsSidebar.vue';
  import { monstersBySlug } from '~/services/3/data';
  import { getMonsterSeo } from '~/services/3/seo';
  import useMonsterHistoryStore from '~/stores/3/monsterHistoryStore';

  definePageMeta({
    sidebarComponent: S3MonsterDetailsSidebar,
    back: {
      show: true,
      fallback: '/3/monsters',
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
  const headline = gameTypeToFullName('mhst3');

  const description = computed(() => {
    let result = `Rank ${monster.rank ?? '?'} `;

    if (monster.hatchable) {
      result += 'hatchable ';
    }

    if (monster.tags.includes('deviant')) {
      result += 'Deviant ';
    }

    if (monster.tags.includes('endangered')) {
      result += 'endangered ';
    }

    if (monster.tags.includes('calamitous')) {
      result += 'Calamitous ';
    }

    result += `${monster.genus}`;

    if (monster.tags.includes('mutation')) {
      result += ' (Mutation)';
    }

    return result;
  });

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: 'Monsters', item: '/3/monsters' },
        { name: monster.name },
      ],
    }),
  ]);

  defineOgImage('MonsterS3', { monster, description: headline }, [
    { key: 'og' },
    { key: 'whatsapp', width: 800, height: 800 },
  ]);

  const history = useMonsterHistoryStore();

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
      <S3MonsterInfoCard :monster="monster" class="box order-1 px-4 py-2" />
      <S3MonsterCombatCard :monster="monster" class="box order-2 px-4 py-2" />
      <S3MonstieEggCard v-if="monster.hatchable" :monster="monster" class="box order-3 px-4 py-2" />
      <S3MonsterImageCard
        :monster="monster"
        class="box order-4 px-4 py-2 md:order-5 lg:order-4 xl:order-5"
      />
      <S3MonstieInfoCard
        v-if="monster.hatchable"
        :monster="monster"
        class="box order-5 px-4 py-2 md:order-4 lg:order-5 xl:order-4"
      />
      <S3MonstieStatsCard
        v-if="monster.hatchable"
        :monster="monster"
        class="box order-6 px-4 py-2"
      />
      <S3MonsterFlavorCard :monster="monster" class="box order-7 px-4 py-2" />
      <S3MonsterRelatedCard :monster="monster" class="box order-8 overflow-hidden" />
    </UPageBody>
  </div>
</template>
