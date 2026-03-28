<script lang="ts" setup>
  import mhst1Egg from '~/assets/app1.png';
  import mhst2Egg from '~/assets/app2.png';
  import mhst3Egg from '~/assets/app3.webp';

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
        'Eggs',
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
        'Eggs',
        'Attack Patterns',
        "Elder's Lair",
        'Co-Op Quests / Dens',
      ],
    },
    {
      title: gameTypeToShortName('mhst3'),
      to: '/3',
      image: mhst3Egg,
      enabled: true,
      badge: 'New',
      features: [
        //
        'Eggs',
        'Attack Patterns',
      ],
    },
  ];
</script>

<template>
  <div>
    <!-- TODO landing page -->

    <UPageHero
      description="Advanced Monsterpedia to learn or remember information useful during combat and general gameplay"
      orientation="horizontal"
      class="bg-linear-to-b from-transparent to-default"
      :ui="{
        // title: 'text-3xl leading-[1.1] font-medium sm:text-5xl md:text-6xl lg:text-7xl',
        // description: 'max-w-4xl',
        container: 'lg:block',
        title: 'font-medium',
      }"
    >
      <template #title>
        <div>Monster Hunter Stories</div>
        <div class="text-primary">Companion App</div>
      </template>
    </UPageHero>

    <UPageSection class="bg-default">
      <UPageGrid class="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <UPageCard
          v-for="game in games"
          :key="game.title"
          :title="game.title"
          :to="game.to"
          :disabled="!game.enabled"
          variant="outline"
          spotlight
          spotlighCcolor="primary"
          :ui="{
            container: 'relative block min-h-48 overflow-hidden lg:block',
            root: ['ring-2 ring-accented dark:ring-default', game.enabled ? '' : 'opacity-50'],
            title: 'font-medium',
            description: 'text-default dark:text-toned',
            spotlight: 'bg-white/90 dark:bg-neutral-950/90',
          }"
        >
          <template #description>
            <ProseUl class="marker:text-dimmed dark:marker:text-muted">
              <ProseLi v-for="feature in game.features" :key="feature">
                {{ feature }}
              </ProseLi>
            </ProseUl>
          </template>

          <div
            class="pointer-events-none absolute right-[-154px] bottom-[-154px] size-[350px] -rotate-23 opacity-80 select-none dark:opacity-60"
          >
            <img :src="game.image" :alt="game.title" class="size-full object-cover" />
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

      <AppTrinity class="mx-auto" />
    </UPageSection>

    <UPageSection class="bg-linear-to-b from-default to-transparent">
      <template #title>Powered by Nuxt UI components</template>

      <template #features>
        <UPageFeature
          icon="ph:palette"
          title="100+ UI Components"
          description="Access the complete Nuxt UI component library. From badges to modals, everything styled and accessible out of the box."
        />

        <UPageFeature
          icon="ph:text-t"
          title="Beautiful Typography"
          description="Pre-styled prose components with perfect visual harmony. No need for @tailwindcss/typography - get precise control over every element."
        />

        <UPageFeature
          icon="ph:stack"
          title="Rich Prose Components"
          description="Accordions, cards, callouts, tabs, steps, code blocks, and more - all provided by Nuxt UI for interactive documentation."
        />

        <UPageFeature
          icon="ph:magnifying-glass"
          title="Built-in Search"
          description="Full-text search with ContentSearch component. No need for Algolia - instant, relevant results with keyboard shortcuts "
          (⌘K).
        />

        <UPageFeature
          icon="ph:navigation-arrow"
          title="Smart Navigation"
          description="Auto-generated navigation with ContentNavigation and ContentToc components. Sticky table of contents and prev/next links."
        />

        <UPageFeature
          icon="ph:moon"
          title="Dark Mode Ready"
          description="Automatic theme switching with smooth transitions. Respects system preferences and remembers user choice."
        />
      </template>
    </UPageSection>

    <div
      class="pointer-events-none fixed right-[calc(-154px+var(--scrollbar-width,0px))] bottom-[-154px] -z-10 size-[448px] -rotate-23 overflow-hidden opacity-10 select-none lg:right-[calc(-192px+var(--scrollbar-width,0px))] lg:bottom-[-192px] lg:opacity-80 dark:opacity-5 dark:lg:opacity-60"
    >
      <img
        :src="mhst2Egg"
        alt="Monster Buddy"
        class="size-full object-cover"
        fetchpriority="high"
      />
    </div>
  </div>
</template>
