<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui';

  const items: NavigationMenuItem[] = [
    {
      label: 'Getting Started',
      open: true,
      children: [
        {
          label: 'Introduction',
          icon: 'i-lucide-house',
        },
        {
          label: 'Installation',
          icon: 'i-lucide-download',
        },
        {
          label: 'Usage',
          icon: 'i-lucide-sliders',
        },
      ],
      icon: false,
    },
    {
      label: 'Essentials',
      open: true,
      children: [
        {
          label: 'Markdown Syntax',
          icon: 'i-lucide-heading-1',
        },
        {
          label: 'Code Blocks',
          icon: 'i-lucide-code-xml',
        },
        {
          label: 'Prose Components',
          icon: 'i-lucide-component',
        },
        {
          label: 'Images and Embeds',
          icon: 'i-lucide-image',
        },
      ],
      page: false,
    },
    {
      label: 'AI',
      open: true,
      children: [
        {
          label: 'MCP Server',
          icon: 'i-lucide-cpu',
        },
        {
          label: 'LLMs Integration',
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
          <UNavigationMenu orientation="vertical" highlight :items="items" />
        </UPageAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
