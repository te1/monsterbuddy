<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import type { Mode } from '~/stores/3/baseMonsterFilter';

  withDefaults(
    defineProps<{
      monster: Monster;
      mode?: Mode;
      eager?: boolean;
    }>(),
    {
      mode: 'location',
      eager: false,
    }
  );
</script>

<template>
  <div class="relative flex h-[122px] items-center">
    <S3EggImage class="-mx-3 size-[120px] shrink-0" :monster="monster" :eager="eager" noTooltip />

    <S3MonstieListItemContent
      class="mt-3 ml-3 w-full self-start text-sm whitespace-nowrap"
      :monster="monster"
      :mode="mode"
    />

    <S3MonsterImage
      class="size-full overflow-hidden object-contain p-2"
      style="flex-basis: 250px"
      :monster="monster"
      :eager="eager"
      noTooltip
      small
    />
  </div>
</template>
