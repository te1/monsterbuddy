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
  <section v-if="hasStats || hasRawStats" class="flex flex-col gap-3">
    <h3 class="text-lg font-medium">Monstie Stats</h3>

    <div v-if="stats?.hp != null || stats?.defense != null">
      <div class="font-medium">Bulk</div>
      <S3StatsBar :value="stats?.hp ?? undefined" label="HP" />
      <S3StatsBar :value="stats?.defense ?? undefined" label="Defense" />
    </div>

    <div v-if="stats?.attack != null || stats?.speed != null || stats?.crit != null">
      <div class="font-medium">Offense</div>
      <S3StatsBar :value="stats?.attack ?? undefined" label="Attack" />
      <S3StatsBar :value="stats?.speed ?? undefined" label="Speed" />
      <S3StatsBar :value="stats?.crit ?? undefined" label="Crit" />
    </div>

    <div v-if="stats?.stamina != null || stats?.recovery != null">
      <div class="font-medium">Stamina</div>
      <S3StatsBar :value="stats?.stamina ?? undefined" label="Starting" />
      <S3StatsBar :value="stats?.recovery ?? undefined" label="Recovery" />
    </div>

    <div v-if="stats?.bulk != null || stats?.total != null">
      <div v-if="stats?.bulk != null" class="flex items-center gap-2">
        <span class="w-18">Bulk</span>
        <span class="flex-1">HP + Defense</span>
        <span class="text-right font-medium" v-text="stats?.bulk" />
      </div>

      <div v-if="stats?.total != null" class="flex items-center gap-2">
        <span class="w-18">Major</span>
        <span class="flex-1">HP + Defense + Attack + Speed</span>
        <span class="text-right font-medium" v-text="stats?.total" />
      </div>
    </div>

    <div v-if="hasRawStats" class="@container">
      <div class="font-medium">Raw Stats</div>

      <div
        v-if="stats?.startingStamina != null || stats?.rawRecovery != null"
        class="flex flex-col justify-between @sm:flex-row @md:justify-start @md:gap-12"
      >
        <div v-if="stats?.startingStamina != null" class="flex items-center gap-2">
          <span class="w-32">Starting Stamina</span>
          <span class="w-8 flex-1 text-right font-medium" v-text="stats?.startingStamina" />
        </div>

        <div v-if="stats?.rawRecovery != null" class="flex items-center gap-2">
          <span class="w-32">Stamina Recovery</span>
          <span class="w-8 flex-1 text-right font-medium" v-text="stats?.rawRecovery" />
        </div>
      </div>

      <div
        v-if="stats?.startingStamina != null || stats?.rawRecovery != null"
        class="flex flex-col justify-between @sm:flex-row @md:justify-start @md:gap-12"
      >
        <div v-if="stats?.rawCrit != null" class="flex items-center gap-2">
          <span class="w-32">Crit Rate</span>
          <span class="w-8 flex-1 text-right font-medium" v-text="`${stats?.rawCrit}%`" />
        </div>

        <div v-if="stats?.wyvernfell != null" class="flex items-center gap-2">
          <span class="w-32">Wyvernfell</span>
          <span class="w-8 flex-1 text-right font-medium" v-text="stats?.wyvernfell" />
        </div>
      </div>
    </div>
  </section>
</template>
