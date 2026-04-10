<script setup lang="ts">
  import type { SearchConfig } from '~/services/search';

  const appConfig = useAppConfig();
  const route = useRoute();

  const open = defineModel<boolean>({ required: true });

  const gameType = computed(() => routePathToGameType(route.path));

  const searchConfig = ref<SearchConfig | null>(null);

  async function updateSearchConfig() {
    switch (gameType.value) {
      case 'mhst1': {
        const { buildMhst1Search } = await import('~/services/1/search');
        searchConfig.value = buildMhst1Search(appConfig.seo.title);
        break;
      }

      case 'mhst2': {
        const { buildMhst2Search } = await import('~/services/2/search');
        searchConfig.value = buildMhst2Search(appConfig.seo.title);
        break;
      }
      case 'mhst3': {
        const { buildMhst3Search } = await import('~/services/3/search');
        searchConfig.value = buildMhst3Search(appConfig.seo.title);
        break;
      }

      default: {
        const { buildDefaultSearch } = await import('~/services/search');
        searchConfig.value = buildDefaultSearch(appConfig.seo.title);
        break;
      }
    }
  }

  watch(gameType, updateSearchConfig, { immediate: true });

  // restore normal handling of home/end keys in UInput
  function onKeydownCapture(e: KeyboardEvent) {
    if (e.key === 'Home' || e.key === 'End') {
      e.stopImmediatePropagation();
    }
  }

  // type gymnastics so we can pass event listeners to UInput
  const input = { onKeydownCapture } as Record<string, unknown>;
</script>

<template>
  <ClientOnly>
    <UCommandPalette
      v-if="searchConfig"
      :groups="searchConfig.groups"
      placeholder="Search anything..."
      class="h-full"
      :input="input"
      close
      selectedIcon=" "
      :ui="{ item: 'items-center', itemLabelSuffix: 'hidden' }"
      :fuse="{ fuseOptions: { includeMatches: true }, resultLimit: 10 }"
      hydrateOnIdle
      @update:open="open = $event"
      @update:modelValue="open = false"
    >
      <template v-if="searchConfig.monsterIconComponent" #monsters-leading="{ item }">
        <component
          :is="searchConfig.monsterIconComponent"
          :monster="item.data"
          noTooltip
          class="size-9"
        />
      </template>

      <template v-if="searchConfig.geneIconComponent" #genes-leading="{ item }">
        <component :is="searchConfig.geneIconComponent" :gene="item.data" noTooltip size="size-9" />
      </template>
    </UCommandPalette>
  </ClientOnly>
</template>
