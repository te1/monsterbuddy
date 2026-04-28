<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import type { EggPowerRequirement } from '~/services/3/types';
  import { uniqBy } from 'es-toolkit/array';

  const props = defineProps<{ build: MonstieBuild }>();

  const eggPowers = computed(() => {
    const all = props.build.eggPowers.filter((eggPower) => eggPower != null);
    const unique = uniqBy(all, (gene) => gene.slug);

    return unique.map((eggPower) => {
      return {
        item: eggPower,
        awakened: props.build.isEggPowerAwakened(eggPower),
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

    <div v-for="(eggPower, index) in eggPowers" :key="eggPower.item.slug">
      <div v-if="index > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

      <div class="box-link">
        <NuxtLink :to="`/3/egg-powers/${eggPower.item.slug}`" prefetchOn="interaction">
          <S3EggPowerListItem
            :eggPower="eggPower.item"
            :awakened="eggPower.awakened"
            class="px-2.5"
          />
        </NuxtLink>
      </div>

      <div class="-mt-2 mb-2 ml-17 flex items-center gap-1">
        <div class="w-20">
          <span
            v-if="eggPower.awakened"
            class="text-emerald-700 dark:text-emerald-500"
            v-text="'Awakened'"
          />
          <span v-else class="text-red-600 dark:text-red-400" v-text="'Awakening'" />
        </div>

        <div class="flex items-center gap-1">
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
    </div>
  </section>
</template>
