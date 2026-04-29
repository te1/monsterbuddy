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

    <div v-if="build.monstie" class="_mr-1 flex flex-col items-center gap-1">
      <AttackTypeIcon class="size-7" :type="monstie.monstie?.attack" noTooltip />

      <ElementIcon class="size-7" :element="monstie.element" noTooltip />
    </div>

    <div class="m-1.5 flex-1 self-start text-sm">
      <div class="flex items-center justify-between">
        <div class="text-base leading-snug font-semibold" v-text="build.nameWithFallback" />
      </div>

      <div>
        <span v-text="monstie.name" />
        <span v-if="monstie.genus" v-text="`, ${monstie.genus}`" />
      </div>

      <div v-if="build.description" class="line-clamp-1 text-muted" v-text="build.description" />
    </div>
  </div>
</template>
