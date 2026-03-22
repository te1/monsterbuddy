<script lang="ts" setup>
  const { title } = useAppConfig().seo;
  const subtitle = `Companion App For ${gameTypeToFullLabel('mhst2')}`;
  const headline = gameTypeToFullName('mhst2');

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
      game: 'mhst2',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );
</script>

<template>
  <div>
    <AppPageHeader :title="title" :headline="headline">
      <template #description>
        <strong class="font-medium">Monster Buddy</strong> is a companion app for
        <AppLink href="https://www.monsterhunter.com/stories2" text="Monster Hunter Stories 2" />
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
          Looking for the classic version of Monster Buddy? It's still available at
          <AppLink href="https://mhst2.monsterbuddy.app" text="mhst2.monsterbuddy.app" />
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
            <AppNuxtLink to="/2/monsters" text="Monster list" />
            with attack patterns, weapon and elemental weaknesses
          </ProseLi>

          <ProseLi>
            <AppNuxtLink to="/2/monsties" text="Monstie list" />
            with attack types, retreat conditions, locations and stats
          </ProseLi>

          <ProseLi>
            <AppNuxtLink to="/2/eggs" text="Visual egg list" />
            with search, sorting and filtering
          </ProseLi>

          <ProseLi>
            <AppNuxtLink to="/2/catavan-stands" text="Catavan stands" />
            with list of monsters you will find nearby
          </ProseLi>

          <ProseLi>
            <AppNuxtLink to="/2/elders-lair" text="Elder's Lair overview" />
            to quickly find high rank monsters on each floor
          </ProseLi>

          <ProseLi>
            <AppNuxtLink to="/2/coop" text="Co-Op quest list" />
            to see which eggs will be available in the different dens
          </ProseLi>

          <ProseLi>
            <AppNuxtLink to="/2/riding-actions" text="Riding action list" />
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
            <ProseLi>In-game field guide</ProseLi>

            <ProseLi>
              <AppLink
                href="https://monsterhunter.fandom.com/wiki/Monster_Hunter_Wiki"
                text="Monster Hunter Wiki"
              />
              shout-out to
              <AppLink href="https://monsterhunter.fandom.com/wiki/User:YukiHerz" text="YukiHerz" />
            </ProseLi>

            <ProseLi>
              <AppLink href="https://mhst.kiranico.com/mhs2" text="MHStories 2" />
              by Kiranico
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://docs.google.com/spreadsheets/d/1QzM9X34IfACPtRa_yWq2BZUidWJqs0l2K_Gs2023bO0"
                text="MHStories 2 data"
              />
              by <AppLink href="https://www.reddit.com/user/iSharingan" text="iSharingan" />
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://www.reddit.com/r/MonsterHunterStories/comments/oo8fpi/monster_attacktype_chart"
                text="Monster Attack-Type Chart"
              />
              by
              <AppLink href="https://www.reddit.com/user/RPGwannabe" text="RPGwannabe" />
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://www.reddit.com/r/MonsterHunterStories/comments/p8h25d/all_high_rank_monsters_in_each_zone_of_the_elder"
                text="All High Rank Monsters in Elder's Lair"
              />
              by
              <AppLink href="https://www.reddit.com/user/PetePeterson53" text="PetePeterson53" />
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://docs.google.com/spreadsheets/d/1ayBCZ7WrkXniGTjKlkf7JFTzJA_0ZcaLYf5A_MEhxN4"
                text="MHS2"
              />
              by
              <AppLink href="https://www.reddit.com/user/dorgesilas" text="dorgesilas" />
            </ProseLi>

            <ProseLi>
              Missing data provided by
              <AppLink href="https://www.reddit.com/user/DerMotze" text="DerMotze" />
            </ProseLi>
          </ProseUl>
        </section>

        <section>
          <ProseH3>Other great resources</ProseH3>

          <ProseUl>
            <ProseLi>
              <AppLink href="https://game.capcom.com/manual/MHST2" text="Official Web Manual" />
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://docs.google.com/spreadsheets/d/1O1SZ_p9EFBmu7O9WbmvHISE82ZqVHWWV95vHRHZ3r1M"
                text="All-in-one spreadsheet"
              />
              by
              <AppLink href="https://www.reddit.com/user/aericee" text="Riikapii" />
            </ProseLi>

            <ProseLi>
              <AppLink href="https://www.youtube.com/@ArekkzGaming" text="Arekkz Gaming" /> on
              YouTube
            </ProseLi>

            <ProseLi>
              <AppLink href="https://www.youtube.com/@RageGamingVideos" text="RageGamingVideos" />
              on YouTube
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://www.youtube.com/channel/UCj5rxzvXpiPASGNw4-z_BbA"
                text="Tidus69"
              />
              on YouTube
            </ProseLi>
          </ProseUl>
        </section>
      </div>
    </UPageBody>
  </div>
</template>
