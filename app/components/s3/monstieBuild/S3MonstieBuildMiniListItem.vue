<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import type { Monster } from '~/services/3/types';

  const props = withDefaults(
    defineProps<{
      build: MonstieBuild;
      removeable?: boolean;
    }>(),
    {
      removeable: false,
    }
  );

  const emit = defineEmits<{
    remove: [];
  }>();

  const monstie = computed(() => {
    return props.build.monstie ?? ({ slug: 'Unknown', name: 'Unknown' } as Monster);
  });
</script>

<template>
  <div class="group relative">
    <NuxtLink
      :to="`/3/builds/monstie/${build.id}`"
      prefetchOn="interaction"
      class="flex max-w-max items-center gap-3 hover:text-default"
    >
      <S3MonstieBuildTooltip :build="build">
        <div class="hidden size-9 xl:block">
          <S3MonsterIcon :monster="monstie" noTooltip size="size-9" />
        </div>
        <div class="truncate" v-text="build.nameWithFallback" />
      </S3MonstieBuildTooltip>
    </NuxtLink>

    <UTooltip
      v-if="removeable"
      class="absolute top-1/2 right-0 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-75"
      text="Remove bookmark"
    >
      <UButton
        variant="soft"
        color="neutral"
        icon="ph:trash"
        aria-label="Remove bookmark"
        @click="emit('remove')"
      />
    </UTooltip>
  </div>
</template>
