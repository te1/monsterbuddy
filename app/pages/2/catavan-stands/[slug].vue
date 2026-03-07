<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import type { Mode } from '~/stores/2/baseMonsterFilter';
  import { catavanStandsBySlug, getMonstersByCatavanStand } from '~/services/2/data';
  import { getCatavanStandSeo } from '~/services/2/seo';

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

  const description = computed(() => {
    let result = 'You can find ';

    const monsterCount = monsters.value.length;

    if (monsterCount === 1) {
      result += `one monster `;
    } else {
      result += `${monsterCount} different monsters `;
    }

    result += 'nearby this catavan stand';

    if (catavanStand.zone) {
      result += ` in ${catavanStand.zone}`;
    }

    result += '.';

    return result;
  });

  type Display = 'monster' | 'monstie' | 'egg';
  const display = ref<Display>('monster');

  const displays = computed<Display[]>(() => ['monster', 'monstie', 'egg']);

  const nextDisplay = computed(() => {
    const currentIndex = displays.value.indexOf(display.value);
    const nextIndex = (currentIndex + 1) % displays.value.length;
    return displays.value[nextIndex] ?? 'monster';
  });

  const fabVisible = computed(() => {
    return displays.value.length > 1;
  });

  const fabTitle = computed(() => {
    switch (nextDisplay.value) {
      case 'monster':
        return 'Show monsters';

      case 'monstie':
        return 'Show monsties ';

      case 'egg':
        return 'Show eggs';

      default:
        return undefined;
    }
  });

  const fabIcon = computed(() => {
    switch (nextDisplay.value) {
      case 'monster':
      case 'monstie':
        return 'ph:image-square';

      case 'egg':
        return 'ph:egg';

      default:
        return null;
    }
  });

  function getMode(monster: Monster): Mode | undefined {
    switch (display.value) {
      case 'monster':
        return 'rarity';

      case 'monstie':
      case 'egg':
        return monster.hatchable ? 'location' : 'rarity';

      default:
        return undefined;
    }
  }

  function toggleDisplay() {
    display.value = nextDisplay.value;
  }
</script>

<template>
  <div>
    <UPageHeader :title="catavanStand.name" :headline="headline" :description="description" />

    <UPageBody>
      <ClientOnly>
        <UTooltip v-if="fabVisible" :text="fabTitle">
          <UButton
            color="neutral"
            variant="soft"
            class="absolute z-10"
            :icon="fabIcon"
            @click="toggleDisplay"
          />
        </UTooltip>
      </ClientOnly>

      <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <S2MonsterSmartListItem
          v-for="monster in monsters"
          :key="monster.no"
          :monster="monster"
          :display="display"
          :mode="getMode(monster)"
        />
      </div>
    </UPageBody>
  </div>
</template>
