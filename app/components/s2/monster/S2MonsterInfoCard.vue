<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import { formatMonsterInfo } from '~/services/2/presentation';

  const props = defineProps<{ monster: Monster }>();

  const info = computed(() => formatMonsterInfo(props.monster));
  const hasLocations = computed(() => !!props.monster.locations.length);
</script>

<template>
  <section class="flex flex-col gap-2">
    <div class="flex justify-between">
      <div>
        <h3 class="sr-only">General Monster Info</h3>

        <div class="-mb-1 text-muted" v-text="info" />

        <div class="mb-1 text-2xl font-medium" v-text="monster.name" />

        <div class="flex items-center gap-1">
          <UTooltip text="Genus">
            <UIcon name="ph:dna" class="text-muted" />
          </UTooltip>

          <span v-text="monster.genus" />
        </div>

        <div class="flex items-center gap-1">
          <UTooltip text="Habitat">
            <UIcon name="ph:map-pin-fill" class="text-dimmed" />
          </UTooltip>

          <span v-text="monster.habitat" />
        </div>

        <div class="flex items-center gap-1">
          <UTooltip text="Rarity">
            <UIcon name="ph:star-fill" class="text-dimmed" />
          </UTooltip>

          <span v-text="monster.rarity" />
        </div>
      </div>

      <div class="flex flex-col items-center gap-2">
        <S2MonsterIcon :monster="monster" />

        <UTooltip v-if="monster.hatchable" text="Hatchable">
          <img
            src="~/assets/icon/hatchable.svg"
            alt="Hatchable"
            width="32"
            height="32"
            class="size-8"
          />
        </UTooltip>
      </div>
    </div>

    <div v-if="hasLocations">
      <h3 class="text-lg font-medium">Locations</h3>

      <S2MonsterLocation
        v-for="location in monster.locations"
        :key="location.main"
        :location="location"
      />
    </div>
  </section>
</template>
