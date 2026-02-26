<script lang="ts" setup>
  import { groupBy } from 'es-toolkit/array';
  import { sortedRidingActions } from '~/services/2/data';
  import { formatRidingActionType } from '~/services/2/presentation';

  const headline = gameTypeToFullName('mhst2');

  useSeoMeta({
    title: `Riding Actions In ${gameTypeToFullLabel('mhst2')}`,
    description: 'Overview of all riding actions and list of monsties that can learn them',
  });

  const ridingActions = groupBy(sortedRidingActions, (ridingAction) => ridingAction.type);
</script>

<template>
  <div>
    <UPageHeader
      title="Riding Actions"
      description="Overview of all riding actions and list of monsties that can learn them"
      :headline="headline"
    />

    <UPageBody>
      <ul class="space-y-8">
        <li v-for="(actions, type) in ridingActions" :key="type">
          <div
            class="sticky top-12 z-10 -mx-1 -mt-3 -mb-1 flex items-center border-t border-neutral-300 bg-neutral-300 px-1 py-1 dark:border-neutral-700 dark:bg-neutral-700"
          >
            <!-- <FaIcon class="dark:text-neutral-400 w-6! text-neutral-500" :icon="['fas', 'exclamation']" /> -->

            <div class="mb-1 font-semibold">
              {{ formatRidingActionType(type) }}
            </div>
          </div>

          <div class="box mt-1 overflow-hidden">
            <div v-for="(action, index) in actions" :key="action.slug">
              <div v-if="index > 0" class="border-t border-neutral-300 dark:border-neutral-600" />

              <NuxtLink
                :to="`/2/riding-actions/${action.slug}/`"
                class="box-link block px-6 py-2 font-semibold"
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
