<script lang="ts" setup>
  import S2RidingActionSidebar from '~/components/s2/S2RidingActionSidebar.vue';
  import { getMonstiesByRidingAction, ridingActionsBySlug } from '~/services/2/data';
  import { getRidingActionSeo } from '~/services/2/seo';
  import useRidingActionDisplays from '~/stores/2/ridingActionDisplays';

  definePageMeta({
    sidebarComponent: S2RidingActionSidebar,
    back: {
      show: true,
      fallback: '/2/riding-actions',
    },
    middleware: [
      (to) => {
        const ridingAction = ridingActionsBySlug.get(to.params.slug as string);
        if (ridingAction) {
          to.meta.mobileHeaderTitle = ridingAction.name;
        }
      },
    ],
  });

  const route = useRoute();
  const ridingAction = ridingActionsBySlug.get(route.params.slug as string);

  if (!ridingAction) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }
  const monsters = computed(() => getMonstiesByRidingAction(ridingAction.name));

  useSeoMeta(getRidingActionSeo(ridingAction, monsters.value.length));
  const headline = gameTypeToFullName('mhst2');

  const descriptionParts = computed(() => {
    const part1 = 'This ';
    const part2 = 'riding action';

    let part3 = 'can be learnt by ';

    const monsterCount = monsters.value.length;

    if (monsterCount === 1) {
      part3 += `one monster.`;
    } else {
      part3 += `${monsterCount} different monsters.`;
    }

    return [part1, part2, part3];
  });

  const displays = useRidingActionDisplays();

  const fabDisplayVisible = computed(() => displays.all.length > 1);

  const fabDisplayTooltip = computed(() => {
    switch (displays.next) {
      case 'monstie':
        return 'Show monsties';

      case 'egg':
        return 'Show eggs';

      default:
        return undefined;
    }
  });

  const fabDisplayIcon = computed(() => {
    switch (displays.next) {
      case 'monstie':
        return 'ph:book-open';

      case 'egg':
        return 'ph:egg';

      default:
        return undefined;
    }
  });

  function toggleDisplay() {
    displays.setCurrent(displays.next);
  }
</script>

<template>
  <!-- TODO CSS -->

  <div>
    <UPageHeader
      :title="ridingAction.name"
      :headline="headline"
      :ui="{ headline: 'hidden lg:flex', title: 'hidden lg:flex' }"
    >
      <template #description>
        {{ ridingAction.description }}

        <div class="hidden lg:block">
          {{ descriptionParts[0] }}
          <AppNuxtLink to="/2/riding-actions">{{ descriptionParts[1] }}</AppNuxtLink>
          {{ descriptionParts[2] }}
        </div>
      </template>
    </UPageHeader>

    <UPageBody>
      <div class="mb-1 flex items-center">
        <UIcon name="ph:dna" class="w-6! text-neutral-500 dark:text-neutral-400" />

        <div class="mb-1 font-semibold">Learnt By</div>
      </div>

      <div class="mt-1 grid gap-3 md:grid-cols-2">
        <S2MonsterSmartListItem
          v-for="monster in monsters"
          :key="monster.no"
          :monster="monster"
          :display="displays.current"
        />
      </div>
    </UPageBody>

    <ClientOnly>
      <AppFabPanel>
        <AppFab
          v-if="fabDisplayVisible"
          :tooltip="fabDisplayTooltip"
          :icon="fabDisplayIcon"
          @click="toggleDisplay"
        />
      </AppFabPanel>
    </ClientOnly>
  </div>
</template>
