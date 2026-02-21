<script lang="ts" setup>
  import type { DropdownMenuItem } from '@nuxt/ui';

  const gameType = computed(() => routePathToGameType(useRoute().path));
  const label = computed(() => gameTypeToShortLabel(gameType.value));
  const title = computed(() => gameTypeToFullName(gameType.value));

  const items = ref<DropdownMenuItem[]>([
    {
      label: gameTypeToFullLabel('mhst1'),
      description: gameTypeToDescription('mhst1'),
      to: '/1',
    },
    {
      label: gameTypeToFullLabel('mhst2'),
      description: gameTypeToDescription('mhst2'),
      to: '/2',
    },
    {
      label: gameTypeToFullLabel('mhst3'),
      description: gameTypeToDescription('mhst3'),
      to: '/3',
    },
  ]);
</script>

<template>
  <UDropdownMenu v-slot="{ open }" :items="items" :modal="false" :content="{ align: 'end' }">
    <UButton
      :label="label"
      :title="title"
      color="neutral"
      variant="ghost"
      class="w-18 justify-center"
      :class="[open && 'bg-elevated']"
    />
  </UDropdownMenu>
</template>
