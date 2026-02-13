<script setup lang="ts">
  import type { ContentNavigationItem } from '@nuxt/content';

  const navigation: ContentNavigationItem[] = [
    {
      title: 'Getting Started',
      path: '/getting-started',
      stem: '1.getting-started/1.index',
      children: [
        {
          title: 'Introduction',
          path: '/getting-started',
          stem: '1.getting-started/1.index',
          icon: 'i-lucide-house',
        },
        {
          title: 'Installation',
          path: '/getting-started/installation',
          stem: '1.getting-started/2.installation',
          icon: 'i-lucide-download',
        },
        {
          title: 'Usage',
          path: '/getting-started/usage',
          stem: '1.getting-started/3.usage',
          icon: 'i-lucide-sliders',
        },
      ],
      icon: false,
    },
    {
      title: 'Essentials',
      path: '/essentials',
      stem: '2.essentials',
      children: [
        {
          title: 'Markdown Syntax',
          path: '/essentials/markdown-syntax',
          stem: '2.essentials/1.markdown-syntax',
          icon: 'i-lucide-heading-1',
        },
        {
          title: 'Code Blocks',
          path: '/essentials/code-blocks',
          stem: '2.essentials/2.code-blocks',
          icon: 'i-lucide-code-xml',
        },
        {
          title: 'Prose Components',
          path: '/essentials/prose-components',
          stem: '2.essentials/3.prose-components',
          icon: 'i-lucide-component',
        },
        {
          title: 'Images and Embeds',
          path: '/essentials/images-embeds',
          stem: '2.essentials/4.images-embeds',
          icon: 'i-lucide-image',
        },
      ],
      page: false,
    },
    {
      title: 'AI',
      path: '/ai',
      stem: '3.ai',
      children: [
        {
          title: 'MCP Server',
          path: '/ai/mcp',
          stem: '3.ai/1.mcp',
          icon: 'i-lucide-cpu',
        },
        {
          title: 'LLMs Integration',
          path: '/ai/llms',
          stem: '3.ai/2.llms',
          icon: 'i-lucide-message-circle-code',
        },
      ],
      page: false,
    },
  ];
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UPageAside>
          <UContentNavigation highlight :navigation="navigation" />
        </UPageAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
