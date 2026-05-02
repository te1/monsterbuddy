<script lang="ts" setup>
  import type { CommandPaletteItem } from '@nuxt/ui';
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import type { Monster } from '~/services/3/types';
  import { monsties } from '~/services/3/data';
  import useMonstieBuildManager from '~/stores/3/monstieBuildManager';
  import { formatMonsterTag } from '~/services/3/presentation';

  const props = defineProps<{ build: MonstieBuild }>();

  const open = ref(false);

  function getMonstiePrefix(monstie: Monster): string {
    const result: string[] = [];

    if (monstie.element) {
      result.push(formatElement(monstie.element));
    }

    if (monstie.monstie) {
      result.push(formatAttackType(monstie.monstie.attack));
    }

    result.push(`Rank ${monstie.rank}`);

    return result.join(', ');
  }

  function getMonstieSuffix(monstie: Monster): string {
    const result: string[] = [];

    result.push(monstie.genus);

    result.push(...(monstie.tags?.map(formatMonsterTag).filter((tag) => tag != null) ?? []));

    return result.join(', ');
  }

  const groups = computed(() => {
    const items = [null, ...monsties].map((monstie) => ({
      label: monstie ? monstie.name : 'No monstie selected',
      prefix: monstie ? getMonstiePrefix(monstie) : undefined,
      suffix: monstie ? getMonstieSuffix(monstie) : undefined,
      data: monstie,
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
    return groups.value[0]?.items.find(
      (item) => (item.data?.slug ?? null) === props.build.monstieSlug
    );
  });

  const buildManager = useMonstieBuildManager();

  function onSelect(item?: CommandPaletteItem) {
    if (item && buildManager.build) {
      const item_ = item as Item;

      buildManager.build.monstieSlug = item_.data?.slug ?? null;
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
    title="Select Monstie"
    :ui="{
      header: 'min-h-0 justify-between py-1 ps-2.5 pe-1 sm:ps-2.5 sm:pe-1',
      close: 'static',
      body: 'p-0 sm:p-0',
    }"
  >
    <UButton label="Monstie" color="neutral" variant="subtle" />

    <template #body>
      <div class="h-[calc(80dvh-41px)] max-h-[600px]">
        <UCommandPalette
          :defaultValue="defaultValue"
          :groups="groups"
          placeholder="Search..."
          class="h-full"
          :input="input"
          :ui="{
            item: 'items-center',
            itemLabel: '-mt-2 flex flex-col',
            itemLabelPrefix: 'hidden',
            itemLabelBase: 'text-base',
            itemLabelSuffix: 'mt-1 truncate',
          }"
          :fuse="{
            fuseOptions: { includeMatches: true, keys: ['label', 'suffix', 'prefix'] },
            resultLimit: 24,
          }"
          @update:modelValue="onSelect"
        >
          <template #items-leading="{ item }">
            <div v-if="item.data" class="mr-1 flex h-12 items-center gap-2">
              <S3MonsterIcon v-if="item.data" :monster="item.data" noTooltip class="size-12" />
              <div class="flex flex-col items-center gap-0.5">
                <AttackTypeIcon
                  class="size-6 dark:invert"
                  :type="item.data.monstie?.attack"
                  noTooltip
                  icon2
                />
                <ElementIcon class="size-6" :element="item.data.element" noTooltip icon2 />
              </div>
            </div>
            <UIcon v-else name="ph:circle-dashed-light" class="m-1 mr-10 size-10 text-dimmed" />
          </template>
        </UCommandPalette>
      </div>
    </template>
  </UModal>
</template>
