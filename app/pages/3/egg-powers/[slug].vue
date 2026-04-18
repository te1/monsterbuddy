<script lang="ts" setup>
  // import S3HabitatSidebar from '~/components/s3/S3HabitatSidebar.vue';
  import { eggPowersBySlug, regionsByName } from '~/services/3/data';
  import { getEggPowerSeo } from '~/services/3/seo';

  definePageMeta({
    // sidebarComponent: S3HabitatSidebar,
    back: {
      show: true,
      fallback: '/3/egg-powers',
    },
    middleware: [
      (to) => {
        const eggPower = eggPowersBySlug.get(to.params.slug as string);
        if (eggPower) {
          to.meta.mobileHeaderTitle = eggPower.name;
        }
      },
    ],
  });

  const route = useRoute();
  const eggPower = eggPowersBySlug.get(route.params.slug as string);

  if (!eggPower) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }

  useSeoMeta(getEggPowerSeo(eggPower));
  const headline = gameTypeToFullName('mhst3');

  const fullName = computed(() => `Egg Power: ${eggPower.name}`);

  const descriptionParts = computed(() => {
    const part1 = `This ${eggPower.rank} rank `;
    const part2 = 'egg power';
    const part3 = ' can be found in ';
    const part4 = eggPower.region;

    return [part1, part2, part3, part4];
  });

  const region = computed(() => regionsByName.get(eggPower.region));

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: 'Egg Powers', item: '/3/egg-powers' },
        { name: fullName.value },
      ],
    }),
  ]);

  defineOgImage(
    'Title',
    {
      title: fullName.value,
      description: headline,
      lines: [`Rank ${eggPower.rank}`, eggPower.region],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );
</script>

<template>
  <div>
    <AppPageHeader :title="fullName" :headline="headline">
      <template #description>
        {{ descriptionParts[0] }}
        <AppNuxtLink to="/3/egg-powers" :text="descriptionParts[1]" />
        {{ descriptionParts[2] }}
        <AppNuxtLink :to="`/3/habitats/${region?.slug ?? ''}`" :text="descriptionParts[3]" />
      </template>
    </AppPageHeader>

    <UPageBody> CONTENT </UPageBody>
  </div>
</template>
