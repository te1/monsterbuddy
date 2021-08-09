<template>
  <section
    v-if="hasCombatInfo"
    class="space-y-2 overflow-hidden"
  >
    <div v-if="hasAttackPatterns">
      <h3 class="text-lg font-semibold">
        Attack Patterns
      </h3>

      <div class="space-y-1">
        <div
          v-for="(attackType, phase) in monster.monster.attackPatterns"
          :key="phase"
          class="flex items-center"
        >
          <span
            class="w-36"
            v-text="formatPhase(phase)"
          />

          <AttackTypeIcon
            class="w-8 mr-1.5"
            :type="attackType"
          />
          <AttackTypeLabel
            class="font-semibold"
            :type="attackType"
          />

          <!--
          <AttackTypeLabel
            class="ml-1.5 font-semibold"
            :type="getCounterAttackType(attackType)"
          /> -->
        </div>
      </div>
    </div>

    <div v-if="hasParts">
      <h3 class="text-lg font-semibold">
        Parts
      </h3>

      <div class="space-y-1">
        <div
          v-for="(weaponTypes, part) in monster.monster.parts"
          :key="part"
          class="flex items-center"
        >
          <span
            class="w-36"
            v-text="formatPart(part)"
          />

          <WeaponEffectiveness :types="weaponTypes" />
        </div>
      </div>
    </div>

    <div
      v-if="hasElementalWeakness"
      class="pt-2 flex items-center"
    >
      <h3 class="w-36 text-lg font-semibold">
        Weakness
      </h3>

      <ElementIcon
        class="w-8 mr-1"
        :element="monster.monster.elementalWeakness"
      />
      <ElementLabel
        class="font-semibold"
        :element="monster.monster.elementalWeakness"
      />
    </div>
  </section>
</template>

<script>
  import _ from 'lodash';
  import { formatPhase, getCounterAttackType } from '~/services/utils';

  export default {
    name: 'MonsterCombatCard',

    props: {
      monster: {
        type: Object,
        required: true,
      },
    },

    computed: {
      hasAttackPatterns() {
        return !!_.size(this.monster?.monster?.attackPatterns);
      },

      hasParts() {
        return !!_.size(this.monster?.monster?.parts);
      },

      hasElementalWeakness() {
        return this.monster?.monster?.elementalWeakness != null;
      },

      hasCombatInfo() {
        return (
          this.hasAttackPatterns || this.hasParts || this.hasElementalWeakness
        );
      },
    },

    methods: {
      formatPhase,
      getCounterAttackType,

      formatPart(part) {
        if (part === 'DEFAULT') {
          return 'Default';
        }
        return part;
      },
    },
  };
</script>
