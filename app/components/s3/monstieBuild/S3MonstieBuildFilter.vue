<script lang="ts" setup>
  import type { FilterKey } from '~/stores/3/monstieBuildFilter';
  import type { SourcesStore } from '~/stores/3/monstieBuildSources';
  import useMonstieBuildFilter from '~/stores/3/monstieBuildFilter';
  import { allElements } from '~/services/3/data';

  const props = withDefaults(
    defineProps<{
      sources?: SourcesStore;
      disabled?: boolean;
      hideSearch?: boolean;
      backTarget?: string;
      modalLayout?: boolean;
    }>(),
    {
      sources: undefined,
      disabled: false,
      hideSearch: false,
      backTarget: undefined,
      modalLayout: false,
    }
  );

  const filter = useMonstieBuildFilter();

  const variant = computed(() => {
    return props.modalLayout ? 'soft-filter-modal' : 'soft-filter';
  });

  function setFilter<T>(filterKey: FilterKey, value: T) {
    if (value === filter[filterKey]) {
      return;
    }

    filter.$patch({
      [filterKey]: value === 'ALL' ? undefined : value,
    });
  }

  const elements = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      ...allElements.map((element) => ({
        label: formatElement(element),
        value: element,
      })),
    ];
  });

  const types = computed(() => {
    const types = ['power', 'speed', 'technical'] as const;

    return [
      { label: 'All', value: 'ALL' },
      ...types.map((type) => ({
        label: formatAttackType(type),
        value: type,
      })),
    ];
  });
</script>

<template>
  <div class="flex flex-col gap-3">
    <ClientOnly v-if="sources != null">
      <URadioGroup
        color="neutral"
        variant="table"
        orientation="horizontal"
        indicator="hidden"
        :ui="{ item: 'grow select-none' }"
        :modelValue="sources.current"
        :items="sources.items"
        @update:modelValue="sources.setCurrent($event)"
      />
    </ClientOnly>

    <UFormField
      v-if="!hideSearch"
      label="Name"
      orientation="horizontal"
      :data-modal-layout="modalLayout"
    >
      <AppInputSearch
        :modelValue="filter.nameFilter"
        :disabled="disabled"
        :modalLayout="modalLayout"
        @update:modelValue="filter.$patch({ nameFilter: $event })"
      />
    </UFormField>

    <div class="flex flex-col gap-1">
      <UFormField label="Element" orientation="horizontal" :data-modal-layout="modalLayout">
        <USelect
          :modelValue="filter.monstieElementFilter ?? 'ALL'"
          color="neutral"
          :variant="variant"
          :items="elements"
          class="w-full"
          :disabled="disabled"
          @update:modelValue="setFilter('monstieElementFilter', $event)"
        />
      </UFormField>

      <UFormField label="Type" orientation="horizontal" :data-modal-layout="modalLayout">
        <USelect
          :modelValue="
            filter.monstieAttackTypeFilter === undefined ? 'ALL' : filter.monstieAttackTypeFilter
          "
          color="neutral"
          :variant="variant"
          :items="types"
          class="w-full"
          :disabled="disabled"
          @update:modelValue="setFilter('monstieAttackTypeFilter', $event)"
        />
      </UFormField>
    </div>

    <UFormField
      :label="`${filter.resultCount} Results`"
      orientation="horizontal"
      :data-modal-layout="modalLayout"
    >
      <UButton
        color="neutral"
        :variant="variant"
        class="w-full"
        trailingIcon="ph:arrow-counter-clockwise"
        label="Reset"
        :ui="{ base: 'justify-between font-normal', trailingIcon: 'text-dimmed' }"
        :disabled="disabled"
        @click="filter.resetFilter"
      />
    </UFormField>

    <UFormField
      v-if="modalLayout"
      label=" "
      orientation="horizontal"
      :data-modal-layout="modalLayout"
    >
      <NuxtLink :to="backTarget">
        <UButton
          color="neutral"
          :variant="variant"
          class="w-full"
          trailingIcon="ph:check"
          label="Apply"
          :ui="{ base: 'justify-between font-normal', trailingIcon: 'text-dimmed' }"
          :disabled="disabled"
        />
      </NuxtLink>
    </UFormField>
  </div>
</template>
