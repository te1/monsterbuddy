<script lang="ts" setup>
  import type { CommandPaletteItem } from '@nuxt/ui';
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import type { Monster } from '~/services/3/types';
  import { orderBy } from 'es-toolkit/array';
  import { allElements, monsties } from '~/services/3/data';
  import { formatMonsterTag } from '~/services/3/presentation';
  import useMonstieBuildManager from '~/stores/3/monstieBuildManager';

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

  const typeItems = computed(() => {
    return allAttackTypes.map((type) => ({
      label: formatAttackType(type),
      value: type,
    }));
  });

  const typeFilter = ref<AttackType[]>([]);

  function updateTypeFilter(value: AttackType[]) {
    // simulate radio group behavior but allow "unselecting"
    typeFilter.value = value.length > 0 ? [value.at(-1)!] : [];
  }

  const elementItems = computed(() => {
    return allElements.map((element) => ({
      label: formatElement(element),
      value: element,
    }));
  });

  const elementFilter = ref<ElementType[]>([]);

  function updateElementFilter(value: ElementType[]) {
    // simulate radio group behavior but allow "unselecting"
    elementFilter.value = value.length > 0 ? [value.at(-1)!] : [];
  }

  const filterMonsties = computed(() => {
    return monsties.filter((monstie) => {
      if (
        typeFilter.value.length > 0 &&
        monstie.monstie?.attack &&
        !typeFilter.value.includes(monstie.monstie.attack)
      ) {
        return false;
      }

      if (
        elementFilter.value.length > 0 &&
        monstie.element &&
        !elementFilter.value.includes(monstie.element)
      ) {
        return false;
      }

      return true;
    });
  });

  // TODO sort rank, major stats, bulk stats

  const sortedMonsties = computed(() => {
    return orderBy(filterMonsties.value, [(monstie) => monstie.rank], ['desc']);
  });

  const groups = computed(() => {
    const items = [null, ...sortedMonsties.value].map((monstie) => ({
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
      header: 'min-h-0 justify-between py-1 ps-2.5 pe-1 text-lg sm:ps-2.5 sm:pe-1',
      close: 'static self-start',
      description: 'my-1',
      body: 'p-0 sm:p-0',
    }"
  >
    <UButton label="Monstie" color="neutral" variant="subtle" />

    <template #description>
      <div class="text-default">
        <div class="flex items-center gap-2">
          <span>Filter</span>

          <UCheckboxGroup
            color="neutral"
            variant="table"
            orientation="horizontal"
            indicator="hidden"
            :ui="{ item: 'border-accented p-0.5 select-none dark:border-muted' }"
            :items="typeItems"
            :modelValue="typeFilter"
            @update:modelValue="updateTypeFilter"
          >
            <template #label="{ item }">
              <AttackTypeIcon :type="item.value" icon2 class="size-6 dark:invert" />
            </template>
          </UCheckboxGroup>

          <UCheckboxGroup
            color="neutral"
            variant="table"
            orientation="horizontal"
            indicator="hidden"
            :ui="{ item: 'border-accented p-0.5 select-none dark:border-muted' }"
            :items="elementItems"
            :modelValue="elementFilter"
            @update:modelValue="updateElementFilter"
          >
            <template #label="{ item }">
              <ElementIcon :element="item.value" icon2 class="size-6" />
            </template>
          </UCheckboxGroup>
        </div>
      </div>
    </template>

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
            resultLimit: 48,
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
