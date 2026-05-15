<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import type { GeneIndex, MonstieBuild } from '~/services/3/monstieBuilds';
  import type { GenePickedEvent } from './S3MonstieBuildGenePicker.vue';

  const canHover = useCanHover();

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
    <template v-if="gene">
      <template v-if="editMode">
        <LazyS3MonstieBuildGenePicker
          v-if="canHover"
          :build="build"
          :index="index"
          @update:gene="emit('update:gene', $event)"
        >
          <div class="size-full">
            <S3GeneTooltip :gene="gene" :editMode="editMode">
              <S3GeneIcon :gene="gene" size="size-full" noTooltip />
            </S3GeneTooltip>
          </div>
        </LazyS3MonstieBuildGenePicker>

        <S3GeneTooltip
          v-else
          :gene="gene"
          :editMode="editMode"
          :build="build"
          :index="index"
          @update:gene="emit('update:gene', $event)"
        >
          <S3GeneIcon :gene="gene" size="size-full" noTooltip />
        </S3GeneTooltip>
      </template>

      <S3GeneTooltip v-else :gene="gene">
        <S3GeneIcon :gene="gene" size="size-full" noTooltip />
      </S3GeneTooltip>
    </template>

    <div v-else>
      <LazyS3MonstieBuildGenePicker
        v-if="editMode"
        :build="build"
        :index="index"
        @update:gene="emit('update:gene', $event)"
      >
        <UTooltip text="Select Gene" :content="{ side: 'top' }">
          <UButton
            icon="ph:plus-bold"
            color="neutral"
            variant="link"
            size="xl"
            :ui="{ leadingIcon: 'size-8' }"
          />
        </UTooltip>
      </LazyS3MonstieBuildGenePicker>
    </div>
  </div>
</template>
