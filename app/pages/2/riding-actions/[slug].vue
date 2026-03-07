<script lang="ts" setup>
  import S2RidingActionSidebar from '~/components/s2/S2RidingActionSidebar.vue';
  import { getMonstiesByRidingAction, ridingActionsBySlug } from '~/services/2/data';
  import { getRidingActionSeo } from '~/services/2/seo';
  import useRidingActionDisplays from '~/stores/2/ridingActionDisplays';

  definePageMeta({
    sidebarComponent: S2RidingActionSidebar,
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

  const fabVisible = computed(() => displays.all.length > 1);

  const fabTitle = computed(() => {
    switch (displays.next) {
      case 'monstie':
        return 'Show monsties';

      case 'egg':
        return 'Show eggs';

      default:
        return undefined;
    }
  });

  const fabIcon = computed(() => {
    switch (displays.next) {
      case 'monstie':
        return 'ph:image-square';

      case 'egg':
        return 'ph:egg';

      default:
        return null;
    }
  });

  function toggleDisplay() {
    displays.setCurrent(displays.next);
  }
</script>

<template>
  <!-- TODO CSS -->

  <div>
    <UPageHeader :title="ridingAction.name" :headline="headline">
      <template #description>
        {{ ridingAction.description }}
        <br />

        {{ descriptionParts[0] }}
        <AppNuxtLink to="/2/riding-actions">{{ descriptionParts[1] }}</AppNuxtLink>
        {{ descriptionParts[2] }}
      </template>
    </UPageHeader>

    <UPageBody>
      <ClientOnly>
        <UTooltip v-if="fabVisible" :text="fabTitle">
          <UButton color="neutral" variant="soft" :icon="fabIcon" @click="toggleDisplay" />
        </UTooltip>
      </ClientOnly>

      <div class="mb-1 flex items-center">
        <UIcon name="ph:dna" class="w-6! text-neutral-500 dark:text-neutral-400" />

        <div class="mb-1 font-semibold">Learnt By</div>
      </div>

      <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <S2MonsterSmartListItem
          v-for="monster in monsters"
          :key="monster.no"
          :monster="monster"
          :display="displays.current"
        />
      </div>
    </UPageBody>
  </div>
</template>
