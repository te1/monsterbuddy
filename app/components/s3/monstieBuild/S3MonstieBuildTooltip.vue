<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';

  defineProps<{ build: MonstieBuild }>();
</script>

<template>
  <AppRichTooltip>
    <slot />

    <template #content>
      <S3MonstieBuildGeneGrid :build="build" />
    </template>
  </AppRichTooltip>
</template>
