<script lang="ts" setup>
  // definePageMeta({
  //   sidebarComponent: S3MonstieBuilderSidebar,
  // });

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
</script>

<template>
  <div>
    <AppPageHeader
      title="Monstie Builder"
      description="Use the Rite of Channeling to pick your genes, unlock bingo bonuses and build your perfect monstie"
      :headline="headline"
    />

    <UPageBody class="flex flex-col gap-3">
      <section>
        <ProseH3>Your Builds</ProseH3>

        <ClientOnly>
          <template #fallback> placeholder </template>
        </ClientOnly>
      </section>

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
    </UPageBody>
  </div>
</template>
