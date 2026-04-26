<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';

  defineProps<{ build: MonstieBuild }>();
</script>

<template>
  <section class="">
    <h3 class="px-4 pt-2 text-lg font-semibold">Monstie</h3>

    <div v-if="build.monstie" class="box-link">
      <NuxtLink :to="`/3/monsters/${build.monstie.slug}`" prefetchOn="interaction">
        <S3MonstieListItem :monster="build.monstie" mode="location" class="px-2.5" />
      </NuxtLink>
    </div>

    <div class="flex flex-col gap-1 px-4 pb-2">
      <div v-if="build.dualElement" class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Dual Element</h3>

        <div class="flex items-center gap-1">
          <ElementLabel :element="build.dualElement" />
          <ElementIcon :element="build.dualElement" icon2 noTooltip />
        </div>
      </div>

      <p>{{ build.region?.name }}</p>
    </div>
  </section>
</template>
