<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import type { GeneIndex, MonstieBuild } from '~/services/3/monstieBuilds';
  import type { GenePickedEvent } from '../monstieBuild/S3MonstieBuildGenePicker.vue';
  import { formatGeneInfo } from '~/services/3/presentation';

  const canHover = useCanHover();

  const props = withDefaults(
    defineProps<{
      gene: Gene;
      editMode?: boolean;
      build?: MonstieBuild;
      index?: GeneIndex;
    }>(),
    {
      editMode: false,
      build: undefined,
      index: undefined,
    }
  );

  const emit = defineEmits<{
    'update:gene': [data: GenePickedEvent];
  }>();

  const info = computed(() => formatGeneInfo(props.gene));
</script>

<template>
  <AppRichTooltip :link="`/3/genes/${gene.slug}`" linkText="Go to gene page">
    <slot />

    <template #content>
      <div class="text-sm">
        <div class="flex items-center justify-between gap-3">
          <div>
            <div class="-mb-0.5 text-muted" v-text="info" />

            <div class="text-base leading-snug font-semibold" v-text="gene.name" />
          </div>

          <div v-if="gene.active" class="hidden self-start text-muted xs:flex @xs:flex">
            <span v-if="gene.stamina != null" class="whitespace-nowrap">
              Stam
              <strong class="font-bold" v-text="gene.stamina" />
            </span>

            <span v-if="gene.power != null" class="whitespace-nowrap">
              , Pwr
              <strong class="font-bold" v-text="gene.power" />
            </span>

            <span v-if="gene.wyvernfell != null" class="whitespace-nowrap">
              , Wyvf
              <strong class="font-bold" v-text="gene.wyvernfell" />
            </span>
          </div>
        </div>

        <div v-text="gene.description" />

        <div v-if="editMode && canHover" class="mt-3 text-base text-primary">
          Click to select another gene
        </div>

        <LazyS3MonstieBuildGenePicker
          v-if="editMode && !canHover && build && index != null"
          :build="build"
          :index="index"
          @update:gene="emit('update:gene', $event)"
        >
          <UButton
            label="Select another gene"
            color="primary"
            variant="link"
            class="mt-3 p-0 text-base font-normal select-none"
          />
        </LazyS3MonstieBuildGenePicker>
      </div>
    </template>
  </AppRichTooltip>
</template>
