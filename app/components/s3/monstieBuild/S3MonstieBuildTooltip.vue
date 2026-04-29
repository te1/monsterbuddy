<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';

  defineProps<{ build: MonstieBuild }>();
</script>

<template>
  <AppRichTooltip>
    <slot />

    <template #content>
      <div class="flex flex-col gap-3">
        <S3MonstieBuildListItem :build="build" />

        <div class="mb-3 grid place-items-center">
          <S3MonstieBuildGeneGrid :build="build" />
        </div>
      </div>
    </template>
  </AppRichTooltip>
</template>
