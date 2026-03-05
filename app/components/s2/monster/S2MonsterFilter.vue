<script lang="ts" setup>
  import { allElements } from '~/services/2/data';
  import type { FilterKey, FilterStore, Mode } from '~/stores/2/base';

  const props = withDefaults(
    defineProps<{
      store: FilterStore;
      showEggColorFilter?: boolean;
      showHabitatFilter?: boolean;
      showCoopQuestFilter?: boolean;
      showCatavanFilter?: boolean;
      showEldersLairFilter?: boolean;
      showAttackTypeFilter?: boolean;
      showAttackElementFilter?: boolean;
      showRidingActionFilter?: boolean;
      showHatchableFilter?: boolean;
      showDeviantsFilter?: boolean;
    }>(),
    {
      showEggColorFilter: false,
      showHabitatFilter: false,
      showCoopQuestFilter: false,
      showCatavanFilter: false,
      showEldersLairFilter: false,
      showAttackTypeFilter: false,
      showAttackElementFilter: false,
      showRidingActionFilter: false,
      showHatchableFilter: false,
      showDeviantsFilter: false,
    }
  );

  function setFilter<T>(filterKey: FilterKey, value: T, mode?: Mode) {
    if (value === props.store[filterKey]) {
      return;
    }

    props.store.$patch({
      [filterKey]: value === 'ALL' ? undefined : value,
      mode:
        value != null &&
        mode != null &&
        props.store.mode !== 'compact' &&
        props.store.autoSwitchModes.includes(mode)
          ? mode
          : props.store.mode,
    });
  }

  const eggColors = [
    { label: 'All', value: 'ALL' },
    { label: 'Black', value: ['black'] },
    { label: 'White / Gray', value: ['white', 'gray'] },
    { label: 'Red', value: ['red'] },
    { label: 'Orange / Brown', value: ['orange', 'brown'] },
    { label: 'Yellow', value: ['yellow'] },
    { label: 'Green', value: ['green'] },
    { label: 'Blue', value: ['blue'] },
    { label: 'Purple / Pink', value: ['purple', 'pink'] },
  ];

  const genera = computed(() => {
    return [
      { label: 'All', value: 'ALL' },
      ...props.store.allGenera.map((genus) => ({
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
      ...props.store.allHabitats.map((habitat) => ({
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
      ...props.store.allCoopQuests.map((coopQuest) => ({
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
      ...props.store.allCatavanStands.map((catavanStand) => ({
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
      ...props.store.allEldersLairFloors.map((floor) => ({
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
      ...props.store.allRidingActions.map((ridingAction) => ({
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
    <div>
      <UFormField label="Name" orientation="horizontal">
        <AppInputSearch
          :modelValue="props.store.nameFilter"
          @update:modelValue="store.$patch({ nameFilter: $event })"
        />
      </UFormField>
    </div>

    <div class="flex flex-col gap-1">
      <UFormField v-if="showEggColorFilter" label="Egg Color" orientation="horizontal">
        <USelect
          :modelValue="props.store.eggColorsFilter ?? 'ALL'"
          color="neutral"
          variant="soft2"
          :items="eggColors"
          class="w-full"
          @update:modelValue="setFilter('eggColorsFilter', $event)"
        />
      </UFormField>

      <UFormField label="Genus" orientation="horizontal">
        <USelect
          :modelValue="props.store.genusFilter ?? 'ALL'"
          color="neutral"
          variant="soft2"
          :items="genera"
          class="w-full"
          @update:modelValue="setGenusFilter"
        />
      </UFormField>

      <UFormField v-if="showHabitatFilter" label="Habitat" orientation="horizontal">
        <USelect
          :modelValue="props.store.habitatFilter ?? 'ALL'"
          color="neutral"
          variant="soft2"
          :items="habitats"
          class="w-full"
          @update:modelValue="setHabitatFilter"
        />
      </UFormField>

      <UFormField v-if="showCoopQuestFilter" label="Co-Op Quest" orientation="horizontal">
        <USelect
          :modelValue="props.store.coopQuestFilter ?? 'ALL'"
          color="neutral"
          variant="soft2"
          :items="coopQuests"
          class="w-full"
          @update:modelValue="setCoopQuestFilter"
        />
      </UFormField>

      <UFormField v-if="showCatavanFilter" label="Catavan Stand" orientation="horizontal">
        <USelect
          :modelValue="props.store.catavanFilter ?? 'ALL'"
          color="neutral"
          variant="soft2"
          :items="catavanStands"
          class="w-full"
          @update:modelValue="setCatavanFilter"
        />
      </UFormField>

      <UFormField v-if="showEldersLairFilter" label="Elder's Lair" orientation="horizontal">
        <USelect
          :modelValue="props.store.eldersLairFilter ?? 'ALL'"
          color="neutral"
          variant="soft2"
          :items="eldersLairFloors"
          class="w-full"
          @update:modelValue="setEldersLairFilter"
        />
      </UFormField>

      <UFormField v-if="showAttackTypeFilter" label="Attack Type" orientation="horizontal">
        <USelect
          :modelValue="props.store.attackTypeFilter ?? 'ALL'"
          color="neutral"
          variant="soft2"
          :items="attackTypes"
          class="w-full"
          @update:modelValue="setFilter('attackTypeFilter', $event)"
        />
      </UFormField>

      <UFormField v-if="showAttackElementFilter" label="Attack Element" orientation="horizontal">
        <USelect
          :modelValue="props.store.attackElementFilter ?? 'ALL'"
          color="neutral"
          variant="soft2"
          :items="attackElements"
          class="w-full"
          @update:modelValue="setFilter('attackElementFilter', $event)"
        />
      </UFormField>

      <UFormField v-if="showRidingActionFilter" label="Riding Action" orientation="horizontal">
        <USelect
          :modelValue="props.store.ridingActionFilter ?? 'ALL'"
          color="neutral"
          variant="soft2"
          :items="ridingActions"
          class="w-full"
          @update:modelValue="setRidingActionFilter"
        />
      </UFormField>

      <UFormField v-if="showHatchableFilter" label="Hatchable" orientation="horizontal">
        <AppFilterToggle
          :modelValue="props.store.hatchableFilter"
          :texts="['Include', 'Only Hatchable', 'Exclude']"
          class="w-full"
          @update:modelValue="setFilter('hatchableFilter', $event)"
        />
      </UFormField>

      <!-- TODO Deviants -->
    </div>

    <div>
      <UFormField :label="`${store.resultCount} Results`" orientation="horizontal">
        <UButton
          color="neutral"
          variant="soft2"
          class="w-full"
          trailingIcon="i-lucide-rotate-ccw"
          label="Reset"
          :ui="{ base: 'justify-between' }"
          @click="props.store.resetFilter"
        />
      </UFormField>
    </div>
  </div>
</template>
