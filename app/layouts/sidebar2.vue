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

  const maxItems = 15;

  const recent = computed(() => {
    const items = wantsMonsties.value ? history.recentMonsties : history.recentMonsters;

    return take(items, maxItems);
  });

  const pinned = computed(() => {
    const items = wantsEggs.value
      ? history.pinnedEggs
      : wantsMonsties.value
        ? history.pinnedMonsties
        : history.pinnedMonsters;

    return take(items, maxItems);
  });

  const tabs = [
    {
      label: 'Recent',
      slot: 'recent',
    },
    {
      label: 'Bookmarked',
      slot: 'pinned',
    },
  ];
</script>

<template>
  <UContainer>
    <UPage>
      <slot />

      <template #right>
        <UPageAside class="overflow-y-hidden">
          <UTabs
            color="neutral"
            variant="link"
            :items="tabs"
            :ui="{ list: 'gap-4', trigger: 'px-0 py-0' }"
          >
            <template #recent>
              <div class="mt-1 flex flex-col gap-1 xl:mt-2 xl:gap-2">
                <ClientOnly>
                  <S2MonsterMiniListItem
                    v-for="monster in recent"
                    :key="monster.slug"
                    :monster="monster"
                    :showEgg="wantsEggs"
                  />

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
              <div class="mt-1 flex flex-col gap-1 xl:mt-2 xl:gap-2">
                <ClientOnly>
                  <S2MonsterMiniListItem
                    v-for="monster in pinned"
                    :key="monster.slug"
                    :monster="monster"
                    :showEgg="wantsEggs"
                  />
                </ClientOnly>
              </div>
            </template>
          </UTabs>
        </UPageAside>
      </template>
    </UPage>
  </UContainer>
</template>
