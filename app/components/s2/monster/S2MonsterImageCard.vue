<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';

  defineProps<{ monster: Monster }>();
</script>

<template>
  <section>
    <S2MonsterImage class="size-full max-h-[400px] object-contain" :monster="monster" />
  </section>
</template>
