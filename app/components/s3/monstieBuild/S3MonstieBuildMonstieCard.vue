<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import { computedAsync } from '@vueuse/core';
  import { getAreasByElement } from '~/services/3/data';
  import { statsTypeToText } from '~/services/3/presentation';
  import useMonstieBuildHistoryStore from '~/stores/3/monstieBuildHistoryStore';
  import useMonstieBuildEdit from '~/stores/3/monstieBuildEdit';

  const props = withDefaults(
    defineProps<{
      build: MonstieBuild;
      editMode?: boolean;
    }>(),
    {
      editMode: false,
    }
  );

  const emit = defineEmits<{
    'update:monstieSlug': [monstieSlug: string | null];
    'update:dualElement': [dualElement: ElementType | null];
    'update:regionSlug': [regionSlug: string | null];
  }>();

  const history = useMonstieBuildHistoryStore();
  const edit = useMonstieBuildEdit();

  const dualElementAreas = computed(() => {
    if (!props.build.dualElement) {
      return [];
    }

    return getAreasByElement(props.build.dualElement);
  });

  const isPinned = computedAsync(async () => {
    if (props.editMode) {
      return edit.isPinned;
    }
    return props.build?.id ? await history.isBuildPinned(props.build.id) : false;
  }, false);

  async function togglePin() {
    if (props.editMode) {
      await edit.togglePin();
      return;
    }
    history.togglePinnedBuild(props.build.id);
  }
</script>

<template>
  <section class="relative">
    <div class="inline-block px-4 pt-2">
      <LazyS3MonstieBuildMonstiePicker
        v-if="editMode"
        :build="build"
        @update:monstieSlug="emit('update:monstieSlug', $event)"
      >
        <UTooltip text="Select Monstie" :content="{ side: 'right' }">
          <div
            class="flex cursor-default items-center gap-1 transition-opacity select-none hover:opacity-75"
          >
            <UIcon name="ph:note-pencil-light" class="size-6 text-toned" />
            <h3 class="text-lg font-semibold">Monstie</h3>
          </div>
        </UTooltip>
      </LazyS3MonstieBuildMonstiePicker>
      <h3 v-else class="text-lg font-semibold">Monstie</h3>
    </div>

    <div v-if="build.monstie" :class="{ 'box-link': !editMode }">
      <S3MonstieListItem
        v-if="editMode"
        :monster="build.monstie"
        mode="location"
        withTooltips
        class="px-2.5"
      />
      <NuxtLink v-else :to="`/3/monsters/${build.monstie.slug}`" prefetchOn="interaction">
        <S3MonstieListItem :monster="build.monstie" mode="location" class="px-2.5" />
      </NuxtLink>
    </div>
    <div v-else class="px-4 pb-2 text-dimmed" v-text="'No monstie selected'" />

    <div class="flex flex-col gap-3 px-4 pb-2">
      <div>
        <div class="flex items-center justify-between gap-1">
          <LazyS3MonstieBuildElementPicker
            v-if="editMode"
            :build="build"
            @update:dualElement="emit('update:dualElement', $event)"
          >
            <UTooltip text="Select Dual Element" :content="{ side: 'right' }">
              <div
                class="flex cursor-default items-center gap-1 transition-opacity select-none hover:opacity-75"
              >
                <UIcon name="ph:note-pencil-light" class="size-6 text-toned" />
                <h3 class="text-lg font-semibold">Dual Element</h3>
              </div>
            </UTooltip>
          </LazyS3MonstieBuildElementPicker>
          <h3 v-else class="text-lg font-semibold">Dual Element</h3>

          <div v-if="build.dualElement" class="flex items-center">
            <ElementIcon :element="build.dualElement" icon2 noTooltip />
            <ElementLabel :element="build.dualElement" />
          </div>
          <div v-else class="text-dimmed" v-text="'No dual element'" />
        </div>

        <div v-if="dualElementAreas.length > 0">
          From areas
          <span v-for="(area, index) in dualElementAreas" :key="area.region.slug + area.area.slug">
            <AppNuxtLink
              :to="`/3/habitats/${area.region.slug}/${area.area.slug}`"
              prefetchOn="interaction"
              :text="area.area.name"
            />{{ index + 1 < dualElementAreas.length ? ', ' : '' }}
          </span>
        </div>
      </div>

      <div>
        <div class="flex flex-col justify-between xs:flex-row xs:items-center xs:gap-1">
          <LazyS3MonstieBuildRegionPicker
            v-if="editMode"
            :build="build"
            @update:regionSlug="emit('update:regionSlug', $event)"
          >
            <UTooltip text="Select Stat Increases" :content="{ side: 'right' }">
              <div
                class="flex cursor-default items-center gap-1 transition-opacity select-none hover:opacity-75"
              >
                <UIcon name="ph:note-pencil-light" class="size-6 text-toned" />
                <h3 class="text-lg font-semibold">Stat Increases</h3>
              </div>
            </UTooltip>
          </LazyS3MonstieBuildRegionPicker>
          <h3 v-else class="text-lg font-semibold">Stat Increases</h3>

          <div
            v-if="build.region"
            v-text="build.region.powers.stats.map(statsTypeToText).join(', ')"
          />
          <div v-else class="text-dimmed" v-text="'No stat increases'" />
        </div>

        <div v-if="build.region">
          From region
          <AppNuxtLink
            :to="`/3/habitats/${build.region.slug}`"
            prefetchOn="interaction"
            :text="build.region.name"
          />
        </div>
      </div>
    </div>

    <div class="absolute top-1 right-1">
      <ClientOnly>
        <AppPinToggle
          :modelValue="isPinned"
          subject="build"
          noLabel
          @update:modelValue="togglePin"
        />
      </ClientOnly>
    </div>
  </section>
</template>
