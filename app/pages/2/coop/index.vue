<script lang="ts" setup>
  import { groupBy } from 'es-toolkit/array';
  import { coopQuests as coopQuests_ } from '~/services/2/data';
  import { formatCoopQuestType } from '~/services/2/presentation';

  useSeoMeta({
    title: `Co-Op Quest List (Dens) For ${gameTypeToFullLabel('mhst2')}`,
    description: 'Overview of co-op missions and list of eggs you can find in the different dens',
  });
  const headline = gameTypeToFullName('mhst2');

  const coopQuests = groupBy(coopQuests_, (coopQuest) => coopQuest.type);
</script>

<template>
  <!-- TODO CSS -->

  <div>
    <UPageHeader
      title="Co-Op Quests"
      description="Overview of co-op missions and list of eggs you can find in the different dens"
      :headline="headline"
    />

    <UPageBody>
      <ul class="space-y-8">
        <li v-for="(quests, type) in coopQuests" :key="type">
          <div
            class="sticky top-12 z-10 -mx-1 -mt-3 -mb-1 flex items-center border-t border-neutral-300 bg-neutral-300 px-1 py-1 dark:border-neutral-700 dark:bg-neutral-700"
          >
            <UIcon name="ph:question" class="w-6! text-neutral-500 dark:text-neutral-400" />

            <div class="mb-1 font-semibold">
              {{ formatCoopQuestType(type) }}
            </div>
          </div>

          <div class="box mt-1 overflow-hidden">
            <div v-for="(quest, index) in quests" :key="quest.slug">
              <div v-if="index > 0" class="border-t border-neutral-300 dark:border-neutral-600" />

              <NuxtLink
                :to="`/2/coop/${quest.slug}`"
                class="box-link block px-6 py-2 font-semibold"
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
