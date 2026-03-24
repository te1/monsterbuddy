<script setup lang="ts">
  import type { SearchConfig } from '~/services/search';
  import { createReusableTemplate } from '@vueuse/core';
  import { buildDefaultSearch } from '~/services/search';
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
    meta_k: {
      handler: () => (open.value = !open.value),
      usingInput: true,
    },
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

  <UModal
    v-model:open="open"
    title="Search"
    description="Filter results and open a destination. Use arrow keys to move, Enter to select, Escape to close."
  >
    <div class="flex items-center gap-2">
      <div class="sm:hidden">
        <ReuseButtonTemplate v-if="open" />

        <UTooltip v-else text="Search" :kbds="['meta', 'k']">
          <ReuseButtonTemplate />
        </UTooltip>
      </div>

      <UInput
        color="neutral"
        variant="soft"
        icon="ph:magnifying-glass"
        placeholder="Search..."
        aria-label="Search"
        :ui="{ trailing: 'pe-1' }"
        class="hidden w-32 select-none sm:block lg:w-40"
        readonly
      >
        <template #trailing>
          <ClientOnly>
            <div class="hidden items-center gap-0.5 pe-0.5 select-none lg:flex" aria-hidden="true">
              <UKbd value="meta" variant="soft" :ui="{ base: 'bg-default pt-0.5 text-muted' }" />
              <UKbd value="k" variant="soft" :ui="{ base: 'bg-default pt-0.5 text-muted' }" />
            </div>
          </ClientOnly>
        </template>
      </UInput>
    </div>

    <template #content>
      <LazyUCommandPalette
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
            class="size-9"
          />
        </template>
      </LazyUCommandPalette>
    </template>
  </UModal>
</template>
