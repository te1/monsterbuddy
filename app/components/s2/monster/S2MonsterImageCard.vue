<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';

  defineProps<{ monster: Monster }>();
</script>

<template>
  <S2MonsterImage :monster="monster" />
</template>
