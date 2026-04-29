<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import type {
    BingoBonusType,
    RegionStatsType,
    SkillDetailFactorType,
    SkillDetailValueType,
  } from '~/services/3/types';
  import useMonstieBuildStore from '~/stores/3/monstieBuildStore';
  import {
    elementalResistanceTooltip,
    intensityToIcon,
    intensityToTextColor,
  } from '~/services/3/presentation';

  const props = defineProps<{ build: MonstieBuild }>();

  const buildStore = useMonstieBuildStore();

  const { totalBingoCount } = storeToRefs(buildStore);

  const monstieStats = computed(() => {
    return props.build.monstie?.stats?.base;
  });

  const hasMonstieStats = computed(() => {
    return (
      monstieStats.value?.startingStamina != null ||
      monstieStats.value?.rawRecovery != null ||
      monstieStats.value?.rawCrit != null ||
      monstieStats.value?.wyvernfell != null ||
      monstieStats.value?.rawSpeed != null
    );
  });

  function getGeneBonus(type?: SkillDetailValueType | SkillDetailFactorType): number {
    if (type == null) {
      return 0;
    }

    const value = props.build.uniqueGenes.reduce(
      (total, gene) =>
        total + (gene.details?.find((d) => d.type === type && d.condition == null)?.value ?? 0),
      0
    );

    if (type === 'maxHp') {
      return Number(((value - 1) * 100).toFixed(0));
    }

    return value;
  }

  function getBingoBonus(type?: BingoBonusType): number {
    if (type == null) {
      return 0;
    }

    return (
      props.build.monstie?.monstie?.bingoBonuses?.find(
        (bonus) => bonus.type === type && totalBingoCount.value >= bonus.bingoCount
      )?.value ?? 0
    );
  }

  function getRegionBonus(type?: RegionStatsType): number {
    if (type == null) {
      return 0;
    }

    // we only consider 'recovery' here which is 5 at 3 stars
    return props.build.region?.powers?.stats?.includes(type) ? 5 : 0;
  }

  function getStatBonus(
    base: number | undefined,
    geneType?: SkillDetailValueType | SkillDetailFactorType,
    bingoType?: BingoBonusType,
    regionStatsType?: RegionStatsType
  ) {
    const genes = getGeneBonus(geneType);
    const bingos = getBingoBonus(bingoType);
    const region = getRegionBonus(regionStatsType);
    const total = base != null ? base + genes + bingos + region : undefined;
    const buffed = total != null && base != null && total > base;

    let tooltip: string | undefined;
    if (buffed) {
      const parts: string[] = [];

      if (geneType !== 'maxHp') {
        parts.push(`${base} (Monstie)`);
      }

      if (genes > 0) {
        parts.push(`${genes} (Genes)`);
      }

      if (bingos > 0) {
        parts.push(`${bingos} (Bingos)`);
      }

      if (region > 0) {
        parts.push(`${region} (Region)`);
      }

      tooltip = parts.join(' + ') + ` = ${total} (Total)`;
    }

    return { base, genes, bingos, total, buffed, tooltip };
  }

  const startingStamina = computed(() => {
    return getStatBonus(monstieStats.value?.startingStamina, 'startingStamina', 'startingStamina');
  });

  const staminaRecovery = computed(() => {
    return getStatBonus(
      monstieStats.value?.rawRecovery,
      'staminaRecovery',
      'staminaRecovery',
      'recovery'
    );
  });

  const critRate = computed(() => {
    return getStatBonus(monstieStats.value?.rawCrit, 'critRate', 'crit');
  });

  const wyvernfell = computed(() => {
    return getStatBonus(monstieStats.value?.wyvernfell, 'wyvernfell', 'wyvernfell');
  });

  const rawSpeed = computed(() => {
    return getStatBonus(monstieStats.value?.rawSpeed, 'rawSpeed', 'speed');
  });

  const evasionRate = computed(() => {
    return getStatBonus(0, 'evasionRate');
  });

  const maxHp = computed(() => {
    return getStatBonus(0, 'maxHp');
  });

  const elementalResistances = computed(() => props.build.monstie?.stats?.elementalResistance);

  const hasElementalResistances = computed(() => {
    return !isEmptyObject(elementalResistances.value);
  });
