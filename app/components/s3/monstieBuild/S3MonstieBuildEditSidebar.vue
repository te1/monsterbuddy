<script lang="ts" setup>
  import { MonstieBuild } from '~/services/3/monstieBuilds';
  import useMonstieBuildEdit from '~/stores/3/monstieBuildEdit';

  const router = useRouter();
  const toast = useToast();
  const edit = useMonstieBuildEdit();

  const build = computed(() => edit.build);
  const isSaved = computed(() => edit.isSaved);
  const isPinned = computed(() => edit.isPinned);
  const hasChanges = computed(() => edit.hasChanges);

  function togglePin() {
    if (!build.value || !isSaved.value) {
      return;
    }

    edit.togglePin();
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
    if (!build.value || !isSaved.value) {
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

  const tabs = [{ label: 'Actions', slot: 'actions' }];
</script>

<template>
  <UTabs color="neutral" variant="link" :items="tabs">
    <template #actions>
      <div class="flex flex-col gap-0">
        <ClientOnly>
          <AppPinToggle
            :modelValue="isPinned"
            :disabled="!build || !isSaved"
            subject="build"
            @update:modelValue="togglePin"
          />

          <AppActionButton
            label="Save build"
            icon="ph:floppy-disk"
            :disabled="!build"
            :class="{ 'text-primary': hasChanges }"
            @click="saveBuild"
          />

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

          <template #fallback>
            <USkeleton v-for="i in 6" :key="i" class="my-1 h-6 w-[80%]" />
          </template>
        </ClientOnly>
      </div>
    </template>
  </UTabs>
</template>
