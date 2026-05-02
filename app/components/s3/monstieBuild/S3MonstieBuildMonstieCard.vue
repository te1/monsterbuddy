<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import { computedAsync } from '@vueuse/core';
  import { getAreasByElement } from '~/services/3/data';
  import { statsTypeToText } from '~/services/3/presentation';
  import useMonstieBuildHistoryStore from '~/stores/3/monstieBuildHistoryStore';

  const props = defineProps<{ build: MonstieBuild }>();

  const history = useMonstieBuildHistoryStore();

  const dualElementAreas = computed(() => {
    if (!props.build.dualElement) {
      return [];
    }

    return getAreasByElement(props.build.dualElement);
  });

  const isPinned = computedAsync(async () => {
    return await history.isBuildPinned(props.build.id);
  }, false);

  function togglePin() {
    history.togglePinnedBuild(props.build.id);
  }
</script>

<template>
  <section class="relative">
    <h3 class="px-4 pt-2 text-lg font-semibold">Monstie</h3>

    <div v-if="build.monstie" class="box-link">
      <NuxtLink :to="`/3/monsters/${build.monstie.slug}`" prefetchOn="interaction">
        <S3MonstieListItem :monster="build.monstie" mode="location" class="px-2.5" />
      </NuxtLink>
    </div>

    <div class="flex flex-col gap-3 px-4 pb-2">
      <div>
        <div class="flex items-center justify-between gap-1">
          <h3 class="text-lg font-semibold">Dual Element</h3>

          <div v-if="build.dualElement" class="flex items-center">
            <ElementIcon :element="build.dualElement" icon2 noTooltip />
            <ElementLabel :element="build.dualElement" />
          </div>
          <div v-else class="text-dimmed" v-text="'No second element'" />
        </div>

        <div v-if="dualElementAreas.length > 0">
          From areas
          <span v-for="(area, index) in dualElementAreas" :key="area.region.slug + area.area.slug">
            <AppNuxtLink
              :to="`/3/habitats/${area.region.slug}/${area.area.slug}`"
              prefetchOn="interaction"
              :text="area.area.name"
            />{{ index + 1 < dualElementAreas.length ? ', ' : '' }}
          </span>
        </div>
      </div>

      <div v-if="build.region">
        <div class="flex flex-col justify-between xs:flex-row xs:items-center xs:gap-1">
          <h3 class="text-lg font-semibold">Stat Increases</h3>

          <div v-text="build.region.powers.stats.map(statsTypeToText).join(', ')" />
        </div>

        <div>
          From region
          <AppNuxtLink
            :to="`/3/habitats/${build.region.slug}`"
            prefetchOn="interaction"
            :text="build.region.name"
          />
        </div>
      </div>
    </div>

    <div class="absolute top-1 right-1">
      <ClientOnly>
        <AppPinToggle
          :modelValue="isPinned"
          subject="build"
          noLabel
          @update:modelValue="togglePin"
        />
      </ClientOnly>
    </div>
  </section>
</template>
