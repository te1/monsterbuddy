<script lang="ts" setup>
  import { groupBy } from 'es-toolkit/array';
  import { catavanStands as catavanStands_ } from '~/services/2/data';

  definePageMeta({
    mobileHeaderTitle: 'Catavan Stands',
  });

  useSeoMeta({
    title: `Catavan Stand Fast Travel List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      'Overview of catavan stand fast travel locations and list of monsters you will find there',
  });
  const headline = gameTypeToFullName('mhst2');

  const catavanStands = groupBy(catavanStands_, (catavanStand) => catavanStand.zone);
</script>

<template>
  <!-- TODO CSS -->

  <div>
    <AppPageHeader
      title="Catavan Stands"
      description="Fast travel locations and monsters you can find nearby"
      :headline="headline"
    />

    <UPageBody>
      <ul class="space-y-8">
        <li v-for="(stands, zone) in catavanStands" :key="zone">
          <div
            class="sticky top-12 z-10 -mx-1 -mt-3 -mb-1 flex items-center border-t border-neutral-300 bg-neutral-300 px-1 py-1 dark:border-neutral-700 dark:bg-neutral-700"
          >
            <UIcon name="ph:map-pin-fill" class="w-6! text-neutral-500 dark:text-neutral-400" />

            <div class="mb-1 font-semibold">
              {{ zone }}
            </div>
          </div>

          <div class="box mt-1 overflow-hidden">
            <div v-for="(catavanStand, index) in stands" :key="catavanStand.slug">
              <div v-if="index > 0" class="border-t border-neutral-300 dark:border-neutral-600" />

              <NuxtLink
                :to="`/2/catavan-stands/${catavanStand.slug}`"
                class="box-link block px-6 py-2 font-semibold"
              >
                {{ catavanStand.name }}
              </NuxtLink>
            </div>
          </div>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
