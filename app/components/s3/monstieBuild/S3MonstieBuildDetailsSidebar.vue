<script lang="ts" setup>
  import { computedAsync } from '@vueuse/core';
  import useMonstieBuildHistoryStore from '~/stores/3/monstieBuildHistoryStore';
  import useMonstieBuildManager from '~/stores/3/monstieBuildManager';

  const router = useRouter();
  const history = useMonstieBuildHistoryStore();
  const buildManager = useMonstieBuildManager();

  const build = computed(() => buildManager.build);

  const isPinned = computedAsync(async () => {
    return build.value ? await history.isBuildPinned(build.value.id) : false;
  }, false);

  function togglePin() {
    if (build.value) {
      history.togglePinnedBuild(build.value.id);
    }
  }

  function removeBuild() {
    if (!build.value) {
      return;
    }

    buildManager.removeBuild(build.value.id);

    router.push('/3/builds/monstie');
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
            <USkeleton v-for="i in 4" :key="i" class="my-1 h-6 w-[80%]" />
          </template>
        </ClientOnly>
      </div>
    </template>
  </UTabs>
</template>
