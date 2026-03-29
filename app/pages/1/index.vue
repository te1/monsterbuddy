<script lang="ts" setup>
  const { title } = useAppConfig().seo;
  const subtitle = `Companion App For ${gameTypeToFullLabel('mhst1')} 1`;
  const headline = gameTypeToFullName('mhst1');

  useSeoMeta({
    titleTemplate: '',
    title: `${title} - ${subtitle}`,
    description:
      'Includes monster attack types and weaknesses, egg patterns, monstie locations and retreat conditions',
  });

  defineOgImage(
    'Title',
    {
      title,
      description: subtitle,
      lines: ['Eggs', 'Monsters', 'Attack Patterns'],
      game: 'mhst1',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );
</script>

<template>
  <div>
    <AppPageHeader :title="title" :headline="headline">
      <template #description>
        <strong class="font-semibold">Monster Buddy</strong> is a companion app for
        <AppLink href="https://www.monsterhunter.com/stories" text="Monster Hunter Stories 1" />
        that can help you learn or remember information useful during combat and general gameplay.
        It's not a complete guide, walkthrough or advanced character / gene planner. You can use it
        for all versions like the Remastered, iOS, Android and original on the Nintendo 3DS.
      </template>
    </AppPageHeader>

    <UPageBody class="flex flex-col gap-8">
      <section class="mt-4 -mb-4 flex flex-col items-center">
        <AppTrinity />
      </section>

      <UAlert color="neutral" variant="soft-bg">
        <template #description>
          Looking for the classic version of Monster Buddy? It's still available at
          <AppLink href="https://mhst1.monsterbuddy.app" text="mhst1.monsterbuddy.app" />
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
            <AppNuxtLink to="/1/monsters" text="Monster list" />
            with attack patterns, weapon and elemental weaknesses
          </ProseLi>

          <ProseLi>
            <AppNuxtLink to="/1/monsties" text="Monstie list" />
            with attack tendencies, retreat conditions, locations and stats
          </ProseLi>

          <ProseLi>
            <AppNuxtLink to="/1/eggs" text="Visual egg list" />
            with search, sorting and filtering
          </ProseLi>

          <ProseLi>
            <AppNuxtLink to="/1/tower-of-illusion" text="Tower of Illusion overview" />
            to quickly find high rank monsters on each floor
          </ProseLi>

          <ProseLi>
            <AppNuxtLink to="/1/riding-actions" text="Riding action list" />
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
              <AppLink
                href="https://monsterhunter.fandom.com/wiki/Monster_Hunter_Wiki"
                text="Monster Hunter Wiki"
              />
            </ProseLi>

            <ProseLi>
              <AppLink href="https://mhst.kiranico.com" text="MHStories" />
              by Kiranico
            </ProseLi>

            <ProseLi>
              <AppLink href="https://www.pondryhills.com/Eggs" text="pondryhills.com" />
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://gamefaqs.gamespot.com/3ds/146555-monster-hunter-stories/faqs/74891"
                text="Egg List (3DS)"
              />
              by Jadebell
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://www.gameskinny.com/tips/monster-hunter-stories-guide-all-egg-patterns-and-locations"
                text="All Egg Patterns and Locations"
              />
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://www.reddit.com/r/MonsterHunterStories/comments/1dfkkc7/monster_hunter_stories_mega_spreadsheet/"
                text="Mega Spreadsheet"
              />
              by
              <AppLink href="https://www.reddit.com/user/AleHitti" text="AleHitti" />
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://www.reddit.com/r/MonsterHunterStories/comments/1disa4v/mhst_1_and_2_monstie_builder"
                text="Monstie Builder"
              />
              by
              <AppLink href="https://www.reddit.com/user/AtapelierArt" text="AtapelierArt" />
            </ProseLi>
          </ProseUl>
        </section>

        <section>
          <ProseH3>Other great resources</ProseH3>

          <ProseUl>
            <ProseLi>
              <AppLink
                href="https://game.capcom.com/manual/MHST_Multi"
                text="Official Web Manual"
              />
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://www.reddit.com/r/MonsterHunterStories/comments/m17vcj/every_monster_in_stories_1_and_how_well_they/"
                text="Every monster and how well they perform"
              />
              by
              <AppLink href="https://www.reddit.com/user/DreadAndDonuts" text="DreadAndDonuts" />
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://www.reddit.com/r/MonsterHunterStories/comments/1ra5o3r/endgame_achievement_guide_for_monster_hunter/"
                text="Endgame / Achievement Guide"
              />
              by
              <AppLink href="https://www.reddit.com/user/vecttor" text="vecttor" />
            </ProseLi>
          </ProseUl>
        </section>
      </div>
    </UPageBody>
  </div>
</template>
