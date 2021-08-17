<template>
  <section
    v-if="hasStats"
    class="space-y-2 overflow-hidden"
  >
    <h3 class="text-lg font-semibold">
      Monstie Stats
    </h3>

    <div class="flex gap-6">
      <div class="flex-1 space-y-1">
        <div>
          Growth: {{ growth }}
        </div>

        <div class="-mr-10 space-y-1 text-right">
          <div>Max HP</div>
          <div>Speed</div>
          <div>Recovery</div>
          <div>Crit Rate</div>
        </div>
      </div>

      <div class="flex-1 space-y-1">
        <h4 class="text-right pr-4 font-semibold">
          Basic Stats
        </h4>

        <div class="space-y-1">
          <StatsBar :value="monster.monstie.stats.base.maxHp" />
          <StatsBar :value="monster.monstie.stats.base.speed" />
          <StatsBar :value="monster.monstie.stats.base.recovery" />
          <StatsBar :value="monster.monstie.stats.base.critRate" />
        </div>
      </div>
    </div>

    <div class="flex gap-6">
      <div class="flex-1 space-y-1">
        <h4 class="text-right pr-4 font-semibold">
          Attack
        </h4>

        <div class="space-y-1">
          <StatsBar
            v-for="element in allElements"
            :key="element"
            :label="formatElement(element)"
            :value="monster.monstie.stats.attack[element]"
          >
            <ElementIcon
              class="w-5"
              :element="element"
            />
          </StatsBar>
        </div>
      </div>

      <div class="flex-1 space-y-1">
        <h4 class="text-right pr-4 font-semibold">
          Defense
        </h4>

        <div class="space-y-1">
          <StatsBar
            v-for="element in allElements"
            :key="element"
            :label="formatElement(element)"
            :value="monster.monstie.stats.defense[element]"
          >
            <ElementIcon
              class="w-5"
              :element="element"
            />
          </StatsBar>
        </div>
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
      hasStats() {
        return (
          this.monster?.monstie?.growth && this.monster?.monstie?.growth !== '?'
        );
      },

      growth() {
        return formatGrowth(this.monster?.monstie?.growth);
      },
    },

    methods: {
      formatElement,
    },
  };
</script>
