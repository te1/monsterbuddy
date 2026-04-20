<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import type { MonstieBuild } from '~/services/3/monstieBuilds';

  const props = defineProps<{ build: MonstieBuild }>();

  const monstie = computed(() => {
    return props.build.monstie ?? ({ slug: 'Unknown', name: 'Unknown' } as Monster);
  });
</script>

<template>
  <div class="flex h-[74px] items-center gap-1">
    <div class="m-1.5 size-14 shrink-0">
      <S3MonsterIcon :monster="monstie" noTooltip size="size-14" />
    </div>

    <div class="my-1.5 mr-1.5 flex-1 self-start text-sm">
      <div class="flex items-center justify-between">
        <div class="text-base leading-snug font-semibold" v-text="build.nameWithFallback" />
      </div>

      <div v-if="build.description" class="line-clamp-2" v-text="build.description" />
    </div>
  </div>
</template>
