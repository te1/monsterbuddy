<script lang="ts" setup>
  import type { FilterKey, Mode } from '~/stores/3/geneFilter';
  import { allAilments, allElements, allSizes, allTargets, allTypes } from '~/services/3/genes';
  import useGeneFilter from '~/stores/3/geneFilter';
  import useGeneSources from '~/stores/3/geneSources';
  import {
    formatGeneElement,
    formatGeneSize,
    formatGeneType,
    formatSkillAilment,
    formatSkillTarget,
  } from '~/services/3/presentation';

  const props = withDefaults(
    defineProps<{
      disabled?: boolean;
      hideSearch?: boolean;
      backTarget?: string;
      modalLayout?: boolean;
    }>(),
    {
      disabled: false,
      hideSearch: false,
      backTarget: undefined,
      modalLayout: false,
    }
  );

  const filter = useGeneFilter();
  const sources = useGeneSources();

  const variant = computed(() => {
    return props.modalLayout ? 'soft-filter-modal' : 'soft-filter';
  });

  function setFilter<T>(filterKey: FilterKey, value: T, mode?: Mode) {
    if (value === filter[filterKey]) {
      return;
    }

    filter.$patch({
      [filterKey]: value === 'ALL' ? undefined : value,
      mode:
        value != null && mode != null && filter.autoSwitchModes.includes(mode) ? mode : filter.mode,
    });
  }

  const elements = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      ...allElements
        .filter((element) => element !== 'all')
        .map((element) => ({
          label: formatGeneElement(element),
          value: element,
        })),
    ];
  });

  const types = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      ...allTypes
        .filter((type) => type !== 'all')
        .map((type) => ({
          label: formatGeneType(type),
          value: type,
        })),
    ];
  });

  const sizes = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      { label: 'Max size only', value: null },
      ...allSizes.map((size) => ({
        label: formatGeneSize(size),
        value: size,
      })),
    ];
  });

  const targets = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      ...allTargets.map((target) => ({
        label: formatSkillTarget(target),
        value: target,
      })),
    ];
  });

  const ailments = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      ...allAilments.map((ailment) => ({
        label: formatSkillAilment(ailment),
        value: ailment,
      })),
    ];
  });

  // TODO buff, debuff, effect
</script>

<template>
  <div class="flex flex-col gap-3">
    <ClientOnly>
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
          :modelValue="filter.elementFilter ?? 'ALL'"
          color="neutral"
          :variant="variant"
          :items="elements"
          class="w-full"
          :disabled="disabled"
          @update:modelValue="setFilter('elementFilter', $event)"
        />
      </UFormField>

      <UFormField label="Type" orientation="horizontal" :data-modal-layout="modalLayout">
        <USelect
          :modelValue="filter.typeFilter === undefined ? 'ALL' : filter.typeFilter"
          color="neutral"
          :variant="variant"
          :items="types"
          class="w-full"
          :disabled="disabled"
          @update:modelValue="setFilter('typeFilter', $event)"
        />
      </UFormField>

      <UFormField label="Trigger" orientation="horizontal" :data-modal-layout="modalLayout">
        <AppFilterToggle
          :modelValue="filter.activeFilter"
          :texts="['All', 'Active', 'Passive']"
          class="w-full"
          :disabled="disabled"
          :modalLayout="modalLayout"
          @update:modelValue="setFilter('activeFilter', $event)"
        />
      </UFormField>

      <UFormField label="Size" orientation="horizontal" :data-modal-layout="modalLayout">
        <USelect
          :modelValue="filter.sizeFilter === undefined ? 'ALL' : filter.sizeFilter"
          color="neutral"
          :variant="variant"
          :items="sizes"
          class="w-full"
          :disabled="disabled"
          @update:modelValue="setFilter('sizeFilter', $event)"
        />
      </UFormField>

      <UFormField label="Egg Skill" orientation="horizontal" :data-modal-layout="modalLayout">
        <AppFilterToggle
          :modelValue="filter.eggSkillFilter"
          :texts="['Include', 'Only', 'Exclude']"
          class="w-full"
          :disabled="disabled"
          :modalLayout="modalLayout"
          @update:modelValue="setFilter('eggSkillFilter', $event)"
        />
      </UFormField>

      <UFormField label="Target" orientation="horizontal" :data-modal-layout="modalLayout">
        <USelect
          :modelValue="filter.targetFilter ?? 'ALL'"
          color="neutral"
          :variant="variant"
          :items="targets"
          class="w-full"
          :disabled="disabled"
          @update:modelValue="setFilter('targetFilter', $event)"
        />
      </UFormField>

      <UFormField label="Ailment" orientation="horizontal" :data-modal-layout="modalLayout">
        <USelect
          :modelValue="filter.ailmentFilter ?? 'ALL'"
          color="neutral"
          :variant="variant"
          :items="ailments"
          class="w-full"
          :disabled="disabled"
          @update:modelValue="setFilter('ailmentFilter', $event)"
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
