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
  <div>
    <AppPageHeader
      title="Catavan Stands"
      description="Fast travel locations and monsters you can find nearby"
      :headline="headline"
    />

    <UPageBody>
      <ul class="flex flex-col gap-3">
        <li v-for="(stands, zone) in catavanStands" :key="zone">
          <div
            class="sticky top-(--ui-header-height) z-10 -mx-1 flex items-center bg-elevated/90 p-1 backdrop-blur dark:bg-muted/90"
          >
            <UIcon name="ph:map-pin-fill" class="w-6 text-dimmed" />

            <div class="font-medium">
              {{ zone }}
            </div>
          </div>

          <div class="box overflow-hidden">
            <div v-for="(catavanStand, index) in stands" :key="catavanStand.slug">
              <div
                v-if="index > 0"
                class="border-2 border-t border-neutral-100 dark:border-default"
              />

              <NuxtLink
                :to="`/2/catavan-stands/${catavanStand.slug}`"
                class="box-link block px-6 py-2"
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
