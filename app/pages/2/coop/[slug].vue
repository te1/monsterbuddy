<script lang="ts" setup>
  import type { MonsterLocation } from '~/services/2/types';
  import { coopQuestsBySlug, getMonstersByCoopQuest } from '~/services/2/data';
  import { getCoopQuestSeo } from '~/services/2/seo';
  import { formatCoopQuest } from '~/services/2/presentation';
  import { groupBy, sortBy } from 'es-toolkit/array';

  const route = useRoute();
  const coopQuest = coopQuestsBySlug.get(route.params.slug as string);

  if (!coopQuest) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }

  const items = computed(() => {
    const monsters = getMonstersByCoopQuest(coopQuest.name);

    let items = monsters.map((monster) => {
      const quest = monster.locations.find(
        (location) => location.type === 'coopQuest' && location.main === coopQuest.name
      );

      return {
        monster,
        quest,
      };
    });

    items = sortBy(items, [(item) => !item.quest?.finalNest]);

    return groupBy(items, (item) => (item.quest?.finalNest ? 'Final Nest' : 'Normal Nest'));
  });

  const monsterCount = computed(() => Object.values(items).flat().length);

  useSeoMeta(getCoopQuestSeo(coopQuest, monsterCount.value));
  const headline = gameTypeToFullName('mhst2');

  const description = computed(() => formatCoopQuest(coopQuest));
  const isGrouped = computed(() => coopQuest.type === 'explore');

  type Display = 'egg' | 'monstie' | 'monster' | undefined;

  const displays = computed<Display[]>(() => {
    switch (coopQuest.type) {
      case 'explore':
        return ['egg', 'monstie'];

      case 'slay':
        return ['monster', 'egg'];

      case 'time':
        return ['monster'];

      default:
        return [];
    }
  });

  const display = ref<Display>(displays.value[0]);

  const nextDisplay = computed(() => {
    const currentIndex = displays.value.indexOf(display.value);
    const nextIndex = (currentIndex + 1) % displays.value.length;

    return displays.value[nextIndex];
  });

  function toggleDisplay() {
    display.value = nextDisplay.value;
  }

  const mode = computed(() => {
    switch (display.value) {
      case 'monster':
        return 'combat';

      case 'monstie':
      case 'egg':
        return 'rarity';

      default:
        return undefined;
    }
  });

  function getTicket(quest?: MonsterLocation) {
    if (quest?.srTicket) {
      return 'sr';
    }
    return undefined;
  }

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
        return 'i-lucide-image';

      case 'egg':
        return 'i-lucide-egg';

      default:
        return null;
    }
  });
</script>

<template>
  <!-- TODO CSS -->

  <div>
    <UPageHeader :title="coopQuest.name" :description="description" :headline="headline" />

    <UPageBody>
      <ClientOnly>
        <UTooltip v-if="fabVisible" :text="fabTitle">
          <UButton color="neutral" variant="soft" :icon="fabIcon" @click="toggleDisplay" />
        </UTooltip>
      </ClientOnly>

      <ul class="space-y-5">
        <li v-for="(group, key) in items" :key="key">
          <div
            v-if="isGrouped"
            class="sticky top-12 z-10 -mx-1 -mt-3 -mb-1 flex items-center border-t border-neutral-300 bg-neutral-300 px-1 py-1 dark:border-neutral-700 dark:bg-neutral-700"
          >
            <UIcon name="i-lucide-map-pin" class="w-6! text-neutral-500 dark:text-neutral-400" />

            <div class="mb-1 font-semibold" v-text="key" />
          </div>

          <div class="mt-1 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <S2MonsterSmartListItem
              v-for="item in group"
              :key="item.monster.no"
              :monster="item.monster"
              :display="display"
              :mode="mode"
              :ticket="getTicket(item.quest)"
            />
          </div>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
