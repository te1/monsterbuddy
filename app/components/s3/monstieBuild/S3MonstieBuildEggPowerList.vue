<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import type { EggPowerRequirement } from '~/services/3/types';
  import { regionsByName } from '~/services/3/data';

  const props = defineProps<{ build: MonstieBuild }>();

  const eggPowers = computed(() => {
    const all = props.build.eggPowers.filter((eggPower) => eggPower !== undefined);

    return all.map((eggPower) => {
      return {
        item: eggPower,
        awakened: eggPower ? props.build.isEggPowerAwakened(eggPower) : false,
        region: eggPower ? regionsByName.get(eggPower.region) : null,
      };
    });
  });

  function formatEggPowerRequirement(requirement: EggPowerRequirement): string {
    let what = '';
    if ('element' in requirement) {
      what = formatElement(requirement.element);
    }
    if ('type' in requirement) {
      what = formatAttackType(requirement.type);
    }

    const present = props.build.hasRequirement(requirement);

    if (present) {
      return `${what} Gene`;
    }

    return `${what} Gene missing`;
  }
</script>

<template>
  <section v-if="eggPowers.length > 0">
    <h3 class="px-4 pt-2 text-lg font-semibold">Egg Powers</h3>

    <div v-for="(eggPower, index) in eggPowers" :key="index" :class="{ 'mb-2': eggPower.item }">
      <div v-if="index > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

      <div v-if="eggPower.item" class="box-link">
        <NuxtLink :to="`/3/egg-powers/${eggPower.item.slug}`" prefetchOn="interaction">
          <S3EggPowerListItem
            :eggPower="eggPower.item"
            :awakened="eggPower.awakened"
            class="px-2.5"
          />
        </NuxtLink>
      </div>
      <div v-else class="@container flex items-center gap-1.5 px-2.5">
        <S3EggPowerIcon class="m-1.5 shrink-0" :eggPower="undefined" big contrast />

        <div class="font-semibold text-dimmed" v-text="'No egg power'" />
      </div>

      <div v-if="eggPower.item" class="-mt-2 ml-17 flex items-center gap-1">
        <div class="w-20">
          <span
            v-if="eggPower.awakened"
            class="text-emerald-700 dark:text-emerald-500"
            v-text="'Awakened'"
          />
          <span v-else class="text-red-600 dark:text-red-400" v-text="'Awakening'" />
        </div>

        <div v-if="eggPower.item" class="flex items-center gap-1">
          <div
            v-for="(requirement, index2) in eggPower.item.variants[1]?.requirements ?? []"
            :key="index2"
            class="size-7"
            :class="{ 'opacity-50': !build.hasRequirement(requirement) }"
          >
            <AppTooltip
              :tooltip="formatEggPowerRequirement(requirement)"
              :content="{ side: 'top' }"
            >
              <ElementIcon
                v-if="'element' in requirement"
                :element="requirement.element"
                icon2
                noTooltip
              />
              <AttackTypeIcon
                v-if="'type' in requirement"
                :type="requirement.type"
                icon2
                noTooltip
                class="dark:invert"
              />
            </AppTooltip>
          </div>
        </div>
      </div>

      <div v-if="eggPower.region" class="-mt-1 ml-17">
        Region
        <AppNuxtLink
          :to="`/3/habitats/${eggPower.region.slug}`"
          prefetchOn="interaction"
          :text="eggPower.region.name"
        />
      </div>
    </div>
  </section>
</template>
