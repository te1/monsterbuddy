<script lang="ts" setup>
  import type { CommandPaletteItem } from '@nuxt/ui';
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import type { Gene } from '~/services/3/types';
  import { usePrevious } from '@vueuse/core';
  import { orderBy } from 'es-toolkit/array';
  import { allElements } from '~/services/3/data';
  import { genes } from '~/services/3/genes';
  import { formatGeneInfo } from '~/services/3/presentation';
  import useGeneHistoryStore from '~/stores/3/geneHistoryStore';
  import useMonstieBuildManager from '~/stores/3/monstieBuildManager';

  const props = defineProps<{
    build: MonstieBuild;
    index: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  }>();

  const open = ref(true);

  const history = useGeneHistoryStore();

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

  const typeItems = computed(() => {
    return [null, ...allAttackTypes].map((type) => ({
      label: type ? formatAttackType(type) : 'No type',
      value: type,
    }));
  });

  const typeFilter = ref<(AttackType | null)[]>([]);

  function updateTypeFilter(value: AttackType[]) {
    // simulate radio group behavior but allow "unselecting"
    typeFilter.value = value.length > 0 ? [value.at(-1)!] : [];
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

  const geneSource = computed(() => {
    const source = sourceFilter.value[0];

    switch (source) {
      case 'recent':
        return history.recentGenes;

      case 'pinned':
        return history.pinnedGenes;
    }

    return genes;
  });

  // TODO icon for no type
  // TODO filter active/passive, max size only

  const filteredGenes = computed(() => {
    return geneSource.value.filter((gene) => {
      if (
        elementFilter.value.length > 0 &&
        gene.element !== 'all' &&
        !elementFilter.value.includes(gene.element)
      ) {
        return false;
      }

      if (
        typeFilter.value.length > 0 &&
        gene.type !== 'all' &&
        !typeFilter.value.includes(gene.type)
      ) {
        return false;
      }

      return true;
    });
  });

  type SortType = 'power' | 'wyvernfell' | 'pps' | 'wps';

  const sortItems: { label: string; value: SortType }[] = [
    {
      label: 'Power',
      value: 'power',
    },
    {
      label: 'Pwr Eff.',
      value: 'pps',
    },
    {
      label: 'Wyvernfell',
      value: 'wyvernfell',
    },
    {
      label: 'Wyvf Eff.',
      value: 'wps',
    },
  ];

  const sort = ref<SortType[]>([]);
  const previousSort = usePrevious(sort);

  function updateSort(value: SortType[]) {
    // simulate radio group behavior but allow "unselecting"
    sort.value = value.length > 0 ? [value.at(-1)!] : [];
  }

  const sortedGenes = computed(() => {
    const sortKey = sort.value[0];

    switch (sortKey) {
      case 'power':
        return orderBy(filteredGenes.value, [(gene) => gene.power ?? -1], ['desc']);

      case 'wyvernfell':
        return orderBy(filteredGenes.value, [(gene) => gene.wyvernfell ?? -1], ['desc']);

      case 'pps':
        return orderBy(filteredGenes.value, [(gene) => gene.pps ?? -1], ['desc']);

      case 'wps':
        return orderBy(filteredGenes.value, [(gene) => gene.wps ?? -1], ['desc']);
    }

    return filteredGenes.value;
  });

  function getGeneSuffix(gene: Gene): string {
    const result: string[] = [];

    const sortKey = sort.value[0];

    if (['power', 'pps'].includes(sortKey ?? '') && gene.power != null) {
      result.push(`Power ${gene.power}`);

      if (gene.stamina != null) {
        result.push(`Stamina ${gene.stamina}`);
      }
      if (gene.pps != null) {
        result.push(`Pwr Eff. ${gene.pps}`);
      }
    } else if (['wyvernfell', 'wps'].includes(sortKey ?? '') && gene.wyvernfell != null) {
      result.push(`Wyvernfell ${gene.wyvernfell}`);

      if (gene.stamina != null) {
        result.push(`Stamina ${gene.stamina}`);
      }
      if (gene.wps != null) {
        result.push(`Wyvf Eff. ${gene.wps}`);
      }
    } else {
      return gene.description;
    }

    return result.join(', ');
  }

  const groups = computed(() => {
    const items = [null, ...sortedGenes.value].map((gene) => ({
      label: gene ? gene.name : 'No gene selected',
      prefix: gene ? formatGeneInfo(gene) : undefined,
      suffix: gene ? getGeneSuffix(gene) : undefined,
      data: gene,
      disabled: gene ? props.build.geneSlugs.includes(gene.slug) : false,
    }));

    const available = items.filter((item) => !item.disabled);

    const selected = items.filter((item) => item.disabled);

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
      .find((item) => (item.data?.slug ?? null) === props.build.geneSlugs[props.index]);
  });

  const buildManager = useMonstieBuildManager();

  function onSelect(item?: CommandPaletteItem) {
    if (item && buildManager.build) {
      const item_ = item as Item;

      buildManager.build.geneSlugs[props.index] = item_.data?.slug ?? null;
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
    title="Select Gene"
    :ui="{
      content: 'max-w-2xl',
      header: 'min-h-0 py-1.5 ps-2.5 text-lg sm:ps-2.5',
      close: 'top-1 right-1',
      description: 'my-2',
      body: 'p-0 sm:p-0',
    }"
  >
    <UButton label="Gene" color="neutral" variant="subtle" />

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
              <S3GeneIcon v-if="item.data" :gene="item.data" noTooltip size="size-12" />
            </div>
            <UIcon v-else name="ph:circle-dashed-light" class="mr-1 size-12 text-dimmed" />
          </template>
        </UCommandPalette>
      </div>
    </template>
  </UModal>
</template>
