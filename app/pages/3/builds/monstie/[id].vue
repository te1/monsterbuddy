<script lang="ts" setup>
  import S3MonstieBuildViewSidebar from '~/components/s3/monstieBuild/S3MonstieBuildViewSidebar.vue';
  import { MonstieBuild } from '~/services/3/monstieBuilds';
  import useMonstieBuildHistoryStore from '~/stores/3/monstieBuildHistoryStore';
  import useMonstieBuildView from '~/stores/3/monstieBuildView';

  definePageMeta({
    sidebarComponent: S3MonstieBuildViewSidebar,
    back: {
      show: true,
      fallback: '/3/builds/monstie',
    },
  });

  const router = useRouter();
  const route = useRoute();
  const toast = useToast();
  const history = useMonstieBuildHistoryStore();
  const view = useMonstieBuildView();
  const hasSidebar = useHasSidebar();

  const buildId = computed(() => getRouteParamAsString(route.params.id));

  watch(
    () => buildId.value,
    (id) => {
      view.buildId = id;
    },
    { immediate: true }
  );

  const build = computed(() => view.build);

  const title = computed(() => {
    return build.value?.nameWithFallback ?? `Monstie Build`;
  });

  useSeoMeta({
    title: () => `${title.value} In ${gameTypeToFullLabel('mhst3')}`,
    description:
      'Use the Rite of Channeling to pick your genes, unlock bingo bonuses and build your perfect monstie',
    robots: 'noindex, follow',
  });
  const headline = gameTypeToFullName('mhst3');

  async function removeBuild() {
    if (!build.value) {
      return;
    }

    await router.push('/3/builds/monstie');

    try {
      await MonstieBuild.remove(build.value.id);

      toast.add({
        title: 'Build deleted from your device',
        icon: 'ph:check',
        id: 'build-delete',
        color: 'success',
      });
    } catch (error) {
      console.error('Failed to delete build', error);

      toast.add({
        title: 'Failed to delete build',
        icon: 'ph:x',
        id: 'build-delete-error',
        color: 'error',
      });
    }
  }

  watch(
    title,
    () => {
      route.meta.mobileHeaderTitle = title.value;
    },
    { immediate: true }
  );

  onMounted(() => {
    if (buildId.value) {
      history.addRecentBuild(buildId.value);
    }
  });
</script>

<template>
  <div v-if="!view.pending">
    <AppPageHeader :title="title" :headline="headline" />

    <UPageBody class="-mt-3 lg:mt-0">
      <div v-if="build" class="mb-1 text-sm text-muted">
        This <strong class="font-semibold">private</strong> build is stored locally on your device.
      </div>

      <div v-if="build" class="flex flex-col gap-3 md:flex-row lg:flex-col xl:flex-row">
        <div class="flex flex-1 flex-col gap-3">
          <S3MonstieBuildMonstieCard :build="build" class="box overflow-hidden" />

          <S3MonstieBuildBingoCard :build="build" class="box px-4 py-2" />

          <S3MonstieBuildStatsCard :build="build" class="box px-4 py-2" />
        </div>

        <div class="flex flex-1 flex-col gap-3">
          <S3MonstieBuildDescriptionCard :build="build" class="box px-4 py-2" />

          <S3MonstieBuildEggPowerList :build="build" class="box overflow-hidden" />

          <S3MonstieBuildGeneList :build="build" class="box overflow-hidden" />

          <S3MonstieBuildEffectList :build="build" class="box px-4 py-2" />
        </div>
      </div>

      <div v-if="build && !hasSidebar" class="mt-3 flex flex-col px-4">
        <div class="mb-1 font-semibold">Actions</div>

        <AppActionButton
          label="Delete build"
          icon="ph:trash"
          :disabled="!build"
          destructive="delete build"
          @click="removeBuild"
        />

        <AppActionButton
          label="Copy build"
          icon="ph:copy-simple"
          :to="`/3/builds/monstie/edit?op=fork&id=${build?.id}`"
          :disabled="!build"
        />

        <AppActionButton
          label="All builds"
          icon="ph:list-magnifying-glass"
          to="/3/builds/monstie"
        />
      </div>

      <div v-if="!build && buildId && history.allLoaded && !history.hasBuild(buildId)">
        <UError
          :error="{ statusMessage: 'Build Not Found' }"
          redirect="/3/builds/monstie"
          :clear="{
            label: `Back to all builds`,
            size: 'xl',
            color: 'neutral',
            variant: 'link',
            icon: 'ph:arrow-left',
            class: 'cursor-pointer',
          }"
          :ui="{ root: 'min-h-80' }"
        />
      </div>
    </UPageBody>

    <AppFabPanel>
      <NuxtLink to="/3/builds/monstie/edit?op=new" aria-label="New build">
        <AppFab tooltip="New build" icon="ph:plus" />
      </NuxtLink>

      <AppFab
        v-if="build"
        tooltip="Edit build"
        icon="ph:pencil-simple"
        :to="`/3/builds/monstie/edit?op=edit&id=${build?.id}`"
      />
    </AppFabPanel>
  </div>
</template>
