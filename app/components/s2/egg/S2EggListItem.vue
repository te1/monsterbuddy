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
  <div class="relative flex h-[122px] items-center">
    <S2EggImage class="-mx-3 h-[120px] w-[120px] shrink-0" :monster="monster" />

    <S2MonstieListItemContent
      class="mt-3 ml-3 w-full self-start text-sm whitespace-nowrap"
      :monster="monster"
      :mode="mode"
    />

    <S2MonsterImage
      class="h-full w-full overflow-hidden object-contain object-right p-2"
      style="flex-basis: 250px"
      :monster="monster"
      right
    />

    <div
      v-if="ticket"
      class="bg-gold/75 dark:bg-gold/25 dark:text-gold absolute top-0 right-0 rounded-bl px-2 py-0.5 text-xs font-semibold tracking-widest text-neutral-700"
      title="Golden SR ticket required"
    >
      SR
    </div>
  </div>
</template>
