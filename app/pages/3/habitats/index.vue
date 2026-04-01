<script lang="ts" setup>
  import type { Region, RegionArea } from '~/services/3/types';
  import { monstersByName, regions } from '~/services/3/data';

  const headline = gameTypeToFullName('mhst3');

  // TODO seo
  useSeoMeta({
    title: `Area List And Habitat Restoration Info For ${gameTypeToFullLabel('mhst3')}`,
    description:
      'Overview of areas and list of monsters you will find there including feral and invasive monsters and endangered species',
  });

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: gameTypeToShortLabel('mhst3'), item: '/3' },
        { name: 'Habitat Restoration' },
      ],
    }),
  ]);

  defineOgImage(
    'Title',
    {
      title: 'Habitat Restoration',
      description: headline,
      lines: ['Regions & Areas', 'Invasive Monsters', 'Endangered Species'],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );

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
      description="All regions and areas with the monsters you can find there. Defeating invasive monsters unlocks endangered species which can lead to further mutations."
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

          <ul class="@container flex flex-col gap-6">
            <li class="grid gap-3 @3xl:grid-cols-2 @5xl:w-fit @5xl:gap-x-24">
              <div class="flex w-fit flex-col gap-1.5 @3xl:min-w-87">
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

              <div class="flex w-fit flex-col gap-1.5">
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

            <div class="grid gap-6 @3xl:grid-cols-2 @5xl:w-fit @5xl:gap-x-24">
              <li v-for="area in region.areas" :key="area.name" class="w-fit">
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
            </div>
          </ul>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
