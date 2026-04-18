<script lang="ts" setup>
  import type { EggPower } from '~/services/3/types';

  defineProps<{ eggPower: EggPower }>();
</script>

<template>
  <div class="@container flex h-[74px] items-center gap-1.5">
    <S3EggPowerIcon class="m-1.5 shrink-0" :eggPower="eggPower" big contrast />

    <div class="my-1.5 mr-1.5 flex-1 self-start text-sm">
      <div class="flex items-center justify-between">
        <div class="text-base leading-snug font-semibold" v-text="eggPower.name" />
      </div>

      <div class="line-clamp-2" v-text="eggPower.details[0]?.description" />
    </div>
  </div>
</template>
