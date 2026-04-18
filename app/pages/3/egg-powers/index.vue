<script lang="ts" setup>
  import { groupBy } from 'es-toolkit/array';
  import { eggPowers } from '~/services/3/data';

  useSeoMeta({
    title: `Egg Powers In ${gameTypeToFullLabel('mhst3')}`,
    description: 'Overview of egg powers and regions where you can find them',
  });
  const headline = gameTypeToFullName('mhst3');

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: [
        //
        { name: gameTypeToShortLabel('mhst3'), item: '/3' },
        { name: 'Egg Powers' },
      ],
    }),
  ]);

  defineOgImage(
    'Title',
    {
      title: 'Egg Powers',
      description: headline,
      lines: ['Regions', 'Ranks', 'Effects'],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );

  const groups = groupBy(eggPowers, (eggPower) => eggPower.region);
</script>

<template>
  <div>
    <AppPageHeader
      title="Egg Powers"
      description="All egg powers and regions where you can find them"
      :headline="headline"
    />

    <UPageBody>
      <ul class="flex flex-col gap-3">
        <li v-for="(group, key) in groups" :key="key">
          <div
            class="sticky top-(--ui-header-height) z-10 -mx-1 flex items-center bg-elevated/90 p-1 backdrop-blur dark:bg-muted/90"
          >
            <UIcon name="ph:map-pin-fill" class="w-6 text-dimmed" />

            <div class="font-semibold" v-text="key" />
          </div>

          <div class="grid gap-3 md:grid-cols-2">
            <NuxtLink
              v-for="eggPower in group"
              :key="eggPower.slug"
              :to="`/3/egg-powers/${eggPower.slug}`"
              prefetchOn="interaction"
            >
              <S3EggPowerListItem
                :eggPower="eggPower"
                class="box box-link overflow-hidden px-1 [contain-intrinsic-size:74px] [content-visibility:auto]"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
