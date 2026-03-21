<script lang="ts" setup>
  import type { MonsterLocation } from '~/services/2/types';
  import type { Mode } from '~/stores/2/baseMonsterFilter';
  import S2CoopQuestSidebar from '~/components/s2/S2CoopQuestSidebar.vue';
  import { groupBy, sortBy } from 'es-toolkit/array';
  import { coopQuestsBySlug, getMonstersByCoopQuest } from '~/services/2/data';
  import { getCoopQuestSeo } from '~/services/2/seo';
  import { formatCoopQuestType } from '~/services/2/presentation';
  import useCoopQuestDisplays from '~/stores/2/coopQuestDisplays';

  definePageMeta({
    sidebarComponent: S2CoopQuestSidebar,
    back: {
      show: true,
      fallback: '/2/coop',
    },
    middleware: [
      (to) => {
        const coopQuest = coopQuestsBySlug.get(to.params.slug as string);
        if (coopQuest) {
          to.meta.mobileHeaderTitle = coopQuest.name;
        }
      },
    ],
  });

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

  const eagerCardsCount = 14;

  const groupedItems = computed(() => {
    let index = 0;

    return Object.entries(items.value).map(([key, group]) => ({
      key,
      items: group.map((item) => ({
        monster: item.monster,
        quest: item.quest,
        eager: index++ < eagerCardsCount,
      })),
    }));
  });

  const monsterCount = computed(() => Object.values(items.value).flat().length);

  useSeoMeta(getCoopQuestSeo(coopQuest, monsterCount.value));
  const headline = gameTypeToFullName('mhst2');

  const descriptionParts = computed(() => {
    const type = formatCoopQuestType(coopQuest.type);

    let part1 = `This `;

    if (type) {
      part1 += `(${type}) `;
    }

    const part2 = 'co-op quest';

    let part3 = `is rated ★${coopQuest.rarity}`;

    if (coopQuest.type === 'explore' && monsterCount.value > 1) {
      part3 += ` and you can find ${monsterCount.value} notable eggs inside`;
    }

    return [part1, part2, part3];
  });

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: 'Co-Op Quests', url: '/2/coop' },
        { name: coopQuest.name },
      ],
    }),
  ]);

  defineOgImage(
    'Title',
    {
      title: coopQuest.name,
      description: headline,
      lines: [
        `Co-Op Quest (${formatCoopQuestType(coopQuest.type)})`,
        coopQuest.type === 'explore' && monsterCount.value > 1
          ? `${monsterCount.value} Notable Eggs`
          : '',
      ],
      game: 'mhst2',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );

  const isGrouped = computed(() => coopQuest.type === 'explore');

  const displays = useCoopQuestDisplays();
  displays.type = coopQuest.type;
  if (displays.all[0] != null) {
    displays.setCurrent(displays.all[0]);
  }

  function toggleDisplay() {
    displays.setCurrent(displays.next);
  }

  const mode = computed<Mode | undefined>(() => {
    switch (displays.current) {
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

  const fabDisplayVisible = computed(() => displays.all.length > 1);

  const fabDisplayTooltip = computed(() => {
    switch (displays.next) {
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
      case 'monstie':
        return 'ph:book-open';

      case 'egg':
        return 'ph:egg';

      default:
        return undefined;
    }
  });
</script>

<template>
  <div>
    <AppPageHeader :title="coopQuest.name" :headline="headline">
      <template #description>
        {{ descriptionParts[0] }}
        <AppNuxtLink to="/2/coop" :text="descriptionParts[1]" />
        {{ descriptionParts[2] }}
      </template>
    </AppPageHeader>

    <UPageBody>
      <ul class="flex flex-col gap-3">
        <li v-for="group in groupedItems" :key="group.key">
          <div
            v-if="isGrouped"
            class="sticky top-(--ui-header-height) z-10 -mx-1 flex items-center bg-elevated/90 p-1 backdrop-blur dark:bg-muted/90"
          >
            <UIcon name="ph:map-pin-fill" class="w-6 text-dimmed" />

            <div class="font-medium" v-text="group.key" />
          </div>

          <div class="grid gap-3 md:grid-cols-2">
            <S2MonsterSmartListItem
              v-for="item in group.items"
              :key="item.monster.no"
              :monster="item.monster"
              :display="displays.current"
              :mode="mode"
              :ticket="getTicket(item.quest)"
              :eager="item.eager"
            />
          </div>
        </li>
      </ul>
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
