<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import { formatMonsterInfo } from '~/services/2/presentation';

  const props = defineProps<{ monster: Monster }>();

  const info = computed(() => formatMonsterInfo(props.monster));
  const hasLocations = computed(() => !!props.monster.locations.length);
</script>

<template>
  <!-- TODO CSS -->

  <section>
    <div class="flex items-start justify-between overflow-hidden">
      <div>
        <h3 class="sr-only">General Monster Info</h3>

        <div class="-mb-1 text-neutral-500 dark:text-neutral-400" v-text="info" />

        <div class="mb-1 text-2xl font-semibold" v-text="monster.name" />

        <div class="flex items-center gap-1">
          <span class="text-neutral-600 dark:text-neutral-400">
            <UIcon name="ph:dna" title="Genus" />
          </span>
          <span v-text="monster.genus" />
        </div>

        <div class="flex items-center gap-1">
          <span class="text-neutral-600 dark:text-neutral-400">
            <UIcon name="ph:map-pin-fill" title="Habitat" />
          </span>
          <span v-text="monster.habitat" />
        </div>

        <div class="flex items-center gap-1">
          <span class="text-neutral-600 dark:text-neutral-400">
            <UIcon name="ph:star-fill" title="Rarity" />
          </span>
          <span v-text="monster.rarity" />
        </div>
      </div>

      <div class="flex flex-col items-center gap-2">
        <S2MonsterIcon :monster="monster" />

        <UTooltip v-if="monster.hatchable" text="Hatchable">
          <img
            src="~/assets/icon/hatchable.svg"
            alt="Hatchable"
            width="20"
            height="20"
            class="h-8 w-8"
          />
        </UTooltip>
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
