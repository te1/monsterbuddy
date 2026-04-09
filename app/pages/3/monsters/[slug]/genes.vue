<script lang="ts" setup>
  import S3MonsterDetailsSidebar from '~/components/s3/monster/S3MonsterDetailsSidebar.vue';
  // import { hasMonsterImage } from '~/services/3/assets';
  import { monstersBySlug } from '~/services/3/data';
  import { getMonstieGenesSeo } from '~/services/3/seo';
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

  // const hasImage = computed(() => hasMonsterImage(monster));

  onMounted(() => {
    history.addRecentMonster(monster.slug);
  });
</script>

<template>
  <div>
    <AppPageHeader :title="`${monster.name} Genes`" :headline="headline" />

    <UPageBody class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      <S3MonsterInfoCard :monster="monster" linkName class="box px-4 py-2" />

      <S3MonstieGenesCard :monster="monster" class="box overflow-hidden" />

      <S3MonstieEggCard :monster="monster" class="box px-4 py-2" />

      <!-- TODO add image?
      <S3MonsterImageCard v-if="hasImage" :monster="monster" class="box px-4 py-2" />
      -->

      <S3MonstieInfoCard :monster="monster" class="box px-4 py-2" />

      <S3MonsterFlavorCard :monster="monster" mutationOnly class="box px-4 py-2" />
    </UPageBody>
  </div>
</template>
