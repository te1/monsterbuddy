<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';

  defineProps<{ build: MonstieBuild }>();

  const emit = defineEmits<{
    (e: 'update:name' | 'update:description', value: string): void;
  }>();
</script>

<template>
  <section class="flex flex-col gap-3">
    <div class="flex flex-col gap-1">
      <h3 class="text-lg font-semibold">Name</h3>

      <UInput
        :value="build.name"
        :placeholder="build.nameWithFallback"
        color="neutral"
        variant="soft"
        @update:modelValue="emit('update:name', String($event))"
      />
    </div>

    <div class="mb-2 flex flex-col gap-1">
      <h3 class="text-lg font-semibold">Description</h3>

      <UTextarea
        :value="build.description"
        placeholder="Describe how to use the build..."
        autoresize
        :rows="5"
        :maxrows="15"
        color="neutral"
        variant="soft"
        @update:modelValue="emit('update:description', String($event))"
      />
    </div>
  </section>
</template>
