<script lang="ts" setup>
  import { monsties } from '~/services/2/data';

  const headline = gameTypeToFullName('mhst2');

  useSeoMeta({
    title: `Egg List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      'Visual guide with images for all egg patterns for every hatchable monstie with search, sorting and filtering',
  });

  // TODO use store with grouping, sorting and filtering
  const mode = 'compact';
</script>

<template>
  <div>
    <UPageHeader
      title="Eggs"
      description="Visual guide with images for all egg patterns for every hatchable monstie"
      :headline="headline"
    />

    <UPageBody>
      <div
        v-if="mode === 'compact'"
        class="mt-1 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        <NuxtLink
          v-for="monster in monsties"
          :key="monster.no"
          :to="`/2/monsters/${monster.slug}/`"
        >
          <S2EggGridItem :monster="monster" class="box box-link overflow-hidden px-1" />
        </NuxtLink>
      </div>

      <div v-else class="mt-1 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <NuxtLink
          v-for="monster in monsties"
          :key="monster.no"
          :to="`/2/monsters/${monster.slug}/`"
        >
          <S2EggListItem
            :monster="monster"
            :mode="mode"
            class="box box-link overflow-hidden px-1"
          />
        </NuxtLink>
      </div>
    </UPageBody>
  </div>
</template>
