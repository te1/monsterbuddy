<script lang="ts" setup>
  import type { NavigationMenuItem } from '@nuxt/ui';

  const items = ref<NavigationMenuItem[]>([
    {
      label: 'Monsters',
      to: '/2/monsters',
    },
    {
      label: 'Monsties',
      to: '/2/monsties',
    },
    {
      label: 'Eggs',
      to: '/2/eggs',
    },
    {
      label: 'More',
      children: [
        {
          label: 'Catavan Stands',
          to: '/2/catavan-stands',
        },
        {
          label: "Elder's Lair",
          to: '/2/elders-lair',
        },
        {
          label: 'Co-Op Quests',
          to: '/2/coop',
        },
        {
          label: 'Riding Actions',
          to: '/2/riding-actions',
        },
      ],
    },
  ]);
</script>

<template>
  <UNavigationMenu
    :items="items"
    :ui="{ link: 'px-10' }"
    highlight
    variant="link"
    contentOrientation="vertical"
  />
</template>
