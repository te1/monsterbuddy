<script lang="ts" setup>
  import type { CommandPaletteItem } from '@nuxt/ui';
  import type { EggPowerIndex, MonstieBuild } from '~/services/3/monstieBuilds';
  import { sortBy } from 'es-toolkit/array';
  import { eggPowers } from '~/services/3/data';

  const props = withDefaults(
    defineProps<{
      build: MonstieBuild;
      index: EggPowerIndex;
      editMode?: boolean;
    }>(),
    {
      editMode: true,
    }
  );

  export type EggPowerPickedEvent = { eggPowerSlug: string | null; index: EggPowerIndex };

  const emit = defineEmits<{
    'update:eggPower': [data: EggPowerPickedEvent];
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

  function onSelect(item?: CommandPaletteItem) {
    if (item) {
      const item_ = item as Item;

      emit('update:eggPower', { eggPowerSlug: item_.data?.slug ?? null, index: props.index });
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
    v-if="editMode"
    v-model:open="open"
    title="Select Egg Powers"
    :ui="{
      content: 'max-w-2xl',
      header: 'min-h-0 py-1.5 ps-2.5 text-lg sm:ps-2.5',
      close: 'top-1 right-1',
      body: 'p-0 sm:p-0',
    }"
  >
    <slot>
      <UButton label="Egg Power" color="neutral" variant="subtle" />
    </slot>

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

  <template v-else>
    <slot />
  </template>
</template>
