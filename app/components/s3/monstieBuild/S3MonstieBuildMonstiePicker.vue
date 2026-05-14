<script lang="ts" setup>
  import type { CommandPaletteItem } from '@nuxt/ui';
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import type { Monster } from '~/services/3/types';
  import { usePrevious } from '@vueuse/core';
  import { orderBy } from 'es-toolkit/array';
  import { allElements, monsties } from '~/services/3/data';
  import { formatMonsterTag } from '~/services/3/presentation';
  import useMonsterHistoryStore from '~/stores/3/monsterHistoryStore';

  const props = defineProps<{ build: MonstieBuild }>();

  const emit = defineEmits<{
    'update:monstieSlug': [monstieSlug: string | null];
  }>();

  const open = ref(false);

  const history = useMonsterHistoryStore();

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

  type SourceType = 'recent' | 'pinned';

  const sourceItems: { label: string; value: SourceType }[] = [
    { label: 'Recent', value: 'recent' },
    { label: 'Bookmarks', value: 'pinned' },
  ];

  const sourceFilter = ref<SourceType[]>([]);

  function updateSourceFilter(value: SourceType[]) {
    const wasRecent = sourceFilter.value.includes('recent');

    // simulate radio group behavior but allow "unselecting"
    sourceFilter.value = value.length > 0 ? [value.at(-1)!] : [];

    if (sourceFilter.value[0] === 'recent') {
      sort.value = []; // remove sorten when switching to recent
    } else if (wasRecent && sort.value.length === 0) {
      sort.value = previousSort.value ?? [];
    }
  }

  const monstieSource = computed(() => {
    const source = sourceFilter.value[0];

    switch (source) {
      case 'recent':
        return history.recentMonsties;

      case 'pinned':
        return history.pinnedMonsties;
    }

    return monsties;
  });

  const filteredMonsties = computed(() => {
    return monstieSource.value.filter((monstie) => {
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

  type SortType = 'rank' | 'majorStats' | 'bulkStats';

  const sortItems: { label: string; value: SortType }[] = [
    {
      label: 'Rank',
      value: 'rank',
    },
    {
      label: 'Major Stats',
      value: 'majorStats',
    },
    {
      label: 'Bulk Stats',
      value: 'bulkStats',
    },
  ];

  const sort = ref<SortType[]>(['rank']);
  const previousSort = usePrevious(sort);

  function updateSort(value: SortType[]) {
    // simulate radio group behavior but allow "unselecting"
    sort.value = value.length > 0 ? [value.at(-1)!] : [];
  }

  const sortedMonsties = computed(() => {
    const sortKey = sort.value[0];

    switch (sortKey) {
      case 'rank':
        return orderBy(filteredMonsties.value, [(monstie) => monstie.rank], ['desc']);

      case 'majorStats':
        return orderBy(filteredMonsties.value, [(monstie) => monstie.stats?.base?.total], ['desc']);

      case 'bulkStats':
        return orderBy(filteredMonsties.value, [(monstie) => monstie.stats?.base?.bulk], ['desc']);
    }

    return filteredMonsties.value;
  });

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

    const sortKey = sort.value[0];

    if (sortKey === 'rank') {
      result.push(`Rank ${monstie.rank}`);
    }
    if (sortKey === 'majorStats' && monstie.stats?.base?.total) {
      result.push(`Major Stats ${monstie.stats.base.total}`);
    }
    if (sortKey === 'bulkStats' && monstie.stats?.base?.bulk) {
      result.push(`Bulk Stats ${monstie.stats.base.bulk}`);
    }

    result.push(monstie.genus);

    result.push(...(monstie.tags?.map(formatMonsterTag).filter((tag) => tag != null) ?? []));

    return result.join(', ');
  }

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

  function onSelect(item?: CommandPaletteItem) {
    if (item) {
      const item_ = item as Item;

      emit('update:monstieSlug', item_.data?.slug ?? null);
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
      header: 'min-h-0 py-1.5 ps-2.5 text-lg sm:ps-2.5',
      close: 'top-1 right-1',
      description: 'my-2',
      body: 'p-0 sm:p-0',
    }"
  >
    <UButton label="Monstie" color="neutral" variant="subtle" />

    <template #description>
      <div class="flex flex-col gap-2 text-default">
        <div class="flex items-center gap-2">
          <div class="w-8">Filter</div>

          <div class="flex flex-wrap items-center gap-2">
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

            <UCheckboxGroup
              color="neutral"
              variant="table"
              orientation="horizontal"
              indicator="hidden"
              :ui="{ item: 'border-accented px-2 py-1 select-none dark:border-muted' }"
              :items="sourceItems"
              :modelValue="sourceFilter"
              @update:modelValue="updateSourceFilter"
            />
          </div>
        </div>

        <div class="flex items-center gap-2">
          <div class="w-8">Sort</div>

          <UCheckboxGroup
            color="neutral"
            variant="table"
            orientation="horizontal"
            indicator="hidden"
            :ui="{ item: 'border-accented px-2 py-1 select-none dark:border-muted' }"
            :items="sortItems"
            :modelValue="sort"
            @update:modelValue="updateSort"
          >
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
