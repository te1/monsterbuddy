<script lang="ts" setup>
  import type { EggPower } from '~/services/3/types';

  const props = defineProps<{
    eggPower: EggPower;
    awakened?: boolean;
  }>();

  const variant = computed(() => {
    return props.awakened ? props.eggPower.variants[1] : props.eggPower.variants[0];
  });
</script>

<template>
  <div class="@container flex h-[74px] items-center gap-1.5">
    <S3EggPowerIcon class="m-1.5 shrink-0" :eggPower="eggPower" :awakened="awakened" big contrast />

    <div class="my-1.5 mr-1.5 flex-1 self-start text-sm">
      <div class="flex items-center justify-between">
        <div class="text-base leading-snug font-semibold" v-text="variant?.name ?? eggPower.name" />
      </div>

      <div class="line-clamp-2" v-text="variant?.description" />
    </div>
  </div>
</template>