</script>

<template>
  <section class="@container flex flex-col gap-3">
    <div v-if="hasMonstieStats">
      <h3 class="text-lg font-semibold">Stats</h3>

      <div
        class="grid @sm:grid-cols-2 @sm:grid-rows-2 @sm:gap-x-12 @3xl:grid-cols-4 @3xl:grid-rows-1"
      >
        <div v-if="startingStamina.base != null" class="flex items-center justify-between gap-2">
          <span>Starting Stamina</span>
          <AppTooltip :tooltip="startingStamina.tooltip" :content="{ side: 'top' }">
            <span
              class="text-right font-semibold"
              :class="{
                'text-emerald-600 dark:text-emerald-500': startingStamina.buffed,
              }"
              v-text="startingStamina.total"
            />
          </AppTooltip>
        </div>

        <div v-if="staminaRecovery.base != null" class="flex items-center justify-between gap-2">
          <span>Stamina Recovery</span>
          <AppTooltip :tooltip="staminaRecovery.tooltip" :content="{ side: 'top' }">
            <span
              class="text-right font-semibold"
              :class="{
                'text-emerald-600 dark:text-emerald-500': staminaRecovery.buffed,
              }"
              v-text="staminaRecovery.total"
            />
          </AppTooltip>
        </div>

        <div v-if="critRate.base != null" class="flex items-center justify-between gap-2">
          <span>Crit Rate</span>
          <AppTooltip :tooltip="critRate.tooltip" :content="{ side: 'top' }">
            <span
              class="text-right font-semibold"
              :class="{ 'text-emerald-600 dark:text-emerald-500': critRate.buffed }"
              v-text="`${critRate.total}%`"
            />
          </AppTooltip>
        </div>

        <div
          v-if="monstieStats?.wyvernfell != null"
          class="flex items-center justify-between gap-2"
        >
          <span>Wyvernfell</span>
          <AppTooltip :tooltip="wyvernfell.tooltip" :content="{ side: 'top' }">
            <span
              class="text-right font-semibold"
              :class="{ 'text-emerald-600 dark:text-emerald-500': wyvernfell.buffed }"
              v-text="wyvernfell.total"
            />
          </AppTooltip>
        </div>

        <div v-if="rawSpeed.base != null" class="flex items-center justify-between gap-2">
          <span>Speed</span>
          <AppTooltip :tooltip="rawSpeed.tooltip" :content="{ side: 'top' }">
            <span
              class="text-right font-semibold"
              :class="{ 'text-emerald-600 dark:text-emerald-500': rawSpeed.buffed }"
              v-text="rawSpeed.total"
            />
          </AppTooltip>
        </div>

        <div v-if="evasionRate.total != null" class="flex items-center justify-between gap-2">
          <span>Evasion</span>
          <AppTooltip :tooltip="evasionRate.tooltip" :content="{ side: 'top' }">
            <span
              class="text-right font-semibold"
              :class="{ 'text-emerald-600 dark:text-emerald-500': evasionRate.buffed }"
              v-text="`+${evasionRate.total}%`"
            />
          </AppTooltip>
        </div>

        <div v-if="maxHp.total != null" class="flex items-center justify-between gap-2">
          <span>HP</span>
          <AppTooltip :tooltip="maxHp.tooltip" :content="{ side: 'top' }">
            <span
              class="text-right font-semibold"
              :class="{ 'text-emerald-600 dark:text-emerald-500': maxHp.buffed }"
              v-text="`+${maxHp.total}%`"
            />
          </AppTooltip>
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

      <div v-if="build.dualElement" class="mt-1.5 text-sm text-dimmed">
        Note that resistances for <strong class="font-semibold">dual element</strong> monsties can
        be different
      </div>
    </div>
  </section>
</template>
