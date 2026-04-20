<script lang="ts" setup>
  import S3MonstieBuildSidebar from '~/components/s3/monstieBuild/S3MonstieBuildSidebar.vue';
  import useMonstieBuildsStore from '~/stores/3/monstieBuildsStore';

  definePageMeta({
    sidebarComponent: S3MonstieBuildSidebar,
  });

  useSeoMeta({
    title: `Monstie Builds For ${gameTypeToFullLabel('mhst3')}`,
    description:
      'Use the Rite of Channeling to pick your genes, unlock bingo bonuses and build your perfect monstie',
  });
  const headline = gameTypeToFullName('mhst3');

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: gameTypeToShortLabel('mhst3'), item: '/3' },
        { name: 'Monstie Builds' },
      ],
    }),
  ]);

  defineOgImage(
    'Title',
    {
      title: 'Monstie Builds',
      description: headline,
      lines: ['Genes', 'Bingo Bonus', 'Egg Powers'],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );

  const builds = useMonstieBuildsStore();
</script>

<template>
  <div>
    <AppPageHeader
      title="Monstie Builds"
      description="Use the Rite of Channeling to pick your genes, unlock bingo bonuses and build your perfect monstie"
      :headline="headline"
    />

    <UPageBody class="mt-6 flex flex-col gap-6">
      <section>
        <ProseH3>Recommended Reading / Watching</ProseH3>

        <ProseUl>
          <ProseLi>
            <AppLink
              href="https://www.youtube.com/watch?v=txLzHs-ajEg"
              text="Advanced Monstie Guide"
            />
            on YouTube
          </ProseLi>

          <ProseLi>
            <AppLink
              href="https://lescarnetsdelawycademie.fr/building-the-perfect-monstie"
              text="Building the perfect Monstie"
            />
            by <AppLink href="https://www.reddit.com/user/Masuku68" text="Masuku68" />
          </ProseLi>
        </ProseUl>
      </section>

      <section>
        <ProseH3>Your Builds</ProseH3>

        <ClientOnly>
          <ul class="flex flex-col gap-2 text-muted">
            <li v-for="build in builds.recentBuilds" :key="build.id">
              <S3MonstieBuildMiniListItem :build="build" />
            </li>
          </ul>

          <template #fallback>
            <ul class="flex flex-col gap-2 text-muted">
              <li v-for="i in 7" :key="i" class="flex items-center gap-3">
                <USkeleton class="h-9 w-9 rounded-full" />
                <USkeleton class="my-1 h-4 w-[calc(80%-3rem)]" />
              </li>
            </ul>
          </template>
        </ClientOnly>
      </section>
    </UPageBody>

    <ClientOnly>
      <AppFabPanel>
        <AppFab tooltip="New build" icon="ph:plus" @click="builds.newBuild" />
      </AppFabPanel>
    </ClientOnly>
  </div>
</template>
