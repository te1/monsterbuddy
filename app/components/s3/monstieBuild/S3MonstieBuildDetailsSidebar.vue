<script lang="ts" setup>
  import { computedAsync } from '@vueuse/core';
  import { MonstieBuild } from '~/services/3/monstieBuilds';
  import useMonstieBuildHistoryStore from '~/stores/3/monstieBuildHistoryStore';
  import useMonstieBuildManager from '~/stores/3/monstieBuildManager';

  const route = useRoute();
  const router = useRouter();
  const toast = useToast();
  const history = useMonstieBuildHistoryStore();
  const buildManager = useMonstieBuildManager();

  const build = computed(() => buildManager.build);

  const editing = computed(() => route.path === '/3/builds/monstie/edit');

  const isPinned = computedAsync(async () => {
    return build.value ? await history.isBuildPinned(build.value.id) : false;
  }, false);

  function togglePin() {
    if (build.value) {
      history.togglePinnedBuild(build.value.id);
    }
  }

  async function saveBuild() {
    if (!build.value) {
      return;
    }

    await build.value.save();

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

    await MonstieBuild.remove(build.value.id);

    await router.push('/3/builds/monstie');

    toast.add({
      title: 'Build deleted from your device',
      icon: 'ph:check',
      id: 'build-delete',
      color: 'success',
    });
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
            :disabled="!build"
            subject="build"
            @update:modelValue="togglePin"
          />

          <AppActionButton
            v-if="editing"
            label="Save build"
            icon="ph:floppy-disk"
            @click="saveBuild"
          />

          <AppActionButton
            v-else
            label="Edit build"
            icon="ph:pencil-simple"
            :to="`/3/builds/monstie/edit?op=edit&id=${build?.id}`"
          />

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
