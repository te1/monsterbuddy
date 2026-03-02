<script lang="ts" setup>
  import { take } from 'es-toolkit/array';
  import useHistoryStore from '~/stores/2/historyStore';

  const history = useHistoryStore(); // TODO handle this for 1/3 based on game type
  // TODO switch between monsters/monsties based on current page

  const recent = computed(() => {
    return take(history.recentMonsters, 15);
  });

  const pinned = computed(() => {
    return take(history.pinnedMonsters, 15);
  });

  const tabs = [
    {
      label: 'Recent',
      // icon: 'i-lucide-clock',
      slot: 'recent',
    },
    {
      label: 'Bookmarked',
      // icon: 'i-lucide-bookmark',
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
