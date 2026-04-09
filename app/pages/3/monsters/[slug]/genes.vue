<script lang="ts" setup>
  import S3MonstieGenesSidebar from '~/components/s3/monstie/S3MonstieGenesSidebar.vue';
  import { hasMonsterImage } from '~/services/3/assets';
  import { monstersBySlug } from '~/services/3/data';
  import { getMonstieGenesSeo } from '~/services/3/seo';
  import useMonsterHistoryStore from '~/stores/3/monsterHistoryStore';

  definePageMeta({
    sidebarComponent: S3MonstieGenesSidebar,
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

  // TODO check for gene count instead
  if (!monster || !monster.monstie) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }

  // TODO get gene count
  const geneCount = 23;

  useSeoMeta(getMonstieGenesSeo(monster, geneCount));
  const headline = gameTypeToFullName('mhst3');

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: 'Monsters', item: '/3/monsters' },
        { name: `${monster.name} Genes` },
      ],
    }),
  ]);

  defineOgImage('MonsterS3', { monster, description: headline, genes: true }, [
    { key: 'og' },
    { key: 'whatsapp', width: 800, height: 800 },
  ]);

  const history = useMonsterHistoryStore();

  const hasImage = computed(() => hasMonsterImage(monster));

  onMounted(() => {
    history.addRecentMonster(monster.slug);
  });
</script>

<template>
  <div>
    <AppPageHeader :title="`${monster.name} Genes`" :headline="headline" />

    <UPageBody class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      <div class="grid gap-3 md:col-1 lg:col-auto xl:col-1">
        <S3MonsterInfoCard :monster="monster" linkName class="box px-4 py-2" />
      </div>

      <S3MonstieGenesCard
        :monster="monster"
        class="box overflow-hidden md:col-2 md:row-[1/span_2] lg:col-auto lg:row-auto xl:col-2 xl:row-[1/span_2]"
      />

      <div class="grid gap-3 md:col-1 lg:col-auto xl:col-1">
        <S3MonstieInfoCard :monster="monster" class="box px-4 py-2" />

        <S3MonsterFlavorCard :monster="monster" mutationOnly class="box px-4 py-2" />

        <S3MonstieEggCard :monster="monster" class="box px-4 py-2" />

        <S3MonsterImageCard v-if="hasImage" :monster="monster" class="box px-4 py-2" />
      </div>
    </UPageBody>
  </div>
</template>
