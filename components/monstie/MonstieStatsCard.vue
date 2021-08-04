<template>
  <section class="space-y-2 overflow-hidden">
    <div class="space-y-1">
      <div class="flex items-center">
        <span class="w-48">
          Attack Type
        </span>

        <AttackTypeIcon
          class="w-8 mr-1"
          :monster="monster"
        />
        <AttackTypeLabel
          class="font-semibold"
          :monster="monster"
        />
      </div>

      <div class="flex items-center">
        <span class="w-48">
          Attack Element
        </span>

        <ElementIcon
          class="w-8 mr-1"
          :element="monster.monstie.attackElement"
        />
        <ElementLabel
          class="font-semibold"
          :element="monster.monstie.attackElement"
        />
      </div>

      <div class="flex items-center">
        <span class="w-48">
          Growth
        </span>

        <span
          class="pl-8 ml-1 font-semibold dark:brightness-150"
          v-text="growth"
        />
      </div>
    </div>

    <div class="space-y-1">
      <h3 class="text-lg font-semibold">
        Basic Stats
      </h3>

      <div class="space-y-1">
        <StatsBar
          label="Max HP"
          :value="monster.monstie.stats.base.maxHp"
        />
        <StatsBar
          label="Speed"
          :value="monster.monstie.stats.base.speed"
        />
        <StatsBar
          label="Recovery"
          :value="monster.monstie.stats.base.recovery"
        />
        <StatsBar
          label="Crit Rate"
          :value="monster.monstie.stats.base.critRate"
        />
      </div>
    </div>

    <div class="space-y-1">
      <h3 class="text-lg font-semibold">
        Attack
      </h3>

      <div class="space-y-1">
        <StatsBar
          v-for="element in allElements"
          :key="element"
          :label="formatElement(element)"
          :value="monster.monstie.stats.attack[element]"
        />
      </div>
    </div>

    <div class="space-y-1">
      <h3 class="text-lg font-semibold">
        Defense
      </h3>

      <div class="space-y-1">
        <StatsBar
          v-for="element in allElements"
          :key="element"
          :label="formatElement(element)"
          :value="monster.monstie.stats.defense[element]"
        />
      </div>
    </div>
  </section>
</template>

<script>
  import { formatGrowth, formatElement, allElements } from '~/services/utils';

  export default {
    name: 'MonstieStatsCard',

    props: {
      monster: {
        type: Object,
        required: true,
      },
    },

    data() {
      return {
        allElements,
      };
    },

    computed: {
      growth() {
        return formatGrowth(this.monster?.monstie?.growth);
      },
    },

    methods: {
      formatElement,
    },
  };
</script>
