<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';

  defineProps<{ build: MonstieBuild }>();
</script>

<template>
  <section class="flex flex-col gap-1">
    <h3 class="text-lg font-semibold">Description</h3>

    <div v-text="build.description" />

    <!--
    <UTextarea
      :value="build.description"
      placeholder="Describe how to use the build..."
      autoresize
      :rows="5"
      :maxrows="15"
      color="neutral"
      variant="none"
      :ui="{ base: 'p-0' }"
    />
    -->
  </section>
</template>
