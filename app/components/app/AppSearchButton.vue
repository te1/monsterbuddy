<script setup lang="ts">
  import { createReusableTemplate } from '@vueuse/core';

  const appConfig = useAppConfig();

  const [DefineButtonTemplate, ReuseButtonTemplate] = createReusableTemplate();

  const open = ref(false);

  defineShortcuts({
    meta_k: {
      handler: () => (open.value = !open.value),
      usingInput: true,
    },
  });
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
    :ui="{ header: 'hidden', body: 'p-0 sm:p-0', footer: 'p-0 sm:p-0' }"
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
        :ui="{ trailing: 'pe-1', base: 'bg-elevated dark:bg-elevated/50' }"
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

    <template #body>
      <div class="h-[85dvh] lg:h-120">
        <LazyAppSearchCommandPalette v-model="open" />
      </div>
    </template>

    <template #footer>
      <div class="hidden gap-4 p-2 text-toned sm:flex dark:text-dimmed">
        <span class="flex items-center gap-1">
          <UKbd value="up" variant="subtle" size="lg" class="px-1.5 text-toned" />
          <UKbd value="down" variant="subtle" size="lg" class="px-1.5 text-toned" /> to navigate
        </span>
        <span class="flex items-center gap-1">
          <UKbd value="enter " variant="subtle" size="lg" class="px-1.5 text-toned" />
          to select
        </span>
        <span class="flex items-center gap-1">
          <UKbd value="esc" variant="subtle" size="lg" class="px-1.5 text-toned" />
          to close
        </span>
      </div>
    </template>
  </UModal>
</template>
