<script lang="ts" setup>
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
      game: 'mhst2',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );
</script>

<template>
  <div class="bg-neutral-200">
    <UPageHero
      orientation="horizontal"
      class="bg-linear-to-b from-white to-neutral-100 dark:from-neutral-900 dark:to-neutral-950"
    >
      <template #title>
        Ship Beautiful
        <span class="text-primary">Documentation</span>
      </template>

      <template #description>
        Build professional documentation with Nuxt UI's powerful components, enhanced typography,
        and seamless Nuxt Content integration. The same system trusted by the entire
        <a href="https://nuxt.com">Nuxt ecosystem</a>
        .
      </template>

      <template #links>
        <UButton to="/" size="xl" trailingIcon="ph:arrow-right">Get started</UButton>

        <UButton
          icon="simple-icons:github"
          color="neutral"
          variant="outline"
          size="xl"
          to="https://github.com/nuxt-ui-templates/docs"
          target="_blank"
        >
          Use this template
        </UButton>
      </template>
    </UPageHero>

    <UPageSection
      class="bg-linear-to-b from-neutral-100 to-white dark:from-neutral-950 dark:to-neutral-900"
    >
      <template #title>Powered by Nuxt UI components</template>

      <template #links>
        <UButton
          color="neutral"
          size="lg"
          target="_blank"
          to="https://ui.nuxt.com/docs/getting-started/installation/nuxt"
          trailingIcon="ph:arrow-right"
          variant="subtle"
        >
          Explore Nuxt UI
        </UButton>
      </template>

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
  </div>
</template>
