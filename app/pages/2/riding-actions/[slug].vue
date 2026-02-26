<script lang="ts" setup>
  import { getMonstiesByRidingAction, ridingActionsBySlug } from '~/services/2/data';
  import { getRidingActionSeo } from '~/services/2/seo';

  const route = useRoute();
  const ridingAction = ridingActionsBySlug.get(route.params.slug as string);

  if (!ridingAction) {
    throw createError({ status: 404, statusText: 'Page Not Found' });
  }
  const monsters = computed(() => getMonstiesByRidingAction(ridingAction.name));

  useSeoMeta(getRidingActionSeo(ridingAction, monsters.value));

  const headline = gameTypeToFullName('mhst2');

  const display: Ref<string | undefined> = ref(undefined);
</script>

<template>
  <div>
    <UPageHeader
      :title="ridingAction.name"
      :description="ridingAction.description"
      :headline="headline"
    />

    <UPageBody>
      <div class="mb-1 flex items-center">
        <!-- <FaIcon class="dark:text-neutral-400 w-6! text-neutral-500" :icon="['fas', 'dna']" /> -->

        <div class="mb-1 font-semibold">Learnt By</div>
      </div>

      <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
