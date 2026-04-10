<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';

  withDefaults(
    defineProps<{
      gene: Gene;
      removeable?: boolean;
    }>(),
    {
      removeable: false,
    }
  );

  const emit = defineEmits<{
    remove: [];
  }>();
</script>

<template>
  <div class="group relative">
    <NuxtLink
      :to="`/3/genes/${gene.slug}`"
      prefetchOn="interaction"
      class="flex max-w-max items-center gap-3 hover:text-default"
    >
      <div class="hidden size-9 xl:block">
        <S3GeneIcon :gene="gene" noTooltip size="size-9" />
      </div>
      <div class="truncate" v-text="gene.name" />
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
