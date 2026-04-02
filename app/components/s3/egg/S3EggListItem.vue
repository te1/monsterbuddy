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
  <div class="@container flex h-[122px] items-center">
    <div class="-mx-3 size-[120px] shrink-0">
      <S3EggImage class="size-[120px]" :monster="monster" :eager="eager" noTooltip />
    </div>

    <S3MonstieListItemContent
      class="mx-3 mt-3 w-full self-start text-sm"
      :monster="monster"
      :mode="mode"
    />

    <S3MonsterImage
      class="hidden h-[122px] w-[250px] overflow-hidden object-contain p-2 @md:block"
      :monster="monster"
      :eager="eager"
      noTooltip
      small
    />
  </div>
</template>
