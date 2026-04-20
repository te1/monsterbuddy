<script lang="ts" setup>
  import useMonstieBuildsStore from '~/stores/3/monstieBuildsStore';

  const router = useRouter();
  const builds = useMonstieBuildsStore();
  const build = computed(() => builds.currentBuild);

  function newBuild() {
    builds.newBuild();
  }

  function togglePin() {
    if (build.value) {
      builds.togglePinnedBuild(build.value.id);
    }
  }

  function removeBuild() {
    if (!build.value) {
      return;
    }

    builds.removeBuild(build.value.id);

    router.push('/3/builder/monstie');
  }

  const tabs = [{ label: 'Actions', slot: 'actions' }];
</script>

<template>
  <UTabs color="neutral" variant="link" :items="tabs">
    <template #actions>
      <div class="flex flex-col gap-0">
        <ClientOnly>
          <AppPinToggle
            :modelValue="builds.isCurrentBuildPinned"
            :disabled="!build"
            subject="build"
            @update:modelValue="togglePin"
          />

          <UButton
            color="neutral"
            variant="link"
            label="Delete build"
            icon="ph:trash"
            :ui="{ base: 'px-0 font-normal' }"
            :disabled="!build"
            @click="removeBuild"
          />

          <UButton
            color="neutral"
            variant="link"
            label="New build"
            icon="ph:list-plus"
            :ui="{ base: 'px-0 font-normal' }"
            :disabled="build?.isEmpty()"
            @click="newBuild"
          />

          <UButton
            color="neutral"
            variant="link"
            label="View your builds"
            icon="ph:user-list"
            to="/3/builder/monstie"
            :ui="{ base: 'px-0 font-normal' }"
          />

          <template #fallback>
            <USkeleton v-for="i in 4" :key="i" class="my-1 h-6 w-[80%]" />
          </template>
        </ClientOnly>
      </div>
    </template>
  </UTabs>
</template>
