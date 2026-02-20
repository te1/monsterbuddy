<script setup lang="ts">
  const title = 'Monster Buddy';

  useSeoMeta({
    titleTemplate: '',
    title,
    ogTitle: title,
    ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/docs-light.png',
    twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/docs-light.png',
  });
</script>

<template>
  <div>
    <UPageHero orientation="horizontal">
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
        <UButton to="/getting-started" size="xl" trailingIcon="i-lucide-arrow-right">
          Get started
        </UButton>

        <UButton
          icon="i-simple-icons-github"
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

    <UPageSection>
      <template #title>Powered by Nuxt UI components</template>

      <template #links>
        <UButton
          color="neutral"
          size="lg"
          target="_blank"
          to="https://ui.nuxt.com/docs/getting-started/installation/nuxt"
          trailingIcon="i-lucide-arrow-right"
          variant="subtle"
        >
          Explore Nuxt UI
        </UButton>
      </template>

      <template #features>
        <UPageFeature
          icon="i-lucide-palette"
          title="100+ UI Components"
          description="Access the complete Nuxt UI component library. From badges to modals, everything styled and accessible out of the box."
        />

        <UPageFeature
          icon="i-lucide-type"
          title="Beautiful Typography"
          description="Pre-styled prose components with perfect visual harmony. No need for @tailwindcss/typography - get precise control over every element."
        />

        <UPageFeature
          icon="i-lucide-layers"
          title="Rich Prose Components"
          description="Accordions, cards, callouts, tabs, steps, code blocks, and more - all provided by Nuxt UI for interactive documentation."
        />

        <UPageFeature
          icon="i-lucide-search"
          title="Built-in Search"
          description="Full-text search with ContentSearch component. No need for Algolia - instant, relevant results with keyboard shortcuts "
          (⌘K).
        />

        <UPageFeature
          icon="i-lucide-navigation"
          title="Smart Navigation"
          description="Auto-generated navigation with ContentNavigation and ContentToc components. Sticky table of contents and prev/next links."
        />

        <UPageFeature
          icon="i-lucide-moon"
          title="Dark Mode Ready"
          description="Automatic theme switching with smooth transitions. Respects system preferences and remembers user choice."
        />
      </template>
    </UPageSection>
  </div>
</template>
