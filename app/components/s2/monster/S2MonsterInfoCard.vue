<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import { formatMonsterInfo } from '~/services/2/presentation';

  const props = defineProps<{ monster: Monster }>();

  const info = computed(() => formatMonsterInfo(props.monster));
  const hasLocations = computed(() => !!props.monster.locations.length);
</script>

<template>
  <section>
    <div class="flex items-start justify-between overflow-hidden">
      <div>
        <div class="-mb-1 text-neutral-500 dark:text-neutral-400" v-text="info" />

        <h2 class="mb-1 text-2xl font-semibold" v-text="monster.name" />

        <div class="flex items-center gap-1">
          <span class="text-neutral-600 dark:text-neutral-400">
            <!-- <FaIcon :icon="['fas', 'dna']" title="Genus" /> -->
          </span>
          <span v-text="monster.genus" />
        </div>

        <div class="flex items-center gap-1">
          <span class="text-neutral-600 dark:text-neutral-400">
            <!-- <FaIcon :icon="['fas', 'map-marker-alt']" title="Habitat" /> -->
          </span>
          <span v-text="monster.habitat" />
        </div>

        <div class="flex items-center gap-1">
          <span class="text-neutral-600 dark:text-neutral-400">
            <!-- <FaIcon :icon="['fas', 'star']" title="Rarity" /> -->
          </span>
          <span v-text="monster.rarity" />
        </div>
      </div>

      <div class="flex flex-col items-center gap-2">
        <S2MonsterIcon :monster="monster" />

        <img
          v-if="monster.hatchable"
          src="~/assets/icon/hatchable.svg"
          alt="Hatchable"
          title="Hatchable"
          width="20"
          height="20"
          class="h-8 w-8"
        />
      </div>
    </div>

    <div v-if="hasLocations">
      <h3 class="mt-2 text-lg font-semibold">Locations</h3>

      <S2MonsterLocation
        v-for="location in monster.locations"
        :key="location.main"
        :location="location"
      />
    </div>
  </section>
</template>
