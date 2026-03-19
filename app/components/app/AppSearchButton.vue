<script setup lang="ts">
  import { createReusableTemplate } from '@vueuse/core';
  import { buildDefaultSearch, type SearchConfig } from '~/services/search';
  import { buildMhst1Search } from '~/services/1/search';
  import { buildMhst2Search } from '~/services/2/search';
  import { buildMhst3Search } from '~/services/3/search';

  const appConfig = useAppConfig();
  const route = useRoute();

  const [DefineButtonTemplate, ReuseButtonTemplate] = createReusableTemplate();

  const open = ref(false);

  const gameType = computed(() => routePathToGameType(route.path));

  const searchConfig = computed<SearchConfig>(() => {
    switch (gameType.value) {
      case 'mhst1':
        return buildMhst1Search(appConfig.seo.title);

      case 'mhst2':
        return buildMhst2Search(appConfig.seo.title);

      case 'mhst3':
        return buildMhst3Search(appConfig.seo.title);

      default:
        return buildDefaultSearch(appConfig.seo.title);
    }
  });

  defineShortcuts({
    meta_k: () => (open.value = !open.value),
  });

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
  <DefineButtonTemplate>
    <UButton
      :icon="appConfig.ui.icons.search"
      color="neutral"
      variant="ghost"
      aria-label="Search"
    />
  </DefineButtonTemplate>

  <UModal v-model:open="open">
    <ReuseButtonTemplate v-if="open" />

    <UTooltip v-else text="Search" :kbds="['meta', 'k']">
      <ReuseButtonTemplate />
    </UTooltip>

    <template #content>
      <UCommandPalette
        :groups="searchConfig.groups"
        placeholder="Search anything..."
        class="h-[85dvh] lg:h-120"
        :input="input"
        close
        selectedIcon=" "
        :ui="{ item: 'items-center', itemLabelSuffix: 'hidden' }"
        :fuse="{ fuseOptions: { includeMatches: true }, resultLimit: 10 }"
        @update:open="open = $event"
        @update:modelValue="open = false"
      >
        <template v-if="searchConfig.monsterIconComponent" #monsters-leading="{ item }">
          <component
            :is="searchConfig.monsterIconComponent"
            :monster="item.data"
            noTooltip
            class="size-8"
          />
        </template>
      </UCommandPalette>
    </template>
  </UModal>
</template>
