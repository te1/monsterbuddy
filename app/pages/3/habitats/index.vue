<script lang="ts" setup>
  import type { Region, RegionArea } from '~/services/3/types';
  import { monstersByName, regions } from '~/services/3/data';

  const headline = gameTypeToFullName('mhst3');

  useSeoMeta({
    title: `Area List And Habitat Restoration Info For ${gameTypeToFullLabel('mhst3')}`,
    description:
      'Overview of areas and list of monsters you will find there including feral and invasive monsters and endangered species',
  });

  // TODO seo, breadcrumps, og image

  function getInvasive(region: Region) {
    return region.monsters.invasive
      .map((monsterName) => monstersByName.get(monsterName))
      .filter((monster) => monster != null);
  }

  function getEndangered(region: Region) {
    return region.monsters.endangered
      .map((monsterName) => monstersByName.get(monsterName))
      .filter((monster) => monster != null);
  }

  function getPermanent(area: RegionArea) {
    return area.permanent
      .map((monsterName) => monstersByName.get(monsterName))
      .filter((monster) => monster != null);
  }
</script>

<template>
  <div>
    <AppPageHeader
      title="Habitat Restoration"
      description="Overview of areas and list of monsters you will find there including feral and invasive monsters and endangered species"
      :headline="headline"
    />

    <UPageBody>
      <ul class="relative flex flex-col gap-6">
        <li v-for="region in regions" :key="region.name">
          <h2
            class="sticky top-(--ui-header-height) z-10 -mx-1 bg-elevated/90 p-1 text-2xl font-medium backdrop-blur dark:bg-muted/90"
          >
            <AppNuxtLink :to="`/3/habitats/${region.slug}`" prefetchOn="interaction">
              {{ region.name }}
            </AppNuxtLink>
          </h2>

          <ul class="flex flex-col gap-6">
            <li class="flex flex-col gap-3">
              <div class="flex flex-col gap-1.5">
                <div>Invasive Monster</div>

                <div class="flex items-center gap-3">
                  <NuxtLink
                    v-for="monster in getInvasive(region)"
                    :key="monster.slug"
                    :to="`/3/monsters/${monster.slug}`"
                    prefetchOn="interaction"
                  >
                    <S3MonsterIcon :monster="monster" class="" />
                  </NuxtLink>
                </div>
              </div>

              <div class="flex flex-col gap-1.5">
                <div>Endangered Species</div>

                <div class="mt-1 flex items-center gap-3">
                  <NuxtLink
                    v-for="monster in getEndangered(region)"
                    :key="monster.slug"
                    :to="`/3/monsters/${monster.slug}`"
                    prefetchOn="interaction"
                  >
                    <S3MonsterIcon :monster="monster" class="" />
                  </NuxtLink>
                </div>
              </div>
            </li>

            <li v-for="area in region.areas" :key="area.name">
              <h3 class="flex items-center gap-1 text-lg font-semibold">
                <AppNuxtLink
                  :to="`/3/habitats/${region.slug}/${area.slug}`"
                  prefetchOn="interaction"
                >
                  {{ area.name }}
                </AppNuxtLink>
                <ElementIcon :element="area.element" class="size-6" />
              </h3>

              <div class="mt-0.5">Permanent Habitat</div>

              <div class="mt-1.5 flex items-center gap-3">
                <NuxtLink
                  v-for="monster in getPermanent(area)"
                  :key="monster.slug"
                  :to="`/3/monsters/${monster.slug}`"
                  prefetchOn="interaction"
                >
                  <S3MonsterIcon :monster="monster" class="" />
                </NuxtLink>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
