<script lang="ts" setup>
  import { groupBy } from 'es-toolkit/array';
  import { sortedRidingActions } from '~/services/3/data';
  import { formatRidingActionType } from '~/services/3/presentation';

  definePageMeta({
    mobileHeaderTitle: 'Riding Actions',
  });

  useSeoMeta({
    title: `Riding Actions In ${gameTypeToFullLabel('mhst3')}`,
    description: 'Overview of all riding actions and list of monsties that can learn them',
  });
  const headline = gameTypeToFullName('mhst3');

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        { name: gameTypeToShortLabel('mhst3'), url: '/3' },
        { name: 'Riding Actions' },
      ],
    }),
  ]);

  defineOgImage(
    'Title',
    {
      title: 'All Riding Actions',
      description: headline,
      lines: ['Types', 'Monsties'],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );

  const ridingActions = groupBy(sortedRidingActions, (ridingAction) => ridingAction.type);
</script>

<template>
  <div>
    <AppPageHeader
      title="Riding Actions"
      description="All the riding actions and monsties that can learn them"
      :headline="headline"
    />

    <UPageBody>
      <ul class="flex flex-col gap-3">
        <li v-for="(actions, type) in ridingActions" :key="type">
          <div
            class="sticky top-(--ui-header-height) z-10 -mx-1 flex items-center bg-elevated/90 p-1 backdrop-blur dark:bg-muted/90"
          >
            <UIcon name="ph:exclamation-mark-bold" class="w-6" />

            <div class="font-semibold">
              {{ formatRidingActionType(type) }}
            </div>
          </div>

          <div class="box overflow-hidden">
            <div v-for="(action, index) in actions" :key="action.slug">
              <div
                v-if="index > 0"
                class="border-2 border-t border-neutral-100 dark:border-default"
              />

              <NuxtLink
                :to="`/3/riding-actions/${action.slug}`"
                prefetchOn="interaction"
                class="box-link block px-6 py-2"
              >
                {{ action.name }}
              </NuxtLink>
            </div>
          </div>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
