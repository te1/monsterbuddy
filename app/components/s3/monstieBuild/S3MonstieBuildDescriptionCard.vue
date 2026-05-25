<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';

  defineProps<{ build: MonstieBuild }>();
</script>

<template>
  <section v-if="build.description" class="flex flex-col gap-1">
    <h3 class="text-lg font-semibold">Description</h3>

    <div v-text="build.description" />
  </section>
</template>
