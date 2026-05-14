<script lang="ts" setup>
  import S3MonstieBuildDetailsSidebar from '~/components/s3/monstieBuild/S3MonstieBuildDetailsSidebar.vue';
  import type { EggPowerIndex, GeneIndex } from '~/services/3/monstieBuilds';
  import { MonstieBuild } from '~/services/3/monstieBuilds';
  import useMonstieBuildHistoryStore from '~/stores/3/monstieBuildHistoryStore';
  import useMonstieBuildEdit from '~/stores/3/monstieBuildEdit';

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
  const buildEdit = useMonstieBuildEdit();

  const build = computed(() => buildEdit.build);

  const buildId = computed(() => getRouteParamAsString(route.query.id));

  function updateMonstieSlug(monstieSlug: string | null) {
    if (build.value) {
      build.value.monstieSlug = monstieSlug;
    }
  }

  function updateDualElement(dualElement: ElementType | null) {
    if (build.value) {
      build.value.dualElement = dualElement;
    }
  }

  function updateRegionSlug(regionSlug: string | null) {
    if (build.value) {
      build.value.regionSlug = regionSlug;
    }
  }

  function updateGeneSlug(index: GeneIndex, geneSlug: string | null) {
    if (build.value) {
      build.value.geneSlugs[index] = geneSlug;
    }
  }

  function updateEggPowerSlug(index: EggPowerIndex, eggPowerSlug: string | null) {
    if (build.value) {
      build.value.eggPowerSlugs[index] = eggPowerSlug;
    }
  }

  watch(
    buildId,
    async (id) => {
      if (!id) {
        return;
      }

      buildEdit.buildId = id;
      await history.addRecentBuild(id);
    },
    { immediate: true }
  );

  watch(
    () => route.query.op,
    async (rawOp) => {
      console.log('op', rawOp, 'id', buildId.value);
      const op = getRouteParamAsString(rawOp);

      if (!op) {
        return;
      }

      switch (op) {
        case 'new':
          buildEdit.build = await MonstieBuild.new();
          break;

        case 'fork':
          if (buildId.value) {
            const build = await MonstieBuild.fork(buildId.value);
            if (build) {
              await router.replace({
                path: route.path,
                query: { op: 'edit', id: build.id },
              });
              return;
            }
          }
          break;
      }

      const { op: _op, ...query } = route.query;
      router.replace({
        path: route.path,
        query,
      });
    },
    { immediate: true }
  );

  useSeoMeta({
    title: () => `Monstie Build Planner For ${gameTypeToFullLabel('mhst3')}`,
    description:
      'Use the Rite of Channeling to pick your genes, unlock bingo bonuses and build your perfect monstie',
    robots: 'noindex, follow',
  });
  const headline = gameTypeToFullName('mhst3');
</script>

<template>
  <div v-if="build">
    <AppPageHeader title="Monstie Build Planner" :headline="headline" />

    <UPageBody class="-mt-3 lg:mt-0">
      <div v-if="build" class="mb-1 text-sm text-dimmed">
        This <span class="font-semibold">private</span> build is stored locally on your device
      </div>

      <div v-if="build" class="flex flex-col gap-3 md:flex-row lg:flex-col xl:flex-row">
        <div class="flex flex-1 flex-col gap-3">
          <S3MonstieBuildMonstiePicker :build="build" @update:monstieSlug="updateMonstieSlug" />
          <S3MonstieBuildElementPicker :build="build" @update:dualElement="updateDualElement" />
          <S3MonstieBuildRegionPicker :build="build" @update:regionSlug="updateRegionSlug" />
          <S3MonstieBuildEggPowerPicker
            :build="build"
            :index="0"
            @update:eggPowerSlug="updateEggPowerSlug(0, $event)"
          />
          <S3MonstieBuildEggPowerPicker
            :build="build"
            :index="1"
            @update:eggPowerSlug="updateEggPowerSlug(1, $event)"
          />
          <S3MonstieBuildEggPowerPicker
            :build="build"
            :index="2"
            @update:eggPowerSlug="updateEggPowerSlug(2, $event)"
          />
          <S3MonstieBuildGenePicker
            :build="build"
            :index="0"
            @update:geneSlug="updateGeneSlug(0, $event)"
          />

          <S3MonstieBuildMonstieCard :build="build" class="box overflow-hidden" />

          <S3MonstieBuildBingoCard :build="build" class="box px-4 py-2" />

          <S3MonstieBuildStatsCard :build="build" class="box px-4 py-2" />

          <S3MonstieBuildDescriptionCard :build="build" class="box px-4 py-2" />
        </div>

        <div class="flex flex-1 flex-col gap-3">
          <S3MonstieBuildGeneList :build="build" class="box overflow-hidden" />

          <S3MonstieBuildEggPowerList :build="build" class="box overflow-hidden" />

          <S3MonstieBuildEffectList :build="build" class="box px-4 py-2" />
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
      <!-- TODO don't have fabs? put action buttons at the end of the page? maybe edit fab? -->
      <!--
      <AppFab
        v-if="build"
        tooltip="Delete build"
        icon="ph:trash"
        destructive="delete build"
        @click="deleteBuild"
      />
      <AppFab tooltip="New build" icon="ph:plus" @click="newBuild" />
      -->
    </AppFabPanel>
  </div>
</template>
