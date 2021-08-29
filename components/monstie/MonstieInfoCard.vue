<template>
  <section class="space-y-3 overflow-hidden">
    <div class="space-y-1">
      <h3 class="text-lg font-semibold">
        Monstie Info
      </h3>

      <div class="flex items-center">
        <span class="w-40">
          Attack Type
        </span>

        <AttackTypeIcon
          class="w-8 mr-1.5"
          :monster="monster"
        />
        <AttackTypeLabel
          class="font-semibold"
          :monster="monster"
        />
      </div>

      <div class="flex items-center">
        <span class="w-40">
          Attack Element
        </span>

        <ElementIcon
          class="w-8 mr-1.5"
          :element="monster.monstie.attackElement"
        />
        <ElementLabel
          class="font-semibold"
          :element="monster.monstie.attackElement"
        />
      </div>

      <div class="flex items-center">
        <span class="w-40 mr-1.5">
          Kinship Skill
        </span>

        <div
          class="pl-8 font-semibold dark:brightness-150"
          v-text="monster.monstie.kinshipSkill"
        />
      </div>
    </div>

    <div v-if="hasRidingActions">
      <h3 class="text-lg font-semibold">
        Riding Actions
      </h3>

      <div>
        <span
          v-for="(action, index) in ridingActions"
          :key="action.name"
          class="inline-flex"
        >
          <NuxtLink
            :to='`/riding-actions/${action.slug}/`'
            class="link"
          >
            {{ action.name }}
          </NuxtLink>
          <span v-if="index+1 < ridingActions.length">,&nbsp;</span>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
  import _ from 'lodash';
  import { sortedRidingActions } from '~/services/data';

  export default {
    name: 'MonstieInfoCard',

    props: {
      monster: {
        type: Object,
        required: true,
      },
    },

    computed: {
      hasRidingActions() {
        return !!this.monster.monstie.ridingActions.length;
      },

      ridingActions() {
        return _.map(this.monster.monstie.ridingActions, (ridingAction) => {
          return {
            name: ridingAction,
            ..._.find(sortedRidingActions, { name: ridingAction }),
          };
        });
      },
    },
  };
</script>
