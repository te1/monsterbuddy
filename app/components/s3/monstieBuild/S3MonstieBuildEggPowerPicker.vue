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

  const rankOrder = new Map([undefined, 'S', 'A', 'B'].map((rank, index) => [rank, index]));

  const groups = computed(() => {
    const items = [null, ...eggPowers].map((eggPower) => ({
      label: eggPower ? eggPower.name : 'No egg power',
      prefix: eggPower ? `${eggPower.region} Rank ${eggPower.rank}` : undefined,
      suffix: eggPower ? eggPower.variants[0]?.description : undefined,
      data: eggPower,
      disabled: eggPower ? props.build.eggPowerSlugs.includes(eggPower.slug) : false,
    }));

    const available = sortBy(
      items.filter((item) => !item.disabled),
      [(item) => rankOrder.get(item.data?.rank)!]
    );

    const selected = sortBy(
      items.filter((item) => item.disabled),
      [(item) => props.build.eggPowerSlugs.indexOf(item.data?.slug ?? null)]
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
    return groups.value
      .flatMap((group) => group.items)
      .find((item) => (item.data?.slug ?? null) === props.build.eggPowerSlugs[props.index]);
  });

  const buildManager = useMonstieBuildManager();

  function onSelect(item?: CommandPaletteItem) {
    if (item && buildManager.build) {
      const item_ = item as Item;

      buildManager.build.eggPowerSlugs[props.index] = item_.data?.slug ?? null;
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
      content: 'max-w-2xl',
      header: 'min-h-0 justify-between py-1 ps-2.5 pe-1 sm:ps-2.5 sm:pe-1',
      close: 'static',
      body: 'p-0 sm:p-0',
    }"
  >
    <UButton label="Egg Power" color="neutral" variant="subtle" />

    <template #body>
      <div class="h-[calc(80dvh-41px)] max-h-[855px]">
        <UCommandPalette
          :defaultValue="defaultValue"
          :groups="groups"
          placeholder="Search..."
          class="h-full"
          :input="input"
          :ui="{
            item: 'items-center',
            itemLabel: 'flex flex-col',
            itemLabelPrefix: 'hidden',
            itemLabelBase: 'text-base',
            itemLabelSuffix: 'truncate',
          }"
          :fuse="{ fuseOptions: { includeMatches: true, keys: ['label', 'suffix', 'prefix'] } }"
          @update:modelValue="onSelect"
        >
          <template #items-leading="{ item }">
            <S3EggPowerIcon :eggPower="item.data" big contrast class="mr-2" />
          </template>
        </UCommandPalette>
      </div>
    </template>
  </UModal>
</template>
