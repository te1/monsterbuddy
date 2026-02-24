<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';

  defineProps<{ monster: Monster }>();
</script>

<template>
  <section>
    <S2MonsterImage :monster="monster" />
  </section>
</template>
