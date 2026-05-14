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
    <LazyS3MonstieBuildMonstiePicker
      :build="build"
      :editMode="editMode"
      @update:monstieSlug="emit('update:monstieSlug', $event)"
    >
      <div :class="{ 'cursor-default transition-opacity hover:opacity-75': editMode }">
        <div class="inline-block px-4 pt-2">
          <UTooltip :text="editMode ? 'Select Monstie' : ''" :content="{ side: 'right' }">
            <div class="flex items-center gap-1" :class="{ 'select-none': editMode }">
              <UIcon v-if="editMode" name="ph:note-pencil-light" class="size-6 text-toned" />
              <h3 class="text-lg font-semibold">Monstie</h3>
            </div>
          </UTooltip>
        </div>

        <div v-if="build.monstie" :class="{ 'box-link': !editMode }">
          <S3MonstieListItem
            v-if="editMode"
            :monster="build.monstie"
            mode="location"
            class="px-2.5"
          />
          <NuxtLink v-else :to="`/3/monsters/${build.monstie.slug}`" prefetchOn="interaction">
            <S3MonstieListItem :monster="build.monstie" mode="location" class="px-2.5" />
          </NuxtLink>
        </div>
        <div v-else class="px-4 pb-2 text-dimmed" v-text="'No monstie selected'" />
      </div>
    </LazyS3MonstieBuildMonstiePicker>

    <div class="flex flex-col gap-3 px-4 pb-2">
      <div>
        <LazyS3MonstieBuildElementPicker
          :build="build"
          :editMode="editMode"
          @update:dualElement="emit('update:dualElement', $event)"
        >
          <div
            class="flex items-center justify-between gap-1"
            :class="{ 'cursor-default transition-opacity hover:opacity-75': editMode }"
          >
            <UTooltip :text="editMode ? 'Select Dual Element' : ''" :content="{ side: 'right' }">
              <div class="flex items-center gap-1" :class="{ 'select-none': editMode }">
                <UIcon v-if="editMode" name="ph:note-pencil-light" class="size-6 text-toned" />
                <h3 class="text-lg font-semibold">Dual Element</h3>
              </div>
            </UTooltip>

            <div v-if="build.dualElement" class="flex items-center">
              <ElementIcon :element="build.dualElement" icon2 noTooltip />
              <ElementLabel :element="build.dualElement" />
            </div>
            <div v-else class="text-dimmed" v-text="'No dual element'" />
          </div>
        </LazyS3MonstieBuildElementPicker>

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
        <LazyS3MonstieBuildRegionPicker
          :build="build"
          :editMode="editMode"
          @update:regionSlug="emit('update:regionSlug', $event)"
        >
          <div
            class="flex flex-col justify-between xs:flex-row xs:items-center xs:gap-1"
            :class="{ 'cursor-default transition-opacity hover:opacity-75': editMode }"
          >
            <UTooltip :text="editMode ? 'Select Stat Increases' : ''" :content="{ side: 'right' }">
              <div class="flex items-center gap-1" :class="{ 'select-none': editMode }">
                <UIcon v-if="editMode" name="ph:note-pencil-light" class="size-6 text-toned" />
                <h3 class="text-lg font-semibold">Stat Increases</h3>
              </div>
            </UTooltip>

            <div
              v-if="build.region"
              v-text="build.region.powers.stats.map(statsTypeToText).join(', ')"
            />
            <div v-else class="text-dimmed" v-text="'No stat increases'" />
          </div>
        </LazyS3MonstieBuildRegionPicker>

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
