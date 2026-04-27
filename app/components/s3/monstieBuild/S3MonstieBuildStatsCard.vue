<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import {
    elementalResistanceTooltip,
    intensityToIcon,
    intensityToTextColor,
  } from '~/services/3/presentation';

  const props = defineProps<{ build: MonstieBuild }>();

  const stats = computed(() => {
    return props.build.monstie?.stats?.base;
  });

  const hasRawStats = computed(() => {
    return (
      stats.value?.startingStamina != null ||
      stats.value?.rawRecovery != null ||
      stats.value?.wyvernfell != null ||
      stats.value?.rawCrit != null
    );
  });

  const elementalResistances = computed(() => props.build.monstie?.stats?.elementalResistance);

  const hasElementalResistances = computed(() => {
    return !isEmptyObject(elementalResistances.value);
  });
</script>

<template>
  <section class="@container flex flex-col gap-3">
    <div v-if="hasRawStats">
      <h3 class="text-lg font-semibold">Stats</h3>

      <div
        class="grid @sm:grid-cols-2 @sm:grid-rows-2 @sm:gap-x-12 @3xl:grid-cols-4 @3xl:grid-rows-1"
      >
        <div v-if="stats?.startingStamina != null" class="flex items-center justify-between gap-2">
          <span>Starting Stamina</span>
          <span class="text-right font-semibold" v-text="stats?.startingStamina" />
        </div>

        <div v-if="stats?.rawRecovery != null" class="flex items-center justify-between gap-2">
          <span>Stamina Recovery</span>
          <span class="text-right font-semibold" v-text="stats?.rawRecovery" />
        </div>

        <div v-if="stats?.rawCrit != null" class="flex items-center justify-between gap-2">
          <span>Crit Rate</span>
          <span class="text-right font-semibold" v-text="`${stats?.rawCrit}%`" />
        </div>

        <div v-if="stats?.wyvernfell != null" class="flex items-center justify-between gap-2">
          <span>Wyvernfell</span>
          <span class="text-right font-semibold" v-text="stats?.wyvernfell" />
        </div>

        <div v-if="stats?.speed != null" class="flex items-center justify-between gap-2">
          <span>Speed</span>
          <span class="text-right font-semibold" v-text="stats?.rawSpeed" />
        </div>
      </div>
    </div>

    <div v-if="hasElementalResistances">
      <div class="flex flex-col @xs:flex-row">
        <h3 class="w-36 text-lg font-semibold">Resistance</h3>

        <div class="mt-1 flex gap-2 @xs:mt-1.5">
          <div v-for="(value, element) in elementalResistances" :key="element">
            <AppTooltip
              :tooltip="elementalResistanceTooltip(element, value)"
              :content="{ side: 'top' }"
            >
              <div class="flex flex-col items-center gap-1">
                <ElementIcon class="size-6" :element="element" noTooltip />
                <UIcon
                  :name="intensityToIcon(value)"
                  class="h-5 text-xl"
                  :class="intensityToTextColor(value)"
                />
              </div>
            </AppTooltip>
          </div>
        </div>
      </div>

      <div v-if="build.dualElement" class="mt-1 text-sm text-dimmed">
        Note that resistances for <strong class="font-semibold">dual element</strong> monsties can
        different
      </div>
    </div>
  </section>
</template>
