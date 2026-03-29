<script lang="ts" setup>
  import type { EggColor } from '~/services/2/types';
  import type { FilterKey, FilterStore, Mode } from '~/stores/2/baseMonsterFilter';
  import type { SourcesStore } from '~/stores/2/baseMonsterSources';
  import type { DisplaysStore } from '~/stores/baseDisplays';
  import { allElements } from '~/services/2/data';

  const props = withDefaults(
    defineProps<{
      displays?: DisplaysStore;
      filter: FilterStore;
      sources?: SourcesStore;
      disabled?: boolean;
      hideSearch?: boolean;
      showEggColorFilter?: boolean;
      showHabitatFilter?: boolean;
      showCoopQuestFilter?: boolean;
      showCatavanFilter?: boolean;
      showEldersLairFilter?: boolean;
      showAttackTypeFilter?: boolean;
      showAttackElementFilter?: boolean;
      showRidingActionFilter?: boolean;
      showHatchableFilter?: boolean;
      showDeviantFilter?: boolean;
      backTarget?: string;
      modalLayout?: boolean;
    }>(),
    {
      displays: undefined,
      sources: undefined,
      disabled: false,
      hideSearch: false,
      showEggColorFilter: false,
      showHabitatFilter: false,
      showCoopQuestFilter: false,
      showCatavanFilter: false,
      showEldersLairFilter: false,
      showAttackTypeFilter: false,
      showAttackElementFilter: false,
      showRidingActionFilter: false,
      showHatchableFilter: false,
      showDeviantFilter: false,
      backTarget: undefined,
      modalLayout: false,
    }
  );

  const variant = computed(() => {
    return props.modalLayout ? 'soft-filter-modal' : 'soft-filter';
  });

  function setFilter<T>(filterKey: FilterKey, value: T, mode?: Mode) {
    if (value === props.filter[filterKey]) {
      return;
    }

    props.filter.$patch({
      [filterKey]: value === 'ALL' ? undefined : value,
      mode:
        value != null &&
        mode != null &&
        props.filter.mode !== 'compact' &&
        props.filter.autoSwitchModes.includes(mode)
          ? mode
          : props.filter.mode,
    });
  }

  const eggColors: { label: string; value: string; colors: EggColor[] }[] = [
    { label: 'All', value: 'ALL', colors: [] },
    { label: 'Black', value: 'black', colors: ['black'] },
    { label: 'White / Gray', value: 'white-gray', colors: ['white', 'gray'] },
    { label: 'Red', value: 'red', colors: ['red'] },
    { label: 'Orange / Brown', value: 'orange-brown', colors: ['orange', 'brown'] },
    { label: 'Yellow', value: 'yellow', colors: ['yellow'] },
    { label: 'Green', value: 'green', colors: ['green'] },
    { label: 'Blue', value: 'blue', colors: ['blue'] },
    { label: 'Purple / Pink', value: 'purple-pink', colors: ['purple', 'pink'] },
  ] as const;

  const eggColor = computed(() => {
    if (props.filter.eggColorsFilter == null || props.filter.eggColorsFilter.length === 0) {
      return 'ALL';
    }

    const selectedColors = props.filter.eggColorsFilter;
    const match = eggColors.find((item) => {
      return (
        item.colors.length === selectedColors.length &&
        item.colors.every((color) => selectedColors.includes(color))
      );
    });

    return match?.value ?? 'ALL';
  });

  function setEggColor(value: string) {
    if (value === 'ALL') {
      setFilter('eggColorsFilter', value);
      return;
    }

    const item = eggColors.find((item) => item.value === value);

    if (item != null) {
      setFilter('eggColorsFilter', [...item.colors]);
    }
  }

  const genera = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      ...props.filter.allGenera.map((genus) => ({
        label: genus,
        value: genus,
      })),
    ];
  });

  function setGenusFilter(value: string) {
    setFilter('genusFilter', value, 'location');
  }

  const habitats = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      ...props.filter.allHabitats.map((habitat) => ({
        label: habitat,
        value: habitat,
      })),
    ];
  });

  function setHabitatFilter(value: string) {
    setFilter('habitatFilter', value, 'location');
  }

  const coopQuests = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      ...props.filter.allCoopQuests.map((coopQuest) => ({
        label: coopQuest.name,
        value: coopQuest.name,
      })),
    ];
  });

  function setCoopQuestFilter(value: string) {
    setFilter('coopQuestFilter', value, 'location-coop');
  }

  const catavanStands = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      ...props.filter.allCatavanStands.map((catavanStand) => ({
        label: catavanStand,
        value: catavanStand,
      })),
    ];
  });

  function setCatavanFilter(value: string) {
    setFilter('catavanFilter', value, 'location');
  }

  const eldersLairFloors = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      ...props.filter.allEldersLairFloors.map((floor) => ({
        label: floor,
        value: floor,
      })),
    ];
  });

  function setEldersLairFilter(value: string) {
    setFilter('eldersLairFilter', value, 'location-eldersLair');
  }

  const attackTypes = computed(() => {
    const types = ['power', 'speed', 'technical'] as const;

    return [
      { label: 'All', value: 'ALL' },
      ...types.map((attackType) => ({
        label: formatAttackType(attackType),
        value: attackType,
      })),
    ];
  });

  const attackElements = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      ...allElements.map((element) => ({
        label: formatElement(element),
        value: element,
      })),
    ];
  });

  const ridingActions = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      ...props.filter.allRidingActions.map((ridingAction) => ({
        label: ridingAction,
        value: ridingAction,
      })),
    ];
  });

  function setRidingActionFilter(value: string) {
    setFilter('ridingActionFilter', value, 'ridingActions');
  }
