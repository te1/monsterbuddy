<script lang="ts" setup>
  import mhst1Egg from '~/assets/1/monsterbuddy.png';
  import mhst2Egg from '~/assets/2/monsterbuddy.png';
  import mhst3Egg from '~/assets/3/monsterbuddy.avif';
  import mhst3EggSm from '~/assets/3/monsterbuddy-sm.avif';

  const { description, title } = useAppConfig().seo;

  definePageMeta({
    layout: false,
  });

  useSeoMeta({
    titleTemplate: '',
    title: `${title} - Companion App For Monster Hunter Stories`,
    description,
  });

  defineOgImage(
    'Title',
    {
      title,
      description: 'Companion App For Monster Hunter Stories',
      lines: ['Eggs, Monsters, Attack Patterns', `**NEW** ${gameTypeToShortName('mhst3')}`],
      game: 'mhst2', // match general favicon (mhst2 for now)
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );

  const games = [
    {
      title: gameTypeToShortName('mhst1'),
      to: '/1',
      image: mhst1Egg,
      enabled: false,
      badge: 'Soon™',
      features: [
        //
        'Eggs, Monsters',
        'Attack Patterns',
        'Tower of Illusion',
      ],
    },
    {
      title: gameTypeToShortName('mhst2'),
      to: '/2',
      image: mhst2Egg,
      enabled: true,
      features: [
        //
        'Eggs, Monsters',
        'Attack Patterns',
        "Elder's Lair",
        'Co-Op Quests / Dens',
      ],
    },
    {
      title: gameTypeToShortName('mhst3'),
      to: '/3',
      image: mhst3EggSm,
      srcset: `${mhst3Egg} 2x`,
      enabled: true,
      badge: 'New',
      features: [
        //
        'Eggs, Monsters',
        'Attack Patterns',
        // 'Habitat Restoration',
        // 'Genes, Skills',
      ],
    },
  ];

  const features = [
    {
      title: 'Monsters',
      icon: 'ph:list-numbers',
      lines: ['Attack Patterns', 'Elemental Weaknesses', 'Weapon Effectiveness'],
    },
    {
      title: 'Monsties',
      icon: 'ph:list-dashes',
      lines: ['Attack Types & Elements', 'Stats', 'Riding Actions'],
    },
    {
      title: 'Egg Guide',
      icon: 'ph:egg',
      lines: ['Egg Patterns', 'Colors', 'Egg Finder'],
    },
    {
      title: 'Locations',
      icon: 'ph:map-pin-fill',
      lines: ['Habitats', 'Catavan Stands', 'Dens'],
    },
    {
      title: 'End Game',
      icon: 'ph:castle-turret',
      lines: ['Tower of Illusion', 'Co-Op Quests', "Elder's Lair"],
    },
    {
      title: 'Data',
      icon: 'ph:database',
      lines: ['Search', 'Sort', 'Filter'],
    },
    {
      title: 'Quick Access',
      icon: 'ph:arrow-fat-right',
      lines: ['Bookmarks', 'Recently Viewed', 'Related Entries'],
    },
  ];
</script>

<template>
  <div>
    <UPageHero
      description="A practical field guide to the monsters, locations, and mechanics across your adventures"
      orientation="horizontal"
      class="@container bg-linear-to-b from-transparent to-default"
      :ui="{
        container: 'pt-6 pb-3 sm:pt-12 sm:pb-3 lg:block lg:pt-24 lg:pb-3',
        title: 'text-3xl @lg:text-4xl @xl:text-4xl @2xl:text-5xl @4xl:text-6xl',
        description: 'text-lg @lg:text-xl @4xl:text-2xl',
      }"
    >
      <template #title>
        <div>Monster Hunter Stories</div>
        <div class="text-primary">Companion App</div>
      </template>
    </UPageHero>

    <UPageSection class="bg-default" title="Games">
      <UPageGrid
        class="gap-4 sm:grid-cols-1 sm:gap-6 md:grid-cols-2 md:gap-4 lg:grid-cols-2 xl:grid-cols-3"
      >
        <UPageCard
          v-for="game in games"
          :key="game.title"
          :to="game.to"
          :disabled="!game.enabled"
          variant="outline"
          spotlight
          spotlighCcolor="primary"
          :ui="{
            container: 'relative block min-h-46 overflow-hidden lg:block',
            root: [
              'ring-2 ring-accented dark:ring-default',
              game.enabled ? 'hover:ring-inverted/30 dark:hover:ring-muted' : 'opacity-50',
            ],
            title: 'font-medium',
            description: 'text-default dark:text-toned',
            spotlight: 'bg-white/90 dark:bg-neutral-950/90',
          }"
        >
          <template #title>
            <h3 v-text="game.title" />
          </template>

          <template #description>
            <ProseUl>
              <ProseLi v-for="feature in game.features" :key="feature" class="leading-relaxed">
                {{ feature }}
              </ProseLi>
            </ProseUl>
          </template>

          <div
            class="pointer-events-none absolute right-[-154px] bottom-[-154px] size-[350px] -rotate-23 opacity-80 select-none dark:opacity-60"
          >
            <img
              :src="game.image"
              :srcset="game.srcset"
              :alt="game.title"
              class="size-full object-cover"
            />
          </div>

          <div v-if="game.badge" class="absolute right-2 bottom-2">
            <UBadge
              :label="game.badge"
              color="neutral"
              variant="soft"
              class="bg-inverted/75 font-normal tracking-widest text-inverted uppercase dark:bg-default/75 dark:text-default"
            />
          </div>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <UPageSection class="bg-default" title="Holy Trinity of Combat">
      <AppTrinity class="mx-auto" />
    </UPageSection>

    <UPageSection
      class="bg-linear-to-b from-default to-transparent"
      title="Features"
      :ui="{
        features:
          'gap-4 sm:gap-6 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:mx-auto xl:w-fit xl:grid-cols-[repeat(4,max-content)] xl:gap-x-24',
      }"
    >
      <template #features>
        <UPageFeature
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          :icon="feature.icon"
        >
          <template #description>
            <div v-for="line in feature.lines" :key="line" class="leading-relaxed">
              {{ line }}
            </div>
          </template>
        </UPageFeature>
      </template>
    </UPageSection>

    <div
      class="pointer-events-none fixed right-[calc(-154px+var(--scrollbar-width,0px))] bottom-[-154px] -z-10 size-[448px] -rotate-23 overflow-hidden opacity-10 select-none lg:right-[calc(-192px+var(--scrollbar-width,0px))] lg:bottom-[-192px] lg:opacity-80 dark:opacity-5 dark:lg:opacity-60"
    >
      <div class="size-full bg-cover bg-center" :style="`background-image: url(${mhst2Egg})`" />
    </div>
  </div>
</template>
