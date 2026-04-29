<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';

  defineProps<{ build: MonstieBuild }>();
</script>

<template>
  <section class="@container">
    <div
      class="flex flex-col place-items-center gap-x-12 gap-y-6 @3xl:flex-row @3xl:place-items-start"
    >
      <S3MonstieBuildGeneGrid :build="build" />

      <S3MonstieBuildBingoBonus :build="build" />
    </div>
  </section>
</template>
