<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import type { GeneIndex, MonstieBuild } from '~/services/3/monstieBuilds';
  import type { GenePickedEvent } from './S3MonstieBuildGenePicker.vue';

  const props = withDefaults(
    defineProps<{
      build: MonstieBuild;
      genes: (Gene | undefined)[];
      index: GeneIndex;
      editMode?: boolean;
    }>(),
    {
      editMode: false,
    }
  );

  const emit = defineEmits<{
    'update:gene': [data: GenePickedEvent];
  }>();

  const gene = computed(() => props.genes[props.index]);
</script>

<template>
  <div class="relative grid size-full place-items-center">
    <S3GeneTooltip v-if="gene" :gene="gene">
      <S3GeneIcon :gene="gene" size="size-full" noTooltip />
    </S3GeneTooltip>

    <div v-else>
      <S3MonstieBuildGenePicker
        v-if="editMode"
        :build="build"
        :index="index"
        @update:gene="emit('update:gene', $event)"
      />
      <div v-else>+</div>
    </div>
  </div>
</template>
