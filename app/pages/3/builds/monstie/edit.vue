<script lang="ts" setup>
  import type { GenePickedEvent } from '~/components/s3/monstieBuild/S3MonstieBuildGenePicker.vue';
  import type { EggPowerPickedEvent } from '~/components/s3/monstieBuild/S3MonstieBuildEggPowerPicker.vue';
  import { omit } from 'es-toolkit/object';
  import AppConfirmModal from '~/components/app/AppConfirmModal.vue';
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
  const overlay = useOverlay();
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

  function updateGene(data: GenePickedEvent) {
    if (build.value) {
      build.value.geneSlugs[data.index] = data.geneSlug;
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

    try {
      await edit.save();

      toast.add({
        title: 'Build saved locally to your device',
        icon: 'ph:check',
        id: 'build-save',
        color: 'success',
      });
    } catch (error) {
      console.error('Failed to save build', error);

      toast.add({
        title: 'Failed to save build',
        icon: 'ph:x',
        id: 'build-save-error',
        color: 'error',
      });
    }
  }

  async function removeBuild() {
    if (!build.value) {
      return;
    }

    try {
      edit.hasChanges = false;
      await MonstieBuild.remove(build.value.id);

      await router.push('/3/builds/monstie');

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
    () => [route.query.op, route.query.id],
    async ([rawOp, rawId]) => {
      const op = getRouteParamAsString(rawOp);
      const id = getRouteParamAsString(rawId);

      switch (op) {
        case 'new':
          edit.build = MonstieBuild.new();
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
            edit.build = MonstieBuild.new();
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

  onBeforeRouteLeave(async () => {
    if (!hasChanges.value) {
      return true;
    }

    const option = await saveChangesPrompt();

    if (option === 'stay') {
      return false;
    }

    if (option === 'save') {
      await saveBuild();
    }

    return true;
  });

  function saveChangesWarning(event: BeforeUnloadEvent) {
    if (!hasChanges.value) {
      return;
    }

    event.preventDefault();
    event.returnValue = '';
  }

  onMounted(() => {
    window.addEventListener('beforeunload', saveChangesWarning);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', saveChangesWarning);
  });

  type SaveChangesOption = 'save' | 'discard' | 'stay';

  const saveChangesModal = overlay.create(AppConfirmModal);

  async function saveChangesPrompt(): Promise<SaveChangesOption> {
    const option = await saveChangesModal.open({
      title: 'Save changes before leaving?',
      description: 'There are unsaved changes that might be lost when you leave this page.',
      actions: [
        {
          label: 'Stay',
          value: 'stay',
          color: 'neutral',
          variant: 'ghost',
        },
        {
          label: 'Discard',
          value: 'discard',
          color: 'neutral',
          variant: 'ghost',
        },
        {
          label: 'Save',
          value: 'save',
          color: 'primary',
          variant: 'outline',
          icon: 'ph:floppy-disk',
          focus: true,
        },
      ],
    });

    return (option ?? 'stay') as SaveChangesOption;
  }
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
          </span>
          <span v-else>
            This <strong class="font-semibold">private</strong> build is
            <strong class="font-semibold">not saved</strong> yet.
          </span>

          <span v-if="hasChanges">
            There are <strong class="font-semibold">unsaved changes</strong>.
          </span>
          <span v-else>There are no changes.</span>
        </div>

        <div v-if="build" class="flex flex-col gap-3 md:flex-row lg:flex-col xl:flex-row">
          <div class="flex flex-1 flex-col gap-3">
            <S3MonstieBuildMonstieCard
              :build="build"
              editMode
              class="box overflow-hidden"
              @update:monstieSlug="updateMonstieSlug"
              @update:dualElement="updateDualElement"
              @update:regionSlug="updateRegionSlug"
            />

            <S3MonstieBuildBingoCard
              :build="build"
              editMode
              class="box px-4 py-2"
              @update:gene="updateGene($event)"
            />

            <S3MonstieBuildStatsCard :build="build" class="box px-4 py-2" />
          </div>

          <div class="flex flex-1 flex-col gap-3">
            <S3MonstieBuildNameCard
              :build="build"
              class="box px-4 py-2"
              @update:name="updateName"
              @update:description="updateDescription"
            />

            <S3MonstieBuildEggPowerList
              :build="build"
              editMode
              class="box overflow-hidden"
              @update:eggPower="updateEggPower($event)"
            />

            <S3MonstieBuildGeneList :build="build" class="box overflow-hidden" />

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
