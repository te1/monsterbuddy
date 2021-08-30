<template>
  <section>
    <div class="flex items-start justify-between overflow-hidden">
      <div>
        <div
          class="-mb-1 text-gray-500 dark:text-cool-400"
          v-text="info"
        />

        <h2
          class="text-2xl font-semibold mb-1"
          v-text="monster.name"
        />

        <div class="flex items-center gap-1">
          <span class="text-gray-600 dark:text-cool-400">
            <FaIcon
              :icon="['fas', 'dna']"
              title="Genus"
            />
          </span>
          <span v-text="monster.genus" />
        </div>

        <div class="flex items-center gap-1">
          <span class="text-gray-600 dark:text-cool-400">
            <FaIcon
              :icon="['fas', 'map-marker-alt']"
              title="Habitat"
            />
          </span>
          <span v-text="monster.habitat" />
        </div>

        <div class="flex items-center gap-1">
          <span class="text-gray-600 dark:text-cool-400">
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

      <MonsterLocation
        v-for="location in monster.locations"
        :key="location.main"
        :location="location"
      />
    </div>
  </section>
</template>

<script>
  import { formatMonsterInfo } from '~/services/utils';

  export default {
    name: 'MonsterInfoCard',

    props: {
      monster: {
        type: Object,
        required: true,
      },
    },

    computed: {
      info() {
        return formatMonsterInfo(this.monster);
      },

      hasLocations() {
        return !!this.monster.locations.length;
      },
    },
  };
</script>
