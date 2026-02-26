<script lang="ts" setup>
  import { catavanStandsBySlug, getMonstersByCatavanStand } from '~/services/2/data';
  import { getCatavanStandSeo } from '~/services/2/seo';
  import type { Monster } from '~/services/2/types';

  const route = useRoute();
  const catavanStand = catavanStandsBySlug.get(route.params.slug as string);

  if (!catavanStand) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }

  const monsters = computed(() => {
    return getMonstersByCatavanStand(catavanStand.name);
  });

  useSeoMeta(getCatavanStandSeo(catavanStand, monsters.value.length));

  const headline = gameTypeToFullName('mhst2');

  const display: string | undefined = undefined;

  function getMode(monster: Monster) {
    switch (display) {
      case 'monster':
        return 'rarity';

      case 'monstie':
      case 'egg':
        if (monster.hatchable) {
          return 'retreat';
        }
        return 'rarity';

      default:
        return undefined;
    }
  }
</script>

<template>
  <div>
    <UPageHeader :title="catavanStand.name" :headline="headline" />

    <S2MonsterSmartListItem
      v-for="monster in monsters"
      :key="monster.no"
      :monster="monster"
      :display="display"
      :mode="getMode(monster)"
    />
  </div>
</template>
