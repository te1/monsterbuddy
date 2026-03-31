<script lang="ts" setup>
  import S3HabitatSidebar from '~/components/s3/S3HabitatSidebar.vue';
  import { monstersByName, regionsBySlug } from '~/services/3/data';
  import { getRegionSeo } from '~/services/3/seo';
  import { statsTypeToText } from '~/services/3/presentation';
  import useHabitatDisplays from '~/stores/3/habitatStore';

  definePageMeta({
    sidebarComponent: S3HabitatSidebar,
    back: {
      show: true,
      fallback: '/3/habitats',
    },
    middleware: [
      (to) => {
        const region = regionsBySlug.get(to.params.regionSlug as string);
        if (region) {
          to.meta.mobileHeaderTitle = region.name;
        }
      },
    ],
  });

  const route = useRoute();
  const region = regionsBySlug.get(route.params.regionSlug as string);

  if (!region) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }

  const displays = useHabitatDisplays();

  const permanent = computed(() =>
    region.monsters.permanent
      .map((monsterName) => monstersByName.get(monsterName))
      .filter((monster) => monster != null)
  );

  const world = computed(() =>
    region.monsters.world
      .map((monsterName) => monstersByName.get(monsterName))
      .filter((monster) => monster != null)
  );

  const feral = computed(() =>
    region.monsters.feral
      .map((monsterName) => monstersByName.get(monsterName))
      .filter((monster) => monster != null)
  );

  const invasive = computed(() =>
    region.monsters.invasive
      .map((monsterName) => monstersByName.get(monsterName))
      .filter((monster) => monster != null)
  );

  const endangered = computed(() =>
    region.monsters.endangered
      .map((monsterName) => monstersByName.get(monsterName))
      .filter((monster) => monster != null)
  );

  const calamitous = computed(() =>
    region.monsters.calamitous
      .map((monsterName) => monstersByName.get(monsterName))
      .filter((monster) => monster != null)
  );

  const monsterGroups = computed(() => [
    { key: 'Permanent Habitat', monsters: permanent.value, eager: true },
    { key: 'World Spawn', monsters: world.value, eager: true },
    { key: 'Feral Monster', monsters: feral.value, eager: true },
    { key: 'Invasive Monster', monsters: invasive.value, eager: true },
    { key: 'Endangered Species', monsters: endangered.value, eager: true },
    { key: 'Calamitous Elder Dragon', monsters: calamitous.value, eager: true },
  ]);

  const monsterCount = computed(() => {
    const all = [
      ...permanent.value,
      ...world.value,
      ...feral.value,
      ...invasive.value,
      ...endangered.value,
      ...calamitous.value,
    ];

    return new Set(all.map((monster) => monster.slug)).size;
  });

  useSeoMeta(getRegionSeo(region, monsterCount.value));
  const headline = gameTypeToFullName('mhst3');

  const descriptionParts = computed(() => {
    const part1 = `This `;
    const part2 = 'region';
    const part3 = ` is home to ${monsterCount.value} monsters`;

    return [part1, part2, part3];
  });

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: 'Habitats', item: '/3/habitats' },
        { name: region.name },
      ],
    }),
  ]);

  defineOgImage(
    'Title',
    {
      title: region.name,
      description: headline,
      lines: [`${region.areas.length} Areas`, `${monsterCount.value} Monsters`],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );

  const mode = computed(() => {
    switch (displays.current) {
      case 'monster':
        return 'combat';

      default:
        return 'location';
    }
  });

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
    <AppPageHeader :title="region.name" :headline="headline">
      <template #description>
        {{ descriptionParts[0] }}
        <AppNuxtLink to="/3/habitats" :text="descriptionParts[1]" />
        {{ descriptionParts[2] }}
      </template>
    </AppPageHeader>

    <UPageBody class="@container flex flex-col gap-3">
      <section class="grid gap-3 @xs:grid-cols-2 @lg:grid-cols-3 @xl:w-fit @xl:gap-12">
        <div class="flex w-fit flex-col gap-1.5">
          <h3 class="text-lg font-semibold">Egg Powers</h3>

          <ul class="flex flex-col gap-1">
            <li
              v-for="(skill, rank) in region.powers.skills"
              :key="skill"
              class="flex items-center gap-1.5"
            >
              <span
                class="flex size-7 items-center justify-center rounded bg-default text-sm font-semibold text-muted"
                v-text="rank"
              />
              <span v-text="skill" />
            </li>
          </ul>
        </div>

        <div class="flex w-fit flex-col">
          <h3 class="text-lg font-semibold">Stat Increases</h3>

          <ul class="flex flex-col gap-1">
            <li v-for="stat in region.powers.stats" :key="stat">
              {{ statsTypeToText(stat) }}
            </li>
          </ul>
        </div>

        <div class="flex w-fit flex-col gap-0.5">
          <h3 class="text-lg font-semibold">Areas</h3>

          <ul class="flex flex-col gap-2">
            <li v-for="area in region.areas" :key="area.name" class="flex items-center gap-1">
              <ElementIcon :element="area.element" class="-ml-1 size-6" />

              <AppNuxtLink :to="`/3/habitats/${region.slug}/${area.slug}`" prefetchOn="interaction">
                {{ area.name }}
              </AppNuxtLink>
            </li>
          </ul>
        </div>
      </section>

      <ul class="flex flex-col gap-3">
        <template v-for="group in monsterGroups" :key="group.key">
          <li v-if="group.monsters.length > 0">
            <div
              class="sticky top-(--ui-header-height) z-10 -mx-1 flex items-center bg-elevated/90 p-1 backdrop-blur dark:bg-muted/90"
            >
              <UIcon name="ph:hash" class="w-6 text-muted" />

              <h2 class="font-semibold" v-text="group.key" />
            </div>

            <div class="grid gap-3 md:grid-cols-2">
              <S3MonsterSmartListItem
                v-for="monster in group.monsters"
                :key="monster.slug"
                :monster="monster"
                :display="displays.current"
                :mode="mode"
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
