<script lang="ts" setup>
  import { monsters as monsters_ } from '~/services/2/data';

  const headline = gameTypeToFullName('mhst2');

  useSeoMeta({
    title: `Elder's Lair Monster List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      "Overview of all the high rank monsters and on which floor to find them in the Elder's Lair and Special Elder's Lair end game zones",
  });

  // TODO use store with grouping, sorting and filtering
  const monsters = computed(() =>
    monsters_.filter((monster) =>
      monster.locations.some((location) => location.type === 'eldersLair')
    )
  );
</script>

<template>
  <div>
    <UPageHeader
      title="Elder's Lair"
      description="Overview of all the high rank monsters and on which floor to find them in the Elder's Lair and Special Elder's Lair end game zones"
      :headline="headline"
    />

    <UPageBody>
      <NuxtLink v-for="monster in monsters" :key="monster.no" :to="`/2/monsters/${monster.slug}`">
        <S2MonsterListItem :monster="monster" class="box box-link overflow-hidden px-1" />
        <!-- :mode="eldersLairFilter.mode" -->
      </NuxtLink>
    </UPageBody>
  </div>
</template>
