<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import { sortedRidingActions } from '~/services/3/data';
  import useMonsterHistoryStore from '~/stores/3/monsterHistoryStore';

  const props = defineProps<{ monster: Monster }>();

  const history = useMonsterHistoryStore();

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
    return history.isMonstiePinned(props.monster.slug);
  });

  function togglePin() {
    history.togglePinnedMonstie(props.monster.slug);
  }
</script>

<template>
  <section class="relative flex flex-col gap-2">
    <div class="flex flex-col gap-1">
      <h3 class="text-lg font-semibold">Monstie Info</h3>

      <div class="flex items-center">
        <span class="w-40">Attack Type</span>

        <AttackTypeIcon class="mr-1.5 size-8" :type="monster?.monstie?.attack ?? undefined" />
        <AttackTypeLabel class="font-medium" :type="monster?.monstie?.attack ?? undefined" />
      </div>

      <div class="flex items-center">
        <span class="w-40">Attack Element</span>

        <ElementIcon class="mr-1.5 size-8" :element="monster?.element ?? undefined" />
        <ElementLabel class="font-medium" :element="monster?.element ?? undefined" />
      </div>

      <div v-if="monster?.monstie?.kinshipSkill" class="flex items-center">
        <span class="mr-1.5 w-40">Kinship Skill</span>

        <div class="pl-8 font-medium dark:brightness-150" v-text="monster?.monstie?.kinshipSkill" />
      </div>
    </div>

    <div v-if="hasRidingActions">
      <h3 class="text-lg font-semibold">Riding Actions</h3>

      <div>
        <span v-for="(action, index) in ridingActions" :key="action.name" class="inline-flex">
          <AppNuxtLink :to="`/3/riding-actions/${action.slug}`" :text="action.name" />
          <span v-if="index + 1 < (ridingActions?.length ?? 0)">,&nbsp;</span>
        </span>
      </div>
    </div>

    <div class="absolute top-1 right-1">
      <ClientOnly>
        <AppPinToggle
          :modelValue="isPinned"
          subject="monstie"
          noLabel
          @update:modelValue="togglePin"
        />
      </ClientOnly>
    </div>
  </section>
</template>
