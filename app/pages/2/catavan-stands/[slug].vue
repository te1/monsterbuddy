<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import type { Mode } from '~/stores/2/baseMonsterFilter';
  import S2CatavanStandSidebar from '~/components/s2/S2CatavanStandSidebar.vue';
  import { catavanStandsBySlug, getMonstersByCatavanStand } from '~/services/2/data';
  import { getCatavanStandSeo } from '~/services/2/seo';
  import useCatavanStandDisplays from '~/stores/2/catavanStandDisplays';

  definePageMeta({
    sidebarComponent: S2CatavanStandSidebar,
    back: {
      show: true,
      fallback: '/2/catavan-stands',
    },
    middleware: [
      (to) => {
        const catavanStand = catavanStandsBySlug.get(to.params.slug as string);
        if (catavanStand) {
          to.meta.mobileHeaderTitle = catavanStand.name;
        }
      },
    ],
  });

  const route = useRoute();
  const catavanStand = catavanStandsBySlug.get(route.params.slug as string);

  if (!catavanStand) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }

  const monsters = computed(() => getMonstersByCatavanStand(catavanStand.name));

  useSeoMeta(getCatavanStandSeo(catavanStand, monsters.value.length));
  const headline = gameTypeToFullName('mhst2');

  const descriptionParts = computed(() => {
    let part1 = 'You can find ';

    const monsterCount = monsters.value.length;

    if (monsterCount === 1) {
      part1 += `one monster `;
    } else {
      part1 += `${monsterCount} different monsters `;
    }

    part1 += 'nearby this ';

    const part2 = 'catavan stand';

    let part3 = '';

    if (catavanStand.zone) {
      part3 += ` in ${catavanStand.zone}`;
    }

    part3 += '.';

    return [part1, part2, part3];
  });

  const displays = useCatavanStandDisplays();

  const fabDisplayVisible = computed(() => displays.all.length > 1);

  const fabDisplayTooltip = computed(() => {
    switch (displays.next) {
      case 'monster':
        return 'Show monsters';

      case 'monstie':
        return 'Show monsties';

      case 'egg':
        return 'Show eggs';

      default:
        return undefined;
    }
  });

  const fabDisplayIcon = computed(() => {
    switch (displays.next) {
      case 'monster':
        return 'ph:book-open';

      case 'monstie':
        return 'ph:note';

      case 'egg':
        return 'ph:egg';

      default:
        return undefined;
    }
  });

  function getMode(monster: Monster): Mode | undefined {
    switch (displays.current) {
      case 'monster':
        return 'rarity';

      case 'monstie':
      case 'egg':
        return monster.hatchable ? 'retreat' : 'rarity';

      default:
        return undefined;
    }
  }

  function toggleDisplay() {
    displays.setCurrent(displays.next);
  }
</script>

<template>
  <div>
    <UPageHeader
      :title="catavanStand.name"
      :headline="headline"
      :ui="{ headline: 'hidden lg:flex', title: 'hidden lg:flex' }"
    >
      <template #description>
        {{ descriptionParts[0] }}
        <AppNuxtLink to="/2/catavan-stands">{{ descriptionParts[1] }}</AppNuxtLink>
        {{ descriptionParts[2] }}
      </template>
    </UPageHeader>

    <UPageBody>
      <div class="mt-1 grid gap-3 md:grid-cols-2">
        <S2MonsterSmartListItem
          v-for="monster in monsters"
          :key="monster.no"
          :monster="monster"
          :display="displays.current"
          :mode="getMode(monster)"
        />
      </div>
    </UPageBody>

    <ClientOnly>
      <AppFabPanel>
        <AppFab
          v-if="fabDisplayVisible"
          :tooltip="fabDisplayTooltip"
          :icon="fabDisplayIcon"
          @click="toggleDisplay"
        />
      </AppFabPanel>
    </ClientOnly>
  </div>
</template>
