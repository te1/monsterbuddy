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
  <div class="@container relative flex h-[122px] items-center">
    <div class="-mx-3 flex size-[120px] shrink-0 flex-col items-center justify-center gap-2">
      <div class="size-[60px]">
        <S2MonsterIcon :monster="monster" :eager="eager" noTooltip />
      </div>

      <div class="flex items-center gap-1">
        <AttackTypeIcon class="size-8" :type="monster?.monstie?.attackType" noTooltip />

        <ElementIcon class="size-8" :element="monster?.monstie?.attackElement" noTooltip />
      </div>
    </div>

    <S2MonstieListItemContent
      class="mx-3 mt-3 w-full self-start text-sm"
      :monster="monster"
      :mode="mode"
    />

    <S2MonsterImage
      class="hidden h-[122px] w-[250px] overflow-hidden object-contain p-2 @md:block"
      :monster="monster"
      :eager="eager"
      hideFallback
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
