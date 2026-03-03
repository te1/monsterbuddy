<script lang="ts" setup>
  import { take } from 'es-toolkit/array';
  import useHistoryStore from '~/stores/2/historyStore';

  const history = useHistoryStore();

  const wantsMonsties = computed(() => {
    const path = useRoute().path;

    const onlyWantsMonsties =
      path.startsWith('/2/monsties') ||
      path.startsWith('/2/eggs') ||
      path.startsWith('/2/riding-actions');

    const sometimesWantsMonsties =
      path.startsWith('/2/monsters/') &&
      (history.lastList === 'monsties' || history.lastList === 'eggs');

    return onlyWantsMonsties || sometimesWantsMonsties;
  });

  const wantsEggs = computed(() => {
    const path = useRoute().path;

    const onlyWantsEggs = path.startsWith('/2/eggs');

    const sometimesWantsEggs = path.startsWith('/2/monsters/') && history.lastList === 'eggs';

    return onlyWantsEggs || sometimesWantsEggs;
  });

  const recent = computed(() => {
    return wantsMonsties.value ? history.recentMonsties : history.recentMonsters;
  });
  const pinned = computed(() => {
    return wantsEggs.value
      ? history.pinnedEggs
      : wantsMonsties.value
        ? history.pinnedMonsties
        : history.pinnedMonsters;
  });

  const maxItems = 15;
  const topRecent = computed(() => take(recent.value, maxItems));
  const topPinned = computed(() => take(pinned.value, maxItems));

  const moreRecent = computed(() => Math.max(0, recent.value.length - maxItems));
  const morePinned = computed(() => Math.max(0, pinned.value.length - maxItems));

  const listLink = computed(() => {
    return wantsEggs.value ? '/2/eggs' : wantsMonsties.value ? '/2/monsties' : '/2/monsters';
  });

  const type = computed(() => {
    return wantsEggs.value ? 'eggs' : wantsMonsties.value ? 'monsties' : 'monsters';
  });

  function removePinned(slug: string) {
    if (wantsEggs.value) {
      history.togglePinnedEgg(slug);
    } else if (wantsMonsties.value) {
      history.togglePinnedMonstie(slug);
    } else {
      history.togglePinnedMonster(slug);
    }
  }

  const tabs = [
    { label: 'Recent', slot: 'recent' },
    { label: 'Bookmarked', slot: 'pinned' },
  ];
</script>

<template>
  <UContainer>
    <UPage>
      <slot />

      <template #right>
        <UPageAside class="scrollbar-hide">
          <UTabs
            color="neutral"
            variant="link"
            :items="tabs"
            :ui="{ list: 'gap-4', trigger: 'px-0 py-0' }"
          >
            <template #recent>
              <div class="mt-1 flex flex-col gap-1 text-muted xl:mt-2 xl:gap-2">
                <ClientOnly>
                  <div v-if="topRecent.length <= 0" class="px-1">No recent {{ type }}</div>

                  <S2MonsterMiniListItem
                    v-for="monster in topRecent"
                    :key="monster.slug"
                    :monster="monster"
                    :showEgg="wantsEggs"
                  />

                  <NuxtLink
                    v-if="moreRecent > 0"
                    :to="`${listLink}?display=recent`"
                    class="ml-0 max-w-max px-1 hover:text-default xl:ml-12"
                  >
                    And {{ moreRecent }} more
                  </NuxtLink>

                  <template #fallback>
                    <div v-for="i in 7" :key="i" class="flex items-center gap-3 px-1">
                      <USkeleton class="hidden h-9 w-9 rounded-full xl:block" />
                      <USkeleton class="my-1 h-4 w-[80%]" />
                    </div>
                  </template>
                </ClientOnly>
              </div>
            </template>

            <template #pinned>
              <div class="mt-1 flex flex-col gap-1 text-muted xl:mt-2 xl:gap-2">
                <ClientOnly>
                  <div v-if="topPinned.length <= 0" class="px-1">No bookmarked {{ type }}</div>

                  <S2MonsterMiniListItem
                    v-for="monster in topPinned"
                    :key="monster.slug"
                    :monster="monster"
                    :showEgg="wantsEggs"
                    removeable
                    @remove="removePinned(monster.slug)"
                  />

                  <NuxtLink
                    v-if="morePinned > 0"
                    :to="`${listLink}?display=pinned`"
                    class="ml-0 max-w-max px-1 hover:text-default xl:ml-12"
                  >
                    And {{ morePinned }} more
                  </NuxtLink>
                </ClientOnly>
              </div>
            </template>
          </UTabs>
        </UPageAside>
      </template>
    </UPage>
  </UContainer>
</template>
