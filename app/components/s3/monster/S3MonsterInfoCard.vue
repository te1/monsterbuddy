<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import { formatMonsterInfoAll } from '~/services/3/presentation';
  import { getMonsterLocations } from '~/services/3/data';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      linkName?: boolean;
    }>(),
    {
      linkName: false,
    }
  );

  const info = computed(() => formatMonsterInfoAll(props.monster));
  const locations = computed(() => getMonsterLocations(props.monster));
  const hasLocations = computed(() => locations.value.length > 0);
  const isMutation = computed(() => {
    return (props.monster.hatchable && props.monster.tags?.includes('mutation')) ?? false;
  });
</script>

<template>
  <section class="flex flex-col gap-2">
    <div class="flex justify-between">
      <div>
        <h3 class="sr-only">General Monster Info</h3>

        <div class="-mb-1 text-muted" v-text="info" />

        <div class="mb-1 text-2xl font-medium">
          <AppNuxtLink
            v-if="linkName"
            :to="`/3/monsters/${monster.slug}`"
            prefetchOn="interaction"
            :text="monster.name"
          />
          <span v-else v-text="monster.name" />
        </div>

        <div class="flex items-center gap-1">
          <UTooltip text="Genus">
            <UIcon name="ph:dna" class="text-muted" />
          </UTooltip>

          <span v-text="monster.genus" />
        </div>

        <div class="flex items-center gap-1">
          <UTooltip text="Rank">
            <UIcon name="ph:star-fill" class="text-dimmed" />
          </UTooltip>

          <span v-text="monster.rank ?? '?'" />
        </div>
      </div>

      <div class="flex flex-col items-center gap-2">
        <S3MonsterIcon :monster="monster" />

        <UTooltip v-if="monster.hatchable" text="Hatchable">
          <img
            src="~/assets/icon/hatchable.svg"
            alt="Hatchable"
            width="32"
            height="32"
            class="-mb-5 size-8"
          />
        </UTooltip>
      </div>
    </div>

    <div v-if="hasLocations || isMutation">
      <h3 class="text-lg font-semibold">Locations</h3>

      <S3MonsterLocation
        v-for="location in locations"
        :key="`${location.type}_${location.region}_${location.area}`"
        :location="location"
      />

      <div v-if="!hasLocations && isMutation">Introduced through Habitat Restoration</div>
    </div>
  </section>
</template>
