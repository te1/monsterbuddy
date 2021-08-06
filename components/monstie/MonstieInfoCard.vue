<template>
  <section class="space-y-3 overflow-hidden">
    <div
      v-if="!hideDetails"
      class="space-y-1"
    >
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

    <div v-if="!hideDetails && hasRidingActions">
      <h3 class="text-lg font-semibold">
        Riding Actions
      </h3>

      <div>
        <span
          v-for="(action, index) in monster.monstie.ridingActions"
          :key="action"
        >
          {{ action }}<span v-if="index+1 < monster.monstie.ridingActions.length">, </span>
        </span>
      </div>
    </div>

    <div class="flex">
      <div class="flex-1">
        <h3 class="text-lg font-semibold">
          Retreat
        </h3>

        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="retreat" />
      </div>

      <EggImage
        class="-mx-3"
        :monster="monster"
      />
    </div>
  </section>
</template>

<script>
  import { parseSomeMarkdown } from '~/services/utils';

  export default {
    name: 'MonstieInfoCard',

    props: {
      monster: {
        type: Object,
        required: true,
      },

      hideDetails: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    computed: {
      hasRidingActions() {
        return !!this.monster.monstie.ridingActions.length;
      },

      retreat() {
        return parseSomeMarkdown(this.monster?.monstie?.retreat);
      },
    },
  };
</script>
