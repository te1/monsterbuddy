<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';

  const props = defineProps<{ monster: Monster }>();

  const stats = computed(() => {
    return props.monster?.stats?.base;
  });

  const hasStats = computed(() => {
    return (
      stats.value?.hp != null ||
      stats.value?.defense != null ||
      stats.value?.attack != null ||
      stats.value?.crit != null ||
      stats.value?.speed != null ||
      stats.value?.recovery != null ||
      stats.value?.stamina != null
    );
  });

  const hasRawStats = computed(() => {
    return (
      stats.value?.startingStamina != null ||
      stats.value?.rawRecovery != null ||
      stats.value?.wyvernfell != null ||
      stats.value?.rawCrit != null
    );
  });
</script>

<template>
  <section v-if="hasStats || hasRawStats" class="@container flex flex-col gap-3">
    <h3 class="text-lg font-medium">Monstie Stats</h3>

    <div class="flex flex-col gap-3 @md:flex-row @md:gap-12">
      <div v-if="stats?.hp != null || stats?.defense != null" class="flex-1">
        <div class="font-medium">Bulk</div>
        <S3StatsBar :value="stats?.hp ?? undefined" label="HP" />
        <S3StatsBar :value="stats?.defense ?? undefined" label="Defense" />
      </div>

      <div
        v-if="stats?.attack != null || stats?.speed != null || stats?.crit != null"
        class="flex-1"
      >
        <div class="font-medium">Offense</div>
        <S3StatsBar :value="stats?.attack ?? undefined" label="Attack" />
        <S3StatsBar :value="stats?.speed ?? undefined" label="Speed" />
        <S3StatsBar :value="stats?.crit ?? undefined" label="Crit" />
      </div>
    </div>

    <div class="flex flex-col gap-3 @md:flex-row @md:gap-12">
      <div v-if="stats?.stamina != null || stats?.recovery != null" class="flex-1">
        <div class="font-medium">Stamina</div>
        <S3StatsBar :value="stats?.stamina ?? undefined" label="Starting" />
        <S3StatsBar :value="stats?.recovery ?? undefined" label="Recovery" />
      </div>

      <div v-if="stats?.bulk != null || stats?.total != null" class="flex-1">
        <div class="font-medium">Totals</div>

        <div v-if="stats?.bulk != null" class="flex items-center gap-2">
          <span class="w-18">Bulk</span>
          <span class="flex-1">HP, Def</span>
          <span class="text-right font-medium" v-text="stats?.bulk" />
        </div>

        <div v-if="stats?.total != null" class="flex items-center gap-2">
          <span class="w-18">Major</span>
          <span class="flex-1">Bulk, Atk, Spd</span>
          <span class="text-right font-medium" v-text="stats?.total" />
        </div>
      </div>
    </div>

    <div v-if="hasRawStats" class="@container">
      <div class="font-medium">Raw Stats</div>

      <div
        class="grid @sm:grid-cols-2 @sm:grid-rows-2 @sm:gap-x-12 @3xl:grid-cols-4 @3xl:grid-rows-1"
      >
        <div v-if="stats?.startingStamina != null" class="flex items-center justify-between gap-2">
          <span>Starting Stamina</span>
          <span class="text-right font-medium" v-text="stats?.startingStamina" />
        </div>

        <div v-if="stats?.rawRecovery != null" class="flex items-center justify-between gap-2">
          <span>Stamina Recovery</span>
          <span class="text-right font-medium" v-text="stats?.rawRecovery" />
        </div>

        <div v-if="stats?.rawCrit != null" class="flex items-center justify-between gap-2">
          <span>Crit Rate</span>
          <span class="text-right font-medium" v-text="`${stats?.rawCrit}%`" />
        </div>

        <div v-if="stats?.wyvernfell != null" class="flex items-center justify-between gap-2">
          <span>Wyvernfell</span>
          <span class="text-right font-medium" v-text="stats?.wyvernfell" />
        </div>
      </div>
    </div>
  </section>
</template>
