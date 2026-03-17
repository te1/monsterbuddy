<script lang="ts" setup>
  import { groupBy } from 'es-toolkit/array';
  import { sortedRidingActions } from '~/services/2/data';
  import { formatRidingActionType } from '~/services/2/presentation';

  definePageMeta({
    mobileHeaderTitle: 'Riding Actions',
  });

  useSeoMeta({
    title: `Riding Actions In ${gameTypeToFullLabel('mhst2')}`,
    description: 'Overview of all riding actions and list of monsties that can learn them',
  });
  const headline = gameTypeToFullName('mhst2');

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
            class="sticky top-(--ui-header-height) z-10 -mx-1 flex items-center bg-elevated/75 p-1 backdrop-blur dark:bg-muted/75"
          >
            <UIcon name="ph:exclamation-mark-bold" class="w-6" />

            <div class="font-medium">
              {{ formatRidingActionType(type) }}
            </div>
          </div>

          <div class="box">
            <div v-for="(action, index) in actions" :key="action.slug">
              <div
                v-if="index > 0"
                class="border-2 border-t border-neutral-100 dark:border-default"
              />

              <NuxtLink :to="`/2/riding-actions/${action.slug}`" class="box-link block px-6 py-2">
                {{ action.name }}
              </NuxtLink>
            </div>
          </div>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
