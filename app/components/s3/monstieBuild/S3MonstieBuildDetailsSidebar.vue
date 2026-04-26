<script lang="ts" setup>
  import { computedAsync } from '@vueuse/core';
  import useMonstieBuildHistoryStore from '~/stores/3/monstieBuildHistoryStore';
  import useMonstieBuildStore from '~/stores/3/monstieBuildStore';

  const router = useRouter();
  const history = useMonstieBuildHistoryStore();
  const buildStore = useMonstieBuildStore();

  const build = computed(() => buildStore.build);

  const isPinned = computedAsync(async () => {
    return build.value ? await history.isBuildPinned(build.value.id) : false;
  }, false);

  function newBuild() {
    buildStore.goToNewBuild();
  }

  function togglePin() {
    if (build.value) {
      history.togglePinnedBuild(build.value.id);
    }
  }

  function removeBuild() {
    if (!build.value) {
      return;
    }

    buildStore.removeBuild(build.value.id);

    router.push('/3/builds/monstie');
  }

  const pending = ref(false);
  let pendingTimer: ReturnType<typeof setTimeout> | undefined;

  function resetPending() {
    pending.value = false;

    if (pendingTimer) {
      clearTimeout(pendingTimer);
      pendingTimer = undefined;
    }
  }

  function startPending() {
    resetPending();

    pending.value = true;
    pendingTimer = setTimeout(resetPending, 3000);
  }

  function handleRemoveBuild() {
    if (!build.value) {
      return;
    }

    if (!pending.value) {
      startPending();
      return;
    }

    resetPending();
    removeBuild();
  }

  onBeforeUnmount(resetPending);

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

          <UButton
            color="neutral"
            variant="link"
            label="Delete build"
            icon="ph:trash"
            :ui="{
              base: 'px-0 font-normal',
              label: ['transition-colors', pending ? 'text-red-500' : ''],
              leadingIcon: ['transition-colors', pending ? 'text-red-500' : ''],
            }"
            :disabled="!build"
            @click="handleRemoveBuild"
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
            label="All builds"
            icon="ph:list-magnifying-glass"
            to="/3/builds/monstie"
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
