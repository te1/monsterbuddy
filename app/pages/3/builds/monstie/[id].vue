<script lang="ts" setup>
  import S3MonstieBuildDetailsSidebar from '~/components/s3/monstieBuild/S3MonstieBuildDetailsSidebar.vue';
  import useMonstieBuildHistoryStore from '~/stores/3/monstieBuildHistoryStore';
  import useMonstieBuildStore from '~/stores/3/monstieBuildStore';

  definePageMeta({
    sidebarComponent: S3MonstieBuildDetailsSidebar,
    back: {
      show: true,
      fallback: '/3/builds/monstie',
    },
  });

  const router = useRouter();
  const route = useRoute();
  const history = useMonstieBuildHistoryStore();
  const buildStore = useMonstieBuildStore();

  const buildId = computed(() =>
    Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  );

  buildStore.buildId = buildId.value;

  const build = computed(() => buildStore.build);

  const title = computed(() => {
    return build.value?.nameWithFallback ?? `Monstie Build `;
  });

  useSeoMeta({
    title: () => `${title.value} In ${gameTypeToFullLabel('mhst3')}`,
    description:
      'Use the Rite of Channeling to pick your genes, unlock bingo bonuses and build your perfect monstie',
    robots: 'noindex, follow',
  });
  const headline = gameTypeToFullName('mhst3');

  function newBuild() {
    buildStore.goToNewBuild();
  }

  function deleteBuild() {
    if (!build.value) {
      return;
    }

    buildStore.removeBuild(build.value.id);

    router.push('/3/builds/monstie');
  }

  watch(
    title,
    () => {
      route.meta.mobileHeaderTitle = title.value;
    },
    { immediate: true }
  );
</script>

<template>
  <div v-if="!buildStore.pending">
    <AppPageHeader :title="title" :headline="headline" />

    <UPageBody class="-mt-3 lg:mt-0">
      <div v-if="build" class="mb-1 text-sm text-dimmed">
        This <span class="font-semibold">private</span> build is stored locally on your device
      </div>

      <div v-if="build" class="flex flex-col gap-3 md:flex-row lg:flex-col xl:flex-row">
        <div class="flex flex-1 flex-col gap-3">
          <S3MonstieBuildMonstieCard :build="build" class="box overflow-hidden" />

          <S3MonstieBuildGeneGrid :build="build" class="box px-4 py-2" />

          <S3MonstieBuildDescriptionCard :build="build" class="box px-4 py-2" />

          <!-- Stats -->
          <!-- Effects -->
          <!-- Duplicates / Stacking -->
        </div>

        <div class="flex flex-1 flex-col gap-3">
          <S3MonstieBuildGeneList :build="build" class="box overflow-hidden" />

          <S3MonstieBuildEggPowerList :build="build" class="box overflow-hidden" />
        </div>
      </div>

      <div v-else-if="buildId && history.allLoaded && !history.hasBuild(buildId)">
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
      <AppFab
        v-if="build"
        tooltip="Delete build"
        icon="ph:trash"
        destructive="delete build"
        @click="deleteBuild"
      />
      <AppFab tooltip="New build" icon="ph:plus" @click="newBuild" />
    </AppFabPanel>
  </div>
</template>
