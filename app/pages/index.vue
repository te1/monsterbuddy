<script setup lang="ts">
  import type { ButtonProps } from '@nuxt/ui';

  const title = 'Nuxt Docs Template';
  const description = 'Create stunning, fast and SEO-optimized documentation sites with Nuxt UI.';

  useSeoMeta({
    titleTemplate: '',
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/docs-light.png',
    twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/docs-light.png',
  });

  const links = ref<ButtonProps[]>([
    {
      label: 'Start building',
      to: '/getting-started',
      trailingIcon: 'i-lucide-arrow-right',
    },
    {
      label: 'View on GitHub',
      to: 'https://github.com/nuxt-ui-templates/docs',
      target: '_blank',
      variant: 'subtle',
      icon: 'i-simple-icons-github',
    },
  ]);
</script>

<template>
  <div>
    <UPageHero class="from-neutral-900 to-neutral-950 dark:bg-linear-to-b" orientation="horizontal">
      <template #title>
        Ship Beautiful
        <span class="text-primary">Documentation</span>
        .
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

    <UPageSection class="dark:bg-neutral-950">
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

    <UPageSection class="dark:bg-neutral-950">
      <template #title>Enhanced with Nuxt Content</template>

      <template #links>
        <UButton
          color="neutral"
          size="lg"
          target="_blank"
          to="https://content.nuxt.com/docs/getting-started/installation"
          trailingIcon="i-lucide-arrow-right"
          variant="subtle"
        >
          Explore Nuxt Content
        </UButton>
      </template>

      <template #features>
        <UPageFeature
          icon="i-simple-icons-markdown"
          title="MDC Enhanced Markdown"
          description="Write in Markdown while embedding Vue components. Seamlessly integrate interactive elements in your content."
        />

        <UPageFeature
          icon="i-lucide-file-text"
          title="File-based Routing"
          description="Organize content in folders and files. Your documentation structure automatically becomes your navigation."
        />

        <UPageFeature
          icon="i-lucide-code"
          title="Syntax Highlighting"
          description="Beautiful code blocks with language detection, line numbers, and copy buttons. Support for 100+ languages."
        />

        <UPageFeature
          icon="i-lucide-database"
          title="Content Database"
          description="Query your content with a MongoDB-like API. Filter, sort, and search through your documentation programmatically."
        />

        <UPageFeature
          icon="i-lucide-file-code"
          title="Frontmatter Support"
          description="Add metadata to your content files. Define SEO tags, navigation properties, and custom fields."
        />

        <UPageFeature
          icon="i-lucide-git-branch"
          title="Version Control"
          description="Content lives in your repository. Branch, review, and deploy documentation alongside your code."
        />
      </template>
    </UPageSection>

    <UPageSection class="from-neutral-950 to-neutral-900 dark:bg-linear-to-b">
      <UPageCTA
        :links="links"
        title="Ready to build an amazing documentation?"
        description="Join thousands of developers building with Nuxt and Nuxt UI. Get this template and start shipping today."
        class="dark:bg-neutral-950"
      />
    </UPageSection>
  </div>
</template>
