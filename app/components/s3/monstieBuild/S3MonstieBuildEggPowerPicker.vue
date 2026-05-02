<script lang="ts" setup>
  import type { CommandPaletteItem } from '@nuxt/ui';
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import { sortBy } from 'es-toolkit/array';
  import { eggPowers } from '~/services/3/data';
  import useMonstieBuildManager from '~/stores/3/monstieBuildManager';

  const props = defineProps<{
    build: MonstieBuild;
    index: 0 | 1 | 2;
  }>();

  const open = ref(false);

  const rankOrder = new Map(['S', 'A', 'B'].map((rank, index) => [rank, index]));

  const groups = computed(() => {
    const items = eggPowers.map((eggPower) => ({
      label: eggPower.name,
      suffix: eggPower.variants[0]?.description,
      data: eggPower,
      disabled: props.build.eggPowerSlugs.includes(eggPower.slug),
    }));

    const available = sortBy(
      items.filter((item) => !item.disabled),
      [(item) => rankOrder.get(item.data.rank)!]
    );

    const selected = sortBy(
      items.filter((item) => item.disabled),
      [(item) => props.build.eggPowerSlugs.indexOf(item.data.slug)]
    );

    return [
      {
        id: 'available',
        label: 'Available',
        slot: 'items',
        items: available,
      },
      {
        id: 'selected',
        label: 'Already Selected',
        slot: 'items',
        items: selected,
      },
    ];
  });

  type Item = CommandPaletteItem & (typeof groups.value)[0]['items'][number];

  const defaultValue = computed(() => {
    return groups.value[1]?.items.find(
      (item) => item.data.slug === props.build.eggPowerSlugs[props.index]
    );
  });

  const buildManager = useMonstieBuildManager();

  function onSelect(item: CommandPaletteItem) {
    const _item = item as Item;

    if (buildManager.build) {
      buildManager.build.eggPowerSlugs[props.index] = _item.data.slug;
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
    title="Select Egg Powers"
    :ui="{
      header: 'min-h-0 justify-between py-1 ps-2.5 pe-1 sm:ps-2.5 sm:pe-1',
      close: 'static',
      body: 'min-h-89 p-0 sm:p-0',
    }"
  >
    <UButton label="Egg Power" color="neutral" variant="subtle" />

    <template #body>
      <UCommandPalette
        :defaultValue="defaultValue"
        :groups="groups"
        placeholder="Search..."
        :input="input"
        :ui="{ item: 'items-center' }"
        :fuse="{ fuseOptions: { includeMatches: true } }"
        @update:modelValue="onSelect"
      >
        <template #items-leading="{ item }">
          <S3EggPowerIcon :eggPower="item.data" big contrast />
        </template>

        <!--
        <template #items-label="{ item }">
          <span
            v-if="item.labelHtml"
            data-slot="itemLabelBase"
            :class="
              ui.itemLabelBase({
                class: [uiProp?.itemLabelBase, item.ui?.itemLabelBase],
                active: active || item.active,
              })
            "
            v-html="item.labelHtml"
          />
          <span
            v-else
            data-slot="itemLabelBase"
            :class="
              ui.itemLabelBase({
                class: [uiProp?.itemLabelBase, item.ui?.itemLabelBase],
                active: active || item.active,
              })
            "
          >
            {{ item.label }}
          </span>

          <span
            v-if="item.suffixHtml"
            data-slot="itemLabelSuffix"
            :class="
              ui.itemLabelSuffix({
                class: [uiProp?.itemLabelSuffix, item.ui?.itemLabelSuffix],
                active: active || item.active,
              })
            "
            v-html="item.suffixHtml"
          />
          <span
            v-else-if="item.suffix"
            data-slot="itemLabelSuffix"
            :class="
              ui.itemLabelSuffix({
                class: [uiProp?.itemLabelSuffix, item.ui?.itemLabelSuffix],
                active: active || item.active,
              })
            "
          >
            {{ item.suffix }}
          </span>
        </template>
        -->
      </UCommandPalette>
    </template>
  </UModal>
</template>
