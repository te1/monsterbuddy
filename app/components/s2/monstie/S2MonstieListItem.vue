<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';

  withDefaults(
    defineProps<{
      monster: Monster;
      mode?: string;
      ticket?: string;
    }>(),
    {
      mode: 'location',
      ticket: undefined,
    }
  );
</script>

<template>
  <!-- TODO CSS -->

  <div class="relative flex h-[122px] items-center">
    <div class="-mx-3 flex h-[120px] w-[120px] shrink-0 flex-col items-center justify-center gap-2">
      <S2MonsterIcon :monster="monster" />

      <div class="flex items-center gap-1">
        <AttackTypeIcon class="h-8 w-8" :monster="monster" />

        <ElementIcon class="h-8 w-8" :element="monster?.monstie?.attackElement" />
      </div>
    </div>

    <S2MonstieListItemContent
      class="mt-3 ml-3 w-full self-start text-sm whitespace-nowrap"
      :monster="monster"
      :mode="mode"
    />

    <S2MonsterImage
      class="h-full w-full overflow-hidden object-contain object-right p-2"
      style="flex-basis: 250px"
      :monster="monster"
      hideFallback
    />

    <div
      v-if="ticket"
      class="absolute top-0 right-0 rounded-bl bg-gold/75 px-2 py-0.5 text-xs font-semibold tracking-widest text-neutral-700 dark:bg-gold/25 dark:text-gold"
      title="Golden SR ticket required"
    >
      SR
    </div>
  </div>
</template>