</script>

<template>
  <div class="flex flex-col gap-3">
    <URadioGroup
      v-if="displays != null"
      color="neutral"
      variant="table"
      orientation="horizontal"
      indicator="hidden"
      :ui="{ item: 'grow select-none' }"
      :modelValue="displays.current"
      :items="displays.items"
      @update:modelValue="displays.setCurrent($event)"
    />

    <ClientOnly v-if="sources != null">
      <URadioGroup
        color="neutral"
        variant="table"
        orientation="horizontal"
        indicator="hidden"
        :ui="{ item: 'grow select-none' }"
        :modelValue="sources.current"
        :items="sources.items"
        @update:modelValue="sources.setCurrent($event, filter)"
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
      <UFormField
        v-if="showEggColorFilter"
        label="Egg Color"
        orientation="horizontal"
        :data-modal-layout="modalLayout"
      >
        <USelect
          :modelValue="eggColor"
          color="neutral"
          :variant="variant"
          :items="eggColors"
          class="w-full"
          :disabled="disabled"
          @update:modelValue="setEggColor"
        />
      </UFormField>

      <UFormField label="Genus" orientation="horizontal" :data-modal-layout="modalLayout">
        <USelect
          :modelValue="filter.genusFilter ?? 'ALL'"
          color="neutral"
          :variant="variant"
          :items="genera"
          class="w-full"
          :disabled="disabled"
          @update:modelValue="setGenusFilter"
        />
      </UFormField>

      <UFormField
        v-if="showHabitatFilter"
        label="Habitat"
        orientation="horizontal"
        :data-modal-layout="modalLayout"
      >
        <USelect
          :modelValue="filter.habitatFilter ?? 'ALL'"
          color="neutral"
          :variant="variant"
          :items="habitats"
          class="w-full"
          :disabled="disabled"
          @update:modelValue="setHabitatFilter"
        />
      </UFormField>

      <UFormField
        v-if="showCoopQuestFilter"
        label="Co-Op Quest"
        orientation="horizontal"
        :data-modal-layout="modalLayout"
      >
        <USelect
          :modelValue="filter.coopQuestFilter ?? 'ALL'"
          color="neutral"
          :variant="variant"
          :items="coopQuests"
          class="w-full"
          :disabled="disabled"
          @update:modelValue="setCoopQuestFilter"
        />
      </UFormField>

      <UFormField
        v-if="showCatavanFilter"
        label="Catavan Stand"
        orientation="horizontal"
        :data-modal-layout="modalLayout"
      >
        <USelect
          :modelValue="filter.catavanFilter ?? 'ALL'"
          color="neutral"
          :variant="variant"
          :items="catavanStands"
          class="w-full"
          :disabled="disabled"
          @update:modelValue="setCatavanFilter"
        />
      </UFormField>

      <UFormField
        v-if="showEldersLairFilter"
        label="Elder's Lair"
        orientation="horizontal"
        :data-modal-layout="modalLayout"
      >
        <USelect
          :modelValue="filter.eldersLairFilter ?? 'ALL'"
          color="neutral"
          :variant="variant"
          :items="eldersLairFloors"
          class="w-full"
          :disabled="disabled"
          @update:modelValue="setEldersLairFilter"
        />
      </UFormField>

      <UFormField
        v-if="showAttackTypeFilter"
        label="Attack Type"
        orientation="horizontal"
        :data-modal-layout="modalLayout"
      >
        <USelect
          :modelValue="filter.attackTypeFilter ?? 'ALL'"
          color="neutral"
          :variant="variant"
          :items="attackTypes"
          class="w-full"
          :disabled="disabled"
          @update:modelValue="setFilter('attackTypeFilter', $event)"
        />
      </UFormField>

      <UFormField
        v-if="showAttackElementFilter"
        label="Attack Element"
        orientation="horizontal"
        :data-modal-layout="modalLayout"
      >
        <USelect
          :modelValue="filter.attackElementFilter ?? 'ALL'"
          color="neutral"
          :variant="variant"
          :items="attackElements"
          class="w-full"
          :disabled="disabled"
          @update:modelValue="setFilter('attackElementFilter', $event)"
        />
      </UFormField>

      <UFormField
        v-if="showRidingActionFilter"
        label="Riding Action"
        orientation="horizontal"
        :data-modal-layout="modalLayout"
      >
        <USelect
          :modelValue="filter.ridingActionFilter ?? 'ALL'"
          color="neutral"
          :variant="variant"
          :items="ridingActions"
          class="w-full"
          :disabled="disabled"
          @update:modelValue="setRidingActionFilter"
        />
      </UFormField>

      <UFormField
        v-if="showHatchableFilter"
        label="Hatchable"
        orientation="horizontal"
        :data-modal-layout="modalLayout"
      >
        <AppFilterToggle
          :modelValue="filter.hatchableFilter"
          :texts="['Include', 'Only', 'Exclude']"
          class="w-full"
          :disabled="disabled"
          :modalLayout="modalLayout"
          @update:modelValue="setFilter('hatchableFilter', $event)"
        />
      </UFormField>

      <UFormField
        v-if="showDeviantFilter"
        label="Deviant"
        orientation="horizontal"
        :data-modal-layout="modalLayout"
      >
        <AppFilterToggle
          :modelValue="filter.deviantFilter"
          :texts="['Include', 'Only', 'Exclude']"
          class="w-full"
          :disabled="disabled"
          :modalLayout="modalLayout"
          @update:modelValue="setFilter('deviantFilter', $event)"
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
