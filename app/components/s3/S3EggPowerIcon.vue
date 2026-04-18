<script lang="ts" setup>
  import type { EggPower } from '~/services/3/types';

  defineProps<{
    eggPower: EggPower;
    big?: boolean;
    contrast?: boolean;
  }>();
</script>

<template>
  <div
    class="flex items-center justify-center rounded font-semibold"
    :class="{
      'size-10 text-lg': big,
      'size-7 text-sm': !big,
      'bg-accented text-toned': contrast,
      'bg-default text-muted': !contrast,
    }"
    v-text="eggPower.rank"
  />
</template>
