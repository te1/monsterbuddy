<script lang="ts" setup>
  const { title } = useAppConfig().seo;
  const subtitle = `Companion App For ${gameTypeToFullLabel('mhst3')}`;
  const headline = gameTypeToFullName('mhst3');

  useSeoMeta({
    titleTemplate: '',
    title: `${title} - ${subtitle}`,
    description: 'Includes monster attack types and weaknesses, egg patterns and monstie locations',
  });

  defineOgImage(
    'Title',
    {
      title,
      description: subtitle,
      lines: ['Eggs', 'Monsters', 'Attack Patterns'],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );
</script>

<template>
  <div>
    <AppPageHeader :title="title" :headline="headline">
      <template #description>
        <strong class="font-medium">Monster Buddy</strong> is a companion app for
        <AppLink href="https://www.monsterhunter.com/stories3" text="Monster Hunter Stories 3" />
        that can help you learn or remember information useful during combat and general gameplay.
        It's not a complete guide, walkthrough or advanced character / gene planner (yet).
      </template>
    </AppPageHeader>

    <UPageBody class="flex flex-col gap-8">
      <section class="mt-4 -mb-4 flex flex-col items-center">
        <AppTrinity />
      </section>

      <UAlert color="neutral" variant="soft-bg">
        <template #description>
          The site is still a work in progress and new data is added regularly. Feel free to
          <AppLink
            href="https://github.com/te1/monsterbuddy/discussions/categories/data"
            text="submit missing information or share corrections"
          />
        </template>
      </UAlert>

      <section>
        <ProseH3>Spoiler Warning</ProseH3>

        <ProseP>
          This contains names and images of monsters, names of locations, information that can make
          combat easier, information on which monsters can become monsties, etc. If you don't want
          that information just yet proceed at your own discretion.
        </ProseP>
      </section>

      <section>
        <ProseH3>Features</ProseH3>

        <ProseUl>
          <ProseLi>
            <AppNuxtLink to="/3/monsters" text="Monster list" />
            with attack patterns, weapon and elemental weaknesses
          </ProseLi>

          <ProseLi>
            <AppNuxtLink to="/3/monsties" text="Monstie list" />
            with attack types, locations and stats
          </ProseLi>

          <ProseLi>
            <AppNuxtLink to="/3/eggs" text="Visual egg list" />
            with search, sorting and filtering
          </ProseLi>

          <ProseLi>
            <AppNuxtLink to="/3/riding-actions" text="Riding action list" />
            and which monsties will learn them
          </ProseLi>

          <ProseLi>
            Keeps track of your recently viewed monsters, monsties and eggs for fast and easy
            navigation
          </ProseLi>

          <ProseLi>Bookmark monsters to quickly check their attack patterns</ProseLi>

          <ProseLi>Bookmark your favorite monsties to find them quickly</ProseLi>

          <ProseLi>Bookmark eggs to quickly find what your are currently looking for</ProseLi>
        </ProseUl>
      </section>

      <div class="grid gap-8 xl:grid-cols-2 xl:gap-12">
        <section>
          <ProseH3>Sources for data and images</ProseH3>

          <ProseUl>
            <ProseLi>In-game Monsterpedia</ProseLi>

            <ProseLi>
              <AppLink href="https://monsterhunterwiki.org" text="Monster Hunter Wiki" />
            </ProseLi>

            <!-- TODO more links -->
            <!--
            <ProseLi>
              <AppLink
                href="https://docs.google.com/spreadsheets/d/1QzM9X34IfACPtRa_yWq2BZUidWJqs0l2K_Gs2023bO0"
                text="MHStories 2 data"
              />
              by <AppLink href="https://www.reddit.com/user/iSharingan" text="iSharingan" />
            </ProseLi>
            -->
          </ProseUl>
        </section>

        <section>
          <ProseH3>Other great resources</ProseH3>

          <ProseUl>
            <ProseLi>
              <AppLink href="https://manual.capcom.com/mhst3/" text="Official Web Manual" />
            </ProseLi>

            <ProseLi>
              <AppLink href="https://www.youtube.com/@RageGamingVideos" text="RageGamingVideos" />
              on YouTube
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://www.youtube.com/watch?v=txLzHs-ajEg"
                text="Advanced Monstie Guide"
              />
              on YouTube
            </ProseLi>

            <!-- TODO more links -->
          </ProseUl>
        </section>
      </div>
    </UPageBody>
  </div>
</template>
