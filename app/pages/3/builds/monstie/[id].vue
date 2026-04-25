<script lang="ts" setup>
  import S3MonstieBuildDetailsSidebar from '~/components/s3/monstieBuild/S3MonstieBuildDetailsSidebar.vue';
  import useMonstieBuildStore from '~/stores/3/monstieBuildStore';

  definePageMeta({
    sidebarComponent: S3MonstieBuildDetailsSidebar,
    back: {
      show: true,
      fallback: '/3/builds/monstie',
    },
    robots: {
      noindex: true,
      follow: true,
    },
  });

  // useRobotsRule({ noindex: true, follow: true });

  const route = useRoute();
  const buildStore = useMonstieBuildStore();

  const build = computed(() => buildStore.build);

  const title = computed(() => {
    return build.value?.nameWithFallback ?? `Monstie Build `;
  });

  useSeoMeta({
    title: () => `${title.value} In ${gameTypeToFullLabel('mhst3')}`,
    description:
      'Use the Rite of Channeling to pick your genes, unlock bingo bonuses and build your perfect monstie',
  });
  const headline = gameTypeToFullName('mhst3');

  function newBuild() {
    buildStore.goToNewBuild();
  }

  watch(
    build,
    () => {
      route.meta.mobileHeaderTitle = title.value;
    },
    { immediate: true }
  );

  onMounted(() => {
    buildStore.buildId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  });
</script>

<template>
  <div>
    <AppPageHeader :title="title" :headline="headline" />

    <UPageBody class="-mt-3 lg:mt-0">
      <div v-if="build" class="font-semibold">placeholder {{ build.nameWithFallback }}</div>
    </UPageBody>

    <AppFabPanel>
      <AppFab tooltip="New build" icon="ph:plus" @click="newBuild" />
    </AppFabPanel>
  </div>
</template>
