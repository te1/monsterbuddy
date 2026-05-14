<script lang="ts" setup>
  import type { EggPowerIndex, GeneIndex } from '~/services/3/monstieBuilds';
  import { omit } from 'es-toolkit/object';
  import S3MonstieBuildEditSidebar from '~/components/s3/monstieBuild/S3MonstieBuildEditSidebar.vue';
  import { MonstieBuild } from '~/services/3/monstieBuilds';
  import useMonstieBuildHistoryStore from '~/stores/3/monstieBuildHistoryStore';
  import useMonstieBuildEdit from '~/stores/3/monstieBuildEdit';
  import { db } from '~/services/3/localDb';

  definePageMeta({
    sidebarComponent: S3MonstieBuildEditSidebar,
    back: {
      show: true,
      fallback: '/3/builds/monstie',
    },
  });

  const router = useRouter();
  const route = useRoute();
  const history = useMonstieBuildHistoryStore();
  const edit = useMonstieBuildEdit();

  const build = computed(() => edit.build);

  const ready = ref(false);
  const notFound = ref(false);

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
    () => [route.query.op, route.query.id],
    async ([rawOp, rawId]) => {
      console.log('op', rawOp, 'id', rawId);
      const op = getRouteParamAsString(rawOp);
      const id = getRouteParamAsString(rawId);

      switch (op) {
        case 'new':
          edit.build = await MonstieBuild.new();
          ready.value = true;
          break;

        case 'fork': {
          if (id) {
            const build = await MonstieBuild.fork(id);
            if (build) {
              edit.build = build;
            } else {
              notFound.value = true;
            }
          }
          ready.value = true;
          break;
        }

        case 'edit':
          if (id) {
            const entity = await db.monstieBuilds.get(id);
            if (entity) {
              edit.build = MonstieBuild.fromEntity(entity);
              await history.addRecentBuild(id);
            } else {
              notFound.value = true;
            }
          }
          ready.value = true;
          break;

        default:
          if (edit.build == null) {
            edit.build = await MonstieBuild.new();
          } else {
            await history.addRecentBuild(edit.build.id);
          }
          ready.value = true;
          break;
      }

      if (!notFound.value) {
        router.replace({
          path: route.path,
          query: omit(route.query, ['op', 'id']),
        });
      }
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
  <div>
    <AppPageHeader title="Monstie Build Planner" :headline="headline" />

    <UPageBody class="-mt-3 lg:mt-0">
      <div v-if="notFound">
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

      <template v-else-if="ready">
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

            <S3MonstieBuildMonstieCard :build="build" editMode class="box overflow-hidden" />

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
      </template>
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
