<script lang="ts" setup>
  import type { CommandPaletteItem } from '@nuxt/ui';
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import { regions } from '~/services/3/data';
  import { statsTypeToText } from '~/services/3/presentation';
  import useMonstieBuildManager from '~/stores/3/monstieBuildManager';

  const props = defineProps<{ build: MonstieBuild }>();

  const open = ref(false);

  const groups = computed(() => {
    const items = regions.map((region) => ({
      label: region.powers.stats.map(statsTypeToText).join(', '),
      suffix: region.name,
      data: region.slug,
    }));

    return [
      {
        id: 'items',
        items: items,
      },
    ];
  });

  type Item = CommandPaletteItem & (typeof groups.value)[0]['items'][number];

  const defaultValue = computed(() => {
    return groups.value[0]?.items.find((item) => item.data === props.build.regionSlug);
  });

  const buildManager = useMonstieBuildManager();

  function onSelect(item: CommandPaletteItem) {
    const item_ = item as Item;

    if (buildManager.build) {
      buildManager.build.regionSlug = item_.data;
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
    title="Select Stat Increases"
    :ui="{
      header: 'min-h-0 justify-between py-1 ps-2.5 pe-1 sm:ps-2.5 sm:pe-1',
      close: 'static',
      body: 'min-h-48 p-0 sm:p-0',
    }"
  >
    <UButton label="Stat Increases" color="neutral" variant="subtle" />

    <template #body>
      <UCommandPalette
        :defaultValue="defaultValue"
        :groups="groups"
        placeholder="Search..."
        :input="input"
        :ui="{}"
        :fuse="{ fuseOptions: { includeMatches: true } }"
        @update:modelValue="onSelect"
      >
      </UCommandPalette>
    </template>
  </UModal>
</template>
