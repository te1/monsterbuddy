<script lang="ts" setup>
  import { groupBy } from 'es-toolkit/array';
  import { coopQuests as coopQuests_ } from '~/services/2/data';
  import { formatCoopQuestType } from '~/services/2/presentation';

  definePageMeta({
    mobileHeaderTitle: 'Co-Op Quests',
  });

  useSeoMeta({
    title: `Co-Op Quest List (Dens) For ${gameTypeToFullLabel('mhst2')}`,
    description: 'Overview of co-op missions and list of eggs you can find in the different dens',
  });
  const headline = gameTypeToFullName('mhst2');

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        { name: gameTypeToShortLabel('mhst2'), item: '/2' },
        { name: 'Co-Op Quests' },
      ],
    }),
  ]);

  defineOgImage(
    'Title',
    {
      title: 'All Co-Op Quests',
      description: headline,
      lines: ['Dens', 'Eggs', 'Monsters'],
      game: 'mhst2',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );

  const coopQuests = groupBy(coopQuests_, (coopQuest) => coopQuest.type);
</script>

<template>
  <div>
    <AppPageHeader
      title="Co-Op Quests"
      description="Important co-op quests and eggs you can find in the different dens"
      :headline="headline"
    />

    <UPageBody>
      <ul class="flex flex-col gap-3">
        <li v-for="(quests, type) in coopQuests" :key="type">
          <div
            class="sticky top-(--ui-header-height) z-10 -mx-1 flex items-center bg-elevated/90 p-1 backdrop-blur dark:bg-muted/90"
          >
            <UIcon name="ph:question-mark-bold" class="w-6" />

            <div class="font-semibold">
              {{ formatCoopQuestType(type) }}
            </div>
          </div>

          <div class="box overflow-hidden">
            <div v-for="(quest, index) in quests" :key="quest.slug">
              <div
                v-if="index > 0"
                class="border-2 border-t border-neutral-100 dark:border-default"
              />

              <NuxtLink
                :to="`/2/coop/${quest.slug}`"
                prefetchOn="interaction"
                class="box-link block px-6 py-2"
              >
                <span class="inline-block w-48">
                  {{ quest.name }}
                </span>
                <span>★{{ quest.rarity }}</span>
              </NuxtLink>
            </div>
          </div>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
