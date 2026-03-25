<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';

  defineProps<{ monster: Monster }>();
</script>

<template>
  <section v-if="monster.flavor" class="flex flex-col gap-3 text-toned">
    <div v-for="(flavor, label) in monster.flavor" :key="label">
      <strong v-if="label !== 'DEFAULT'" class="font-medium text-default">{{ label }}: </strong>
      {{ flavor }}
    </div>
  </section>
</template>
