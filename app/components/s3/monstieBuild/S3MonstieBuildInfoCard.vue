<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';

  defineProps<{ build: MonstieBuild }>();
</script>

<template>
  <section class="flex flex-col gap-1">
    <h3 class="text-lg font-semibold">Description</h3>

    <p>{{ build.monstie?.name }}</p>
    <p>{{ build.dualElement }}</p>
    <p>{{ build.region?.name }}</p>
  </section>
</template>
