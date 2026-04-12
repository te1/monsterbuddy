<script lang="ts" setup>
  import S3RidingActionSidebar from '~/components/s3/S3RidingActionSidebar.vue';
  import { getMonstiesByRidingAction, ridingActionsBySlug } from '~/services/3/data';
  import { getRidingActionSeo } from '~/services/3/seo';
  import useRidingActionDisplays from '~/stores/3/ridingActionDisplays';

  definePageMeta({
    sidebarComponent: S3RidingActionSidebar,
    back: {
      show: true,
      fallback: '/3/riding-actions',
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
  const headline = gameTypeToFullName('mhst3');

  const descriptionParts = computed(() => {
    const part1 = 'This ';
    const part2 = 'riding action';

    let part3 = 'can be learnt by ';

    const monsterCount = monsters.value.length;

    if (monsterCount === 1) {
      part3 += `one monstie.`;
    } else {
      part3 += `${monsterCount} monsties.`;
    }

    return [part1, part2, part3];
  });

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        { name: 'Riding Actions', item: '/3/riding-actions' },
        { name: ridingAction.name },
      ],
    }),
  ]);

  defineOgImage(
    'Title',
    {
      title: ridingAction.name,
      description: headline,
      lines: [
        'Riding Action',
        monsters.value.length === 1
          ? `Learnt By 1 Monstie`
          : `Learnt By ${monsters.value.length} Monsties`,
      ],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );

  const displays = useRidingActionDisplays();

  const eagerCardsCount = 14;

  const monsterItems = computed(() =>
    monsters.value.map((monster, index) => ({
      monster,
      eager: index < eagerCardsCount,
    }))
  );

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
  <div>
    <AppPageHeader
      :title="ridingAction.name"
      :headline="headline"
      :class="{ 'hidden lg:block': !ridingAction.description }"
    >
      <template #description>
        <div v-if="ridingAction.description" v-text="ridingAction.description" />

        <div class="hidden lg:block">
          {{ descriptionParts[0] }}
          <AppNuxtLink to="/3/riding-actions" :text="descriptionParts[1]" />
          {{ descriptionParts[2] }}
        </div>
      </template>
    </AppPageHeader>

    <UPageBody class="-mt-3 lg:mt-0">
      <div class="flex items-center py-1">
        <UIcon name="ph:hash" class="w-6 text-muted" />

        <div class="font-semibold">Learnt By</div>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <S3MonsterSmartListItem
          v-for="item in monsterItems"
          :key="item.monster.slug"
          :monster="item.monster"
          :display="displays.current"
          :eager="item.eager"
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
