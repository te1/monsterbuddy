<script lang="ts" setup>
  import { monstersByName, regions } from '~/services/3/data';

  const headline = gameTypeToFullName('mhst3');

  useSeoMeta({
    title: `Area List And Habitat Restoration Info For ${gameTypeToFullLabel('mhst3')}`,
    description:
      'Overview of areas and list of monsters you will find there including feral and invasive monsters and endangered species',
  });
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
          <NuxtLink :to="`/3/habitats/${region.slug}`" prefetchOn="interaction">
            <h2
              class="sticky top-(--ui-header-height) z-20 -mx-1 bg-elevated/90 p-1 text-xl font-medium backdrop-blur dark:bg-muted/90"
              v-text="region.name"
            />
          </NuxtLink>

          <ul class="flex flex-col gap-3">
            <li v-for="area in region.areas" :key="area.name" class="flex flex-col gap-1">
              <NuxtLink :to="`/3/habitats/${region.slug}/${area.slug}`" prefetchOn="interaction">
                <h3
                  class="sticky top-[calc(var(--ui-header-height)+2.25rem)] z-10 -mx-1 flex items-center gap-1 bg-elevated/90 p-1 text-lg backdrop-blur dark:bg-muted/90"
                >
                  <span v-text="area.name" />
                  <ElementIcon :element="area.element" class="size-6" />
                </h3>
              </NuxtLink>

              <div class="flex items-center gap-1">
                <span v-for="monsterName in area.permanent" :key="monsterName">
                  <S3MonsterIcon :monster="monstersByName.get(monsterName)!" class="" />
                </span>
                <span>Permanent</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
