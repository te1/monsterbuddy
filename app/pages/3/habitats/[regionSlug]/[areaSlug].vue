<script lang="ts" setup>
  import S3HabitatSidebar from '~/components/s3/S3HabitatSidebar.vue';
  import { areasBySlug, monstersByName, regionsBySlug } from '~/services/3/data';
  import useHabitatDisplays from '~/stores/3/habitatStore';

  definePageMeta({
    sidebarComponent: S3HabitatSidebar,
    back: {
      show: true,
      fallback: '/3/habitats',
    },
    middleware: [
      (to) => {
        const area = areasBySlug.get(to.params.areaSlug as string);
        if (area) {
          to.meta.mobileHeaderTitle = area.name;
        }
      },
    ],
  });

  const route = useRoute();
  const region = regionsBySlug.get(route.params.regionSlug as string);
  const area = areasBySlug.get(route.params.areaSlug as string);

  if (!region || !area) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }

  const displays = useHabitatDisplays();

  const permanent = computed(() =>
    area.permanent
      .map((monsterName) => monstersByName.get(monsterName))
      .filter((monster) => monster != null)
  );

  const feral = computed(() =>
    area.feral
      .map((monsterName) => monstersByName.get(monsterName))
      .filter((monster) => monster != null)
  );

  const invasive = computed(() =>
    area.invasive
      .map((monsterName) => monstersByName.get(monsterName))
      .filter((monster) => monster != null)
  );

  const endangered = computed(() =>
    area.endangered
      .map((monsterName) => monstersByName.get(monsterName))
      .filter((monster) => monster != null)
  );

  const calamitous = computed(() =>
    area.calamitous
      .map((monsterName) => monstersByName.get(monsterName))
      .filter((monster) => monster != null)
  );

  const monsterGroups = computed(() => [
    { key: 'Permanent', monsters: permanent.value, eager: true },
    { key: 'Feral', monsters: feral.value, eager: true },
    { key: 'Invasive', monsters: invasive.value, eager: true },
    { key: 'Endangered', monsters: endangered.value, eager: true },
    { key: 'Calamitous', monsters: calamitous.value, eager: true },
  ]);

  const monsterCount = computed(() => {
    const all = [
      ...permanent.value,
      ...feral.value,
      ...invasive.value,
      ...endangered.value,
      ...calamitous.value,
    ];

    return new Set(all.map((monster) => monster.slug)).size;
  });

  // TODO useSeoMeta
  const headline = gameTypeToFullName('mhst3');

  const descriptionParts = computed(() => {
    const part1 = `This area is part of `;
    const part2 = region.name;
    const part3 = ` and home to ${monsterCount.value} monsters`;

    return [part1, part2, part3];
  });

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: 'Habitats', item: '/3/habitats' },
        { name: region.name, item: `/3/habitats/${region.slug}` },
        { name: area.name },
      ],
    }),
  ]);

  // TODO defineOgImage

  const fabDisplayVisible = computed(() => displays.all.length > 1);

  const fabDisplayTooltip = computed(() => {
    switch (displays.next) {
      case 'monster':
        return 'Show monsters';

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
      case 'monster':
        return 'ph:book-open';

      case 'monstie':
        return 'ph:note';

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
    <AppPageHeader :title="area.name" :headline="headline">
      <template #description>
        {{ descriptionParts[0] }}
        <AppNuxtLink :to="`/3/habitats/${region.slug}`" :text="descriptionParts[1]" />
        {{ descriptionParts[2] }}
      </template>
    </AppPageHeader>

    <UPageBody class="flex flex-col gap-3">
      <section class="flex items-center gap-1">
        <ElementIcon class="size-8" :element="area.element" />
        <ElementLabel class="min-w-32 font-medium" :element="area.element" />

        <h2 class="font-semibold">Area Element</h2>
      </section>

      <ul class="flex flex-col gap-3">
        <template v-for="group in monsterGroups" :key="group.key">
          <li v-if="group.monsters.length > 0">
            <div
              class="sticky top-(--ui-header-height) z-10 -mx-1 flex items-center bg-elevated/90 p-1 backdrop-blur dark:bg-muted/90"
            >
              <UIcon name="ph:dna" class="w-6 text-muted" />

              <h2 class="font-semibold" v-text="group.key" />
            </div>

            <div class="grid gap-3 md:grid-cols-2">
              <S3MonsterSmartListItem
                v-for="monster in group.monsters"
                :key="monster.slug"
                :monster="monster"
                :display="displays.current"
                :eager="group.eager"
              />
            </div>
          </li>
        </template>
      </ul>
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
