<script lang="ts" setup>
  import type { GeneIndex } from '~/services/3/monstieBuilds';
  import type { EggPowerPickedEvent } from '~/components/s3/monstieBuild/S3MonstieBuildEggPowerPicker.vue';
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
    mobileHeaderTitle: 'Monstie Build',
  });

  const router = useRouter();
  const route = useRoute();
  const toast = useToast();
  const history = useMonstieBuildHistoryStore();
  const edit = useMonstieBuildEdit();
  const hasSidebar = useHasSidebar();

  const build = computed(() => edit.build);
  const isSaved = computed(() => edit.isSaved);
  const hasChanges = computed(() => edit.hasChanges);

  const ready = ref(false);
  const notFound = ref(false);

  function updateName(name: string) {
    if (build.value) {
      build.value.name = name;
    }
  }

  function updateDescription(description: string) {
    if (build.value) {
      build.value.description = description;
    }
  }

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

  function updateEggPower(data: EggPowerPickedEvent) {
    if (build.value) {
      build.value.eggPowerSlugs[data.index] = data.eggPowerSlug;
    }
  }

  async function saveBuild() {
    if (!build.value) {
      return;
    }

    await edit.save();

    toast.add({
      title: 'Build saved locally to your device',
      icon: 'ph:check',
      id: 'build-save',
      color: 'success',
    });
  }

  async function removeBuild() {
    if (!build.value) {
      return;
    }

    await router.push('/3/builds/monstie');

    await MonstieBuild.remove(build.value.id);

    toast.add({
      title: 'Build deleted from your device',
      icon: 'ph:check',
      id: 'build-delete',
      color: 'success',
    });
  }

  watch(
    () => [route.query.op, route.query.id],
    async ([rawOp, rawId]) => {
      const op = getRouteParamAsString(rawOp);
      const id = getRouteParamAsString(rawId);

      switch (op) {
        case 'new':
          edit.build = await MonstieBuild.new();
          ready.value = true;
          window.scrollTo({ top: 0, behavior: 'smooth' });
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
          window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div v-if="build" class="mb-1 text-sm text-muted">
          <span v-if="isSaved">
            This <strong class="font-semibold">private</strong> build is stored locally on your
            device.
            <span v-if="hasChanges">
              There are <strong class="font-semibold">unsaved changes</strong>.
            </span>
          </span>
          <span v-else>
            This <strong class="font-semibold">private</strong> build is
            <strong class="font-semibold">not saved</strong> yet.
          </span>
        </div>

        <div v-if="build" class="flex flex-col gap-3 md:flex-row lg:flex-col xl:flex-row">
          <div class="flex flex-1 flex-col gap-3">
            <S3MonstieBuildGenePicker
              :build="build"
              :index="0"
              @update:geneSlug="updateGeneSlug(0, $event)"
            />

            <S3MonstieBuildMonstieCard
              :build="build"
              editMode
              class="box overflow-hidden"
              @update:monstieSlug="updateMonstieSlug"
              @update:dualElement="updateDualElement"
              @update:regionSlug="updateRegionSlug"
            />

            <S3MonstieBuildBingoCard :build="build" editMode class="box px-4 py-2" />

            <S3MonstieBuildStatsCard :build="build" class="box px-4 py-2" />
          </div>

          <div class="flex flex-1 flex-col gap-3">
            <S3MonstieBuildNameCard
              :build="build"
              class="box px-4 py-2"
              @update:name="updateName"
              @update:description="updateDescription"
            />

            <S3MonstieBuildGeneList :build="build" class="box overflow-hidden" />

            <S3MonstieBuildEggPowerList
              :build="build"
              editMode
              class="box overflow-hidden"
              @update:eggPower="updateEggPower($event)"
            />

            <S3MonstieBuildEffectList :build="build" class="box px-4 py-2" />
          </div>
        </div>

        <div v-if="build && !hasSidebar" class="mt-3 flex flex-col px-4">
          <div class="mb-1 font-semibold">Actions</div>

          <AppActionButton
            label="Delete build"
            icon="ph:trash"
            :disabled="!build || !isSaved"
            destructive="delete build"
            @click="removeBuild"
          />

          <AppActionButton
            label="Copy build"
            icon="ph:copy-simple"
            :to="`/3/builds/monstie/edit?op=fork&id=${build?.id}`"
            :disabled="!build || !isSaved"
          />

          <AppActionButton
            label="New build"
            icon="ph:list-plus"
            to="/3/builds/monstie/edit?op=new"
          />

          <AppActionButton
            label="All builds"
            icon="ph:list-magnifying-glass"
            to="/3/builds/monstie"
          />
        </div>
      </template>
    </UPageBody>

    <AppFabPanel>
      <AppFab
        v-if="build"
        tooltip="Save build"
        icon="ph:floppy-disk"
        :class="{ 'text-primary': hasChanges }"
        @click="saveBuild"
      />
    </AppFabPanel>
  </div>
</template>
