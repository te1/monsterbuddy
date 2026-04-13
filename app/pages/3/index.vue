<script lang="ts" setup>
  const { title } = useAppConfig().seo;
  const subtitle = `Companion App For ${gameTypeToFullLabel('mhst3')}`;
  const headline = gameTypeToFullName('mhst3');

  useSeoMeta({
    titleTemplate: '',
    title: `${title} - ${subtitle}`,
    description:
      'Includes monster attack types and weaknesses, egg patterns, monstie locations and genes',
  });

  defineOgImage(
    'Title',
    {
      title,
      description: subtitle,
      lines: ['Eggs, Monsters', 'Attack Patterns', 'Genes'],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );

  const versions = [
    {
      date: '2026-04-13',
      changes: ['Update gene details with numbers for effects, buffs and debuffs'],
    },
    {
      date: '2026-04-10',
      changes: ['New pages for genes'],
    },
    {
      date: '2026-04-02',
      changes: ['New pages for habitat restoration, regions and areas'],
    },
  ];
</script>

<template>
  <div>
    <AppPageHeader :title="title" :headline="headline">
      <template #description>
        <strong class="font-semibold">Monster Buddy</strong> is a companion app for
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

      <section v-if="versions.length">
        <ProseH3>Recent Changes</ProseH3>

        <ProseUl>
          <ProseLi v-for="version in versions" :key="version.date">
            <div class="flex flex-col">
              <time
                :datetime="version.date"
                class="text-sm text-muted lg:min-w-34"
                v-text="formatDate(version.date)"
              />
              <div v-for="change in version.changes" :key="change" v-text="change" />
            </div>
          </ProseLi>
        </ProseUl>
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
            <AppNuxtLink to="/3/habitats" text="Habitat restoration overview" />
            with permanent, invasive, endangered, feral and calamitous monsters across all regions
            and areas
          </ProseLi>

          <ProseLi>
            <AppNuxtLink to="/3/riding-actions" text="Riding action list" />
            and which monsties will learn them
          </ProseLi>

          <ProseLi>
            <AppNuxtLink to="/3/genes" text="Gene list" />
            with types, monstie sources and effects (including some numbers)
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

            <ProseLi>
              <AppLink
                href="https://docs.google.com/spreadsheets/d/1JvLmNY7l2jOKCk7QbUYmeK87xvzQzXVUJIgFX9bYaqk"
                text="Data Mining"
              />
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://www.reddit.com/r/MonsterHunterStories/comments/1rzobtn/i_made_a_table_documenting_every_single_monsties"
                text="Monstie Stats"
              />
              by <AppLink href="https://www.reddit.com/user/norahike" text="norahike" />
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://www.reddit.com/r/MonsterHunterStories/comments/1s7lq5l/monster_hunter_stories_3_monstie_list_gene_list"
                text="Monsties, Genes, Builder Sheet"
              />
              by <AppLink href="https://www.reddit.com/user/AzuClone" text="AzuClone" />
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://www.reddit.com/r/MonsterHunterStories/comments/1s753dy/wip_guide_to_buffdebuff_strengths_of_various_moves"
                text="Buff/debuff strengths"
              />
              by <AppLink href="https://www.reddit.com/user/DarkestSamus" text="DarkestSamus" />
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://www.reddit.com/r/MonsterHunterStories/comments/1s91lvf/monstie_damage_calc_google_sheets"
                text="Monstie Damage Calc"
              />
              by <AppLink href="https://www.reddit.com/user/rmosley753" text="rmosley753" />
            </ProseLi>
          </ProseUl>
        </section>

        <section>
          <ProseH3>Other great resources</ProseH3>

          <ProseUl>
            <ProseLi>
              <AppLink href="https://manual.capcom.com/mhst3/" text="Official Web Manual" />
            </ProseLi>

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

            <ProseLi>
              <AppLink href="https://lescarnetsdelawycademie.fr/wyvernfell" text="Wyvernfell" />
              by <AppLink href="https://www.reddit.com/user/Masuku68" text="Masuku68" />
            </ProseLi>

            <ProseLi>
              <AppLink
                href="https://www.youtube.com/watch?v=5qy9qVlQzF4&list=PLRcW-_zwHp44_ILzwNX2I0Uv2WQg-sPnU"
                text="RageGamingVideos"
              />
              on YouTube
            </ProseLi>
          </ProseUl>
        </section>
      </div>
    </UPageBody>
  </div>
</template>
