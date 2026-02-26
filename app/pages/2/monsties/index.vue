<script lang="ts" setup>
  import { monsties } from '~/services/2/data';

  const headline = gameTypeToFullName('mhst2');

  useSeoMeta({
    title: `Monstie List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      'Easily find all monsties in their natural habitats and check on retreat conditions, their attack types and stats',
  });

  const mode = computed(() => {
    return 'location'; // TODO
    // return this.monstieFilter.mode;
  });
</script>

<template>
  <div>
    <UPageHeader
      title="Monsties"
      description="Easily find all monsties in their natural habitats and check on retreat conditions, their attack types and stats"
      :headline="headline"
    />

    <UPageBody>
      <NuxtLink v-for="monster in monsties" :key="monster.no" :to="`/2/monsters/${monster.slug}/`">
        <S2MonsterListItem
          :monster="monster"
          :mode="mode"
          class="box box-link overflow-hidden px-1"
        />
      </NuxtLink>
    </UPageBody>
  </div>
</template>
