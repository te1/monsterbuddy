<script lang="ts" setup>
  import S3MonstieBuildEditSidebar from '~/components/s3/monstieBuild/S3MonstieBuildEditSidebar.vue';
  import useMonstieBuildsStore from '~/stores/3/monstieBuildsStore';

  definePageMeta({
    sidebarComponent: S3MonstieBuildEditSidebar,
    robots: {
      index: false,
      follow: true,
    },
  });

  useSeoMeta({
    title: `Monstie Builder For ${gameTypeToFullLabel('mhst3')}`,
    description:
      'Use the Rite of Channeling to pick your genes, unlock bingo bonuses and build your perfect monstie',
  });
  const headline = gameTypeToFullName('mhst3');

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: gameTypeToShortLabel('mhst3'), item: '/3' },
        { name: 'Monstie Builder' },
      ],
    }),
  ]);

  defineOgImage(
    'Title',
    {
      title: 'Monstie Builder',
      description: headline,
      lines: ['Genes', 'Bingo Bonus', 'Egg Powers'],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );

  const route = useRoute();
  const builds = useMonstieBuildsStore();

  const currentBuildId = computed(() => {
    const hash = route.hash.trim();
    return hash ? hash.replace(/^#/, '') : undefined;
  });

  const build = computed(() => builds.currentBuild);

  function newBuild() {
    builds.newBuild();
  }

  onMounted(async () => {
    if (currentBuildId.value) {
      await builds.setCurrentBuild(currentBuildId.value);
    }
  });
</script>

<template>
  <div>
    <AppPageHeader
      title="Monstie Builder"
      description="Use the Rite of Channeling to pick your genes, unlock bingo bonuses and build your perfect monstie"
      :headline="headline"
    />

    <UPageBody class="flex flex-col gap-3">
      <ClientOnly>
        <div v-if="currentBuildId" class="bg-red-500 font-semibold">
          <div v-if="build">
            {{ build.nameWithFallback }}
          </div>

          <div v-else>
            <USkeleton class="h-6 w-[80%]" />
          </div>
        </div>

        <template #fallback> placeholder </template>
      </ClientOnly>
    </UPageBody>

    <ClientOnly>
      <AppFabPanel>
        <AppFab tooltip="New build" icon="ph:plus" @click="newBuild" />
      </AppFabPanel>
    </ClientOnly>
  </div>
</template>
