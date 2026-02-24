<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import { sortedRidingActions } from '~/services/2/data';

  const props = defineProps<{ monster: Monster }>();

  const hasRidingActions = computed(() => {
    return !!props.monster?.monstie?.ridingActions?.length;
  });

  const ridingActions = computed(() => {
    return props.monster?.monstie?.ridingActions?.map((ridingAction) => {
      return {
        name: ridingAction,
        ...sortedRidingActions.find((action) => action.name === ridingAction),
      };
    });
  });

  const isPinned = computed(() => {
    // TODO history store
    return false;
  });

  function togglePin() {
    // TODO history store
  }
</script>

<template>
  <section class="relative space-y-3 overflow-hidden">
    <div class="space-y-1">
      <h3 class="text-lg font-semibold">Monstie Info</h3>

      <div class="flex items-center">
        <span class="w-40">Attack Type</span>

        <AttackTypeIcon class="mr-1.5 w-8" :monster="monster" />
        <AttackTypeLabel class="font-semibold" :monster="monster" />
      </div>

      <div class="flex items-center">
        <span class="w-40">Attack Element</span>

        <ElementIcon class="mr-1.5 w-8" :element="monster?.monstie?.attackElement" />
        <ElementLabel class="font-semibold" :element="monster?.monstie?.attackElement" />
      </div>

      <div class="flex items-center">
        <span class="mr-1.5 w-40">Kinship Skill</span>

        <div
          class="pl-8 font-semibold dark:brightness-150"
          v-text="monster?.monstie?.kinshipSkill"
        />
      </div>
    </div>

    <div v-if="hasRidingActions">
      <h3 class="text-lg font-semibold">Riding Actions</h3>

      <div>
        <span v-for="(action, index) in ridingActions" :key="action.name" class="inline-flex">
          <NuxtLink :to="`/2/riding-actions/${action.slug}/`" class="link">
            {{ action.name }}
          </NuxtLink>
          <span v-if="index + 1 < (ridingActions?.length ?? 0)">,&nbsp;</span>
        </span>
      </div>
    </div>

    <div class="absolute top-0 right-0 pr-3">
      <AppPinToggle :pinned="isPinned" subject="monstie" @toggle="togglePin" />
    </div>
  </section>
</template>
