<template>
  <div
    v-if="monster"
    class="mt-12"
  >
    <AppTopBar showBack>
      {{ monster.name }}
    </AppTopBar>

    <main class="space-y-3">
      <section class="box px-4 py-2">
        <div class="flex items-start justify-between">
          <div>
            <div
              class="text-gray-500 -mb-1"
              v-text="info"
            />

            <h2
              class="text-2xl font-semibold mb-1"
              v-text="monster.name"
            />

            <div class="flex items-center gap-1">
              <span class="w-5 text-center">
                <FaIcon
                  :icon="['fas', 'dna']"
                  title="Genus"
                />
              </span>
              <span v-text="monster.genus" />
            </div>

            <div class="flex items-center gap-1">
              <span class="w-5 text-center">
                <FaIcon
                  :icon="['fas', 'map-marker-alt']"
                  title="Habitat"
                />
              </span>
              <span v-text="monster.habitat" />
            </div>

            <div class="flex items-center gap-1">
              <span class="w-5 text-center">
                <FaIcon
                  :icon="['fas', 'star']"
                  title="Rarity"
                />
              </span>
              <span v-text="monster.rarity" />
            </div>
          </div>

          <div class="flex flex-col items-center gap-2">
            <MonsterIcon :monster="monster" />

            <img
              v-if="monster.hatchable"
              :src="require('~/assets/icons/hatchable.svg')"
              alt="Hatchable"
              title="Hatchable"
              width="20"
              height="20"
              class="w-8 h-8"
            >
          </div>
        </div>

        <div v-if="hasLocations">
          <h3 class="mt-2 text-lg font-semibold">
            Locations
          </h3>

          <div
            v-for="location in locations"
            :key="location"
            v-text="location"
          />
        </div>
      </section>

      <section
        v-if="hasCombatInfo"
        class="box px-4 py-2 space-y-2"
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
                class="w-48"
                v-text="formatPhase(phase)"
              />

              <AttackTypeIcon
                class="w-8 mr-1"
                :type="attackType"
              />
              <AttackTypeLabel :type="attackType" />
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
                class="w-48"
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
          <h3 class="w-48 text-lg font-semibold">
            Elemental Weakness
          </h3>

          <ElementIcon
            class="w-8 mr-1"
            :element="monster.monster.elementalWeakness"
          />
          <span v-text="formatElement(monster.monster.elementalWeakness)" />
        </div>
      </section>

      <section class="box px-4 py-2 flex justify-around">
        <MonsterImage :monster="monster" />
      </section>
    </main>
  </div>
</template>

<script>
  import _ from 'lodash';
  import { monstersBySlug, isDeviant } from '~/services/data';
  import {
    makeHead,
    formatMonsterInfo,
    formatMonsterLocations,
    formatElement,
  } from '~/services/utils';

  export default {
    name: 'PageMonsterDetails',

    data() {
      return {
        monster: monstersBySlug[this.$route.params.slug],
      };
    },

    head() {
      let description = `${this.monster.name} is a ${this.monster.rarity} star rarity `;

      if (this.monster.hatchable) {
        description += ' hatchable ';
      }

      if (isDeviant(this.monster)) {
        description += ' Deviant ';
      }

      description += `${this.monster.genus} found in ${this.monster.habitat}.`;

      return makeHead({
        title: `Monster Buddy - ${this.monster.name} Details In Monster Hunter Stories 2`,
        description,
        canonical: `https://monsterbuddy.app/monsters/${this.monster.slug}/`,
        image: `https://monsterbuddy.app/images/monsters-small/${this.monster.name}.webp`,
        imageAlt: this.monster.name,
      });
    },

    computed: {
      info() {
        return formatMonsterInfo(this.monster);
      },

      locations() {
        return formatMonsterLocations(this.monster);
      },

      hasLocations() {
        return !!this.locations.length;
      },

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

    created() {
      if (this.monster == null) {
        this.$nuxt.error({
          statusCode: 404,
          message: 'This page could not be found',
        });
      }
    },

    methods: {
      formatPhase(phase) {
        if (phase === 'DEFAULT') {
          return 'Default';
        }
        return phase;
      },

      formatPart(part) {
        if (part === 'DEFAULT') {
          return 'Default';
        }
        return part;
      },

      formatElement(element) {
        return formatElement(element);
      },
    },
  };
</script>
