<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import type { Mode } from '~/stores/2/baseMonsterFilter';

  withDefaults(
    defineProps<{
      monster: Monster;
      mode?: Mode;
      ticket?: string;
      eager?: boolean;
    }>(),
    {
      mode: 'location',
      ticket: undefined,
      eager: false,
    }
  );
</script>

<template>
  <div class="relative flex h-[122px] items-center">
    <S2EggImage class="-mx-3 size-[120px] shrink-0" :monster="monster" :eager="eager" noTooltip />

    <S2MonstieListItemContent
      class="mt-3 ml-3 w-full self-start text-sm whitespace-nowrap"
      :monster="monster"
      :mode="mode"
    />

    <S2MonsterImage
      class="size-full overflow-hidden object-contain p-2"
      style="flex-basis: 250px"
      :monster="monster"
      :eager="eager"
      noTooltip
      small
    />

    <UTooltip v-if="ticket" text="Golden SR ticket required">
      <div
        class="absolute top-0 right-0 rounded-bl bg-gold/75 px-2 py-0.5 text-xs font-semibold tracking-widest text-neutral-700 dark:bg-gold/25 dark:text-gold"
      >
        SR
      </div>
    </UTooltip>
  </div>
</template>
