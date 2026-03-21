<script lang="ts" setup>
  import type { DropdownMenuItem } from '@nuxt/ui';
  import { createReusableTemplate } from '@vueuse/core';

  const [DefineButtonTemplate, ReuseButtonTemplate] = createReusableTemplate<{ open: boolean }>();

  const route = useRoute();
  const gameType = computed(() => routePathToGameType(route.path));
  const label = computed(() => gameTypeToShortLabel(gameType.value));
  const tooltip = computed(() => gameTypeToFullName(gameType.value));

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
  <DefineButtonTemplate v-slot="{ open }">
    <UButton
      :label="label"
      color="neutral"
      variant="ghost"
      class="w-17 justify-center"
      :class="[open && 'bg-elevated']"
      :ui="{ base: 'px-1.5 font-normal' }"
    />
  </DefineButtonTemplate>

  <UDropdownMenu v-slot="{ open }" :items="items" :modal="false" :content="{ align: 'end' }">
    <span class="inline-flex">
      <ReuseButtonTemplate v-if="open" :open="open" />

      <UTooltip v-else :text="tooltip">
        <ReuseButtonTemplate :open="open" />
      </UTooltip>
    </span>
  </UDropdownMenu>
</template>
