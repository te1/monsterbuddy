<script lang="ts" setup>
  import { monsters } from '~/services/2/data';

  const headline = gameTypeToFullName('mhst2');

  useSeoMeta({
    title: `Monster List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      'Quickly check for monster attack patterns, elemental weaknesses and weapon effectiveness on body parts',
  });

  const mode = computed(() => {
    return 'location'; // TODO
    // if (this.display === 'pinned') {
    //   return 'combat';
    // }
    // return this.monsterFilter.mode;
  });
</script>

<template>
  <div>
    <UPageHeader
      title="Monsters"
      description="Quickly check for monster attack patterns, elemental weaknesses and weapon effectiveness on body parts"
      :headline="headline"
    />

    <UPageBody>
      <NuxtLink v-for="monster in monsters" :key="monster.no" :to="`/2/monsters/${monster.slug}/`">
        <S2MonsterListItem
          :monster="monster"
          :mode="mode"
          class="box box-link overflow-hidden px-1"
        />
      </NuxtLink>
    </UPageBody>
  </div>
</template>
