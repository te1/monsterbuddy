<template>
  <div
    v-if="monster"
    class="space-y-2"
  >
    <div class="px-4 py-2 rounded shadow bg-white">
      <div v-text="info" />
      <div v-text="monster.name" />
      <div v-text="monster.genus" />
      <div v-text="monster.habitat" />

      <div>Locations</div>
      <div
        v-for="location in locations"
        :key="location"
        v-text="location"
      />

      <div v-text="monster.rarity" />

      <MonsterImage :monster="monster" />
      <MonsterIcon :monster="monster" />
    </div>

    <div class="px-4 py-2 rounded shadow bg-white">
      <div>Attack Patterns</div>
      <div
        v-for="(attackType, phase) in monster.monster.attackPatterns"
        :key="phase"
      >
        {{ phase }}
        <AttackTypeIcon :type="attackType" />
        <AttackTypeLabel :type="attackType" />
      </div>

      <div>Parts</div>
      <div
        v-for="(weaponTypes, part) in monster.monster.parts"
        :key="part"
      >
        {{ part }}
        <div
          v-for="weaponType in weaponTypes"
          :key="weaponType"
        >
          {{ weaponType }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { monstersBySlug } from '~/services/data';
  import { formatMonsterInfo, formatMonsterLocations } from '~/services/utils';

  export default {
    name: 'PageMonsterDetails',

    data() {
      return {
        monster: monstersBySlug[this.$route.params.slug],
      };
    },

    computed: {
      info() {
        return formatMonsterInfo(this.monster);
      },

      locations() {
        return formatMonsterLocations(this.monster);
      },
    },

    created() {
      if (this.monster == null) {
        this.$nuxt.error({
          statusCode: 404,
          message: 'This page could not be found',
        });
      }
    },
  };
</script>
