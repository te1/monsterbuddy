<script lang="ts" setup>
  import { getMonstiesByRidingAction, ridingActionsBySlug } from '~/services/2/data';
  import { getRidingActionSeo } from '~/services/2/seo';

  const route = useRoute();
  const ridingAction = ridingActionsBySlug.get(route.params.slug as string);

  if (!ridingAction) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }
  const monsters = computed(() => getMonstiesByRidingAction(ridingAction.name));

  useSeoMeta(getRidingActionSeo(ridingAction, monsters.value.length));
  const headline = gameTypeToFullName('mhst2');

  type Display = 'monstie' | 'egg';
  const display = ref<Display>('monstie');

  const displays = ref<Display[]>(['monstie', 'egg']);

  const nextDisplay = computed(() => {
    const currentIndex = displays.value.indexOf(display.value);
    const nextIndex = (currentIndex + 1) % displays.value.length;

    return displays.value[nextIndex] ?? 'monstie';
  });

  const fabVisible = computed(() => {
    return displays.value.length > 1;
  });

  const fabTitle = computed(() => {
    switch (nextDisplay.value) {
      case 'monstie':
        return 'Show monsties';

      case 'egg':
        return 'Show eggs';

      default:
        return undefined;
    }
  });

  const fabIcon = computed(() => {
    switch (nextDisplay.value) {
      case 'monstie':
        return 'i-lucide-image';

      case 'egg':
        return 'i-lucide-egg';

      default:
        return null;
    }
  });

  function toggleDisplay() {
    display.value = nextDisplay.value;
  }
</script>

<template>
  <div>
    <UPageHeader
      :title="ridingAction.name"
      :description="ridingAction.description"
      :headline="headline"
    />

    <UPageBody>
      <ClientOnly>
        <UTooltip v-if="fabVisible" :text="fabTitle">
          <UButton color="neutral" variant="soft" :icon="fabIcon" @click="toggleDisplay" />
        </UTooltip>
      </ClientOnly>

      <div class="mb-1 flex items-center">
        <UIcon name="i-lucide-dna" class="w-6! text-neutral-500 dark:text-neutral-400" />

        <div class="mb-1 font-semibold">Learnt By</div>
      </div>

      <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <S2MonsterSmartListItem
          v-for="monster in monsters"
          :key="monster.no"
          :monster="monster"
          :display="display"
        />
      </div>
    </UPageBody>
  </div>
</template>
