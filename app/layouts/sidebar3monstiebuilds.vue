<script lang="ts" setup>
  import mhst3Egg from '~/assets/3/monsterbuddy.avif';
  import { take } from 'es-toolkit/array';
  import useMonstieBuildHistoryStore from '~/stores/3/monstieBuildHistoryStore';

  const route = useRoute();
  const history = useMonstieBuildHistoryStore();

  const maxItems = 12;
  const topRecent = computed(() => take(history.recentBuilds, maxItems));
  const topPinned = computed(() => take(history.pinnedBuilds, maxItems));

  const moreRecent = computed(() => Math.max(0, history.recentBuilds.length - maxItems));
  const morePinned = computed(() => Math.max(0, history.pinnedBuilds.length - maxItems));

  const tabs = [
    { label: 'Recent', slot: 'recent' },
    { label: 'Bookmarks', slot: 'pinned' },
  ];

  const sidebarComponent = computed(() => {
    const component = route.meta.sidebarComponent;
    return component ? toRaw(component) : undefined;
  });

  onMounted(() => {
    history.subscribe();
  });

  onUnmounted(() => {
    history.unsubscribe();
  });
</script>

<template>
  <UContainer>
    <UPage class="mt-0" :ui="{ center: 'pt-3' }">
      <slot />

      <template #right>
        <LazyUPageAside
          class="scrollbar-hide"
          :ui="{ container: 'flex flex-col gap-4' }"
          hydrateOnIdle
        >
          <component :is="sidebarComponent" v-if="sidebarComponent" />

          <UTabs color="neutral" variant="link" :items="tabs">
            <template #recent>
              <div class="flex flex-col gap-1 text-muted xl:gap-2">
                <ClientOnly>
                  <div v-if="topRecent.length <= 0">No recent builds</div>

                  <S3MonstieBuildMiniListItem
                    v-for="build in topRecent"
                    :key="build.id"
                    :build="build"
                  />

                  <NuxtLink
                    v-if="moreRecent > 0"
                    to="/3/builds/monstie?source=recent"
                    prefetchOn="interaction"
                    class="ml-0 max-w-max hover:text-default xl:ml-12"
                  >
                    And {{ moreRecent }} more
                  </NuxtLink>

                  <template #fallback>
                    <div v-for="i in 7" :key="i" class="flex items-center gap-3">
                      <USkeleton class="hidden h-9 w-9 rounded-full xl:block" />
                      <USkeleton class="my-1 h-4 w-[80%] xl:w-[calc(80%-3rem)]" />
                    </div>
                  </template>
                </ClientOnly>
              </div>
            </template>

            <template #pinned>
              <div class="flex flex-col gap-1 text-muted xl:gap-2">
                <ClientOnly>
                  <div v-if="topPinned.length <= 0">No bookmarked builds</div>

                  <S3MonstieBuildMiniListItem
                    v-for="build in topPinned"
                    :key="build.id"
                    :build="build"
                    removeable
                    @remove="history.togglePinnedBuild(build.id)"
                  />

                  <NuxtLink
                    v-if="morePinned > 0"
                    to="/3/builds/monstie?source=pinned"
                    prefetchOn="interaction"
                    class="ml-0 max-w-max hover:text-default xl:ml-12"
                  >
                    And {{ morePinned }} more
                  </NuxtLink>
                </ClientOnly>
              </div>
            </template>
          </UTabs>
        </LazyUPageAside>
      </template>
    </UPage>

    <div
      class="pointer-events-none fixed right-[calc(-154px+var(--scrollbar-width,0))] bottom-[-154px] -z-10 size-[448px] -rotate-23 overflow-hidden opacity-10 select-none lg:right-[calc(-192px+var(--scrollbar-width,0))] lg:bottom-[-192px] lg:opacity-50 dark:opacity-5 dark:lg:opacity-25"
    >
      <div class="size-full bg-cover bg-center" :style="`background-image: url(${mhst3Egg})`" />
    </div>
  </UContainer>
</template>
