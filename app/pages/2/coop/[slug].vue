<script lang="ts" setup>
  import type { MonsterLocation } from '~/services/2/types';
  import type { Mode } from '~/stores/2/baseMonsterFilter';
  import S2CoopQuestSidebar from '~/components/s2/S2CoopQuestSidebar.vue';
  import { groupBy, sortBy } from 'es-toolkit/array';
  import { coopQuestsBySlug, getMonstersByCoopQuest } from '~/services/2/data';
  import { getCoopQuestSeo } from '~/services/2/seo';
  import { formatCoopQuest, formatCoopQuestType } from '~/services/2/presentation';
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
          to.meta.mobileHeaderTitle = formatCoopQuest(coopQuest);
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

    let part3 = `is rated ★${coopQuest.rarity}.`;

    if (coopQuest.type === 'explore' && monsterCount.value > 1) {
      part3 += ` You can find ${monsterCount.value} different monstie eggs inside.`;
    }

    return [part1, part2, part3];
  });

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
  <!-- TODO CSS -->

  <div>
    <UPageHeader
      :title="coopQuest.name"
      :headline="headline"
      :ui="{ headline: 'hidden lg:flex', title: 'hidden lg:flex' }"
    >
      <template #description>
        {{ descriptionParts[0] }}
        <AppNuxtLink to="/2/coop">{{ descriptionParts[1] }}</AppNuxtLink>
        {{ descriptionParts[2] }}
      </template>
    </UPageHeader>

    <UPageBody>
      <ul class="space-y-5">
        <li v-for="(group, key) in items" :key="key">
          <div
            v-if="isGrouped"
            class="sticky top-12 z-10 -mx-1 -mt-3 -mb-1 flex items-center border-t border-neutral-300 bg-neutral-300 px-1 py-1 dark:border-neutral-700 dark:bg-neutral-700"
          >
            <UIcon name="ph:map-pin-fill" class="w-6! text-neutral-500 dark:text-neutral-400" />

            <div class="mb-1 font-semibold" v-text="key" />
          </div>

          <div class="mt-1 grid gap-3 md:grid-cols-2">
            <S2MonsterSmartListItem
              v-for="item in group"
              :key="item.monster.no"
              :monster="item.monster"
              :display="displays.current"
              :mode="mode"
              :ticket="getTicket(item.quest)"
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
