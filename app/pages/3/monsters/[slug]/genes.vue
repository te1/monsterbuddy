<script lang="ts" setup>
  import S3MonstieGenesSidebar from '~/components/s3/monstie/S3MonstieGenesSidebar.vue';
  import { hasMonsterImage } from '~/services/3/assets';
  import { monstersBySlug } from '~/services/3/data';
  import { getMonstieGeneCount } from '~/services/3/genes';
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

  if (!monster) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }

  const geneCount = computed(() => getMonstieGeneCount(monster));

  if (geneCount.value === 0) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }

  useSeoMeta(getMonstieGenesSeo(monster, geneCount.value));
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
    <AppPageHeader :title="`${monster.name} Genes`" :headline="headline" :hideDescription="true" />

    <UPageBody class="flex flex-col gap-3 md:flex-row-reverse lg:flex-col xl:flex-row-reverse">
      <S3MonsterInfoCard
        :monster="monster"
        linkName
        class="box px-4 py-2 md:hidden lg:flex xl:hidden"
      />

      <S3MonstieGenesCard :monster="monster" class="box flex-1 overflow-hidden" />

      <div class="flex flex-1 flex-col gap-3">
        <S3MonsterInfoCard
          :monster="monster"
          linkName
          class="box hidden px-4 py-2 md:flex lg:hidden xl:flex"
        />

        <S3MonstieInfoCard :monster="monster" essentialsOnly class="box px-4 py-2" />

        <S3MonsterFlavorCard :monster="monster" mutationOnly class="box px-4 py-2" />

        <S3MonstieEggCard :monster="monster" class="box px-4 py-2" />

        <S3MonsterImageCard v-if="hasImage" :monster="monster" class="box px-4 py-2" />

        <S3MonsterRelatedCard :monster="monster" linkGenes class="box overflow-hidden" />
      </div>
    </UPageBody>
  </div>
</template>
