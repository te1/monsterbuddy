<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import type { GenePickedEvent } from './S3MonstieBuildGenePicker.vue';

  withDefaults(
    defineProps<{
      build: MonstieBuild;
      editMode?: boolean;
    }>(),
    {
      editMode: false,
    }
  );

  const emit = defineEmits<{
    'update:gene': [data: GenePickedEvent];
  }>();
</script>

<template>
  <section class="@container">
    <div v-if="editMode" class="flex items-center gap-1">
      <UIcon name="ph:note-pencil-light" class="size-6 text-toned" />
      <h3 class="text-lg font-semibold">Genes</h3>
    </div>

    <div
      class="flex flex-col place-items-center gap-x-12 gap-y-6 @3xl:flex-row @3xl:place-items-start"
    >
      <S3MonstieBuildGeneGrid
        :build="build"
        :editMode="editMode"
        @update:gene="emit('update:gene', $event)"
      />

      <S3MonstieBuildBingoBonus :build="build" />
    </div>
  </section>
</template>
