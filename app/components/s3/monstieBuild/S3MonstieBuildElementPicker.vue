<script lang="ts" setup>
  import type { CommandPaletteItem } from '@nuxt/ui';
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import { allElements } from '~/services/3/data';
  import useMonstieBuildManager from '~/stores/3/monstieBuildManager';

  const props = defineProps<{ build: MonstieBuild }>();

  const open = ref(false);

  const groups = computed(() => {
    const items = [null, ...allElements].map((element) => ({
      label: element ? formatElement(element) : 'No second element',
      data: element,
    }));

    return [
      {
        id: 'items',
        slot: 'items',
        items: items,
      },
    ];
  });

  type Item = CommandPaletteItem & (typeof groups.value)[0]['items'][number];

  const defaultValue = computed(() => {
    return groups.value[0]?.items.find((item) => item.data === props.build.dualElement);
  });

  const buildManager = useMonstieBuildManager();

  function onSelect(item: CommandPaletteItem) {
    const item_ = item as Item;

    if (buildManager.build) {
      buildManager.build.dualElement = item_.data;
      buildManager.saveBuild(buildManager.build);
    }

    open.value = false;
  }

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
  <UModal
    v-model:open="open"
    title="Select Dual Element"
    :ui="{
      header: 'min-h-0 justify-between py-1 ps-2.5 pe-1 sm:ps-2.5 sm:pe-1',
      close: 'static',
      body: 'p-0 sm:p-0',
    }"
  >
    <UButton label="Dual Element" color="neutral" variant="subtle" />

    <template #body>
      <div class="h-[calc(80dvh-41px)] max-h-[360px]">
        <UCommandPalette
          :defaultValue="defaultValue"
          :groups="groups"
          placeholder="Search..."
          class="h-full"
          :input="input"
          :ui="{ item: 'items-center' }"
          :fuse="{ fuseOptions: { includeMatches: true } }"
          @update:modelValue="onSelect"
        >
          <template #items-leading="{ item }">
            <ElementIcon v-if="item.data" :element="item.data" noTooltip icon2 />
            <UIcon v-else name="ph:circle-dashed-light" class="m-0.5 size-6.5" />
          </template>
        </UCommandPalette>
      </div>
    </template>
  </UModal>
</template>
