<script lang="ts" setup>
  import useMonsterFilter, { modes } from '~/stores/2/monsterFilter';
  import useMonsterSources from '~/stores/2/monsterSources';

  const router = useRouter();
  const route = useRoute();
  const isMobile = useIsMobile();

  const filter = useMonsterFilter();
  const sources = useMonsterSources();

  const tab = ref<'view' | 'filter'>('view');

  const tabs = [
    { label: 'View', slot: 'view', value: 'view' },
    { label: 'Filter', slot: 'filter', value: 'filter' },
  ];

  // update tab from query string
  watch(
    [() => route.query.filter, isMobile],
    ([filter, isMobile]) => {
      if (filter === undefined || isMobile) {
        return; // on mobile filter triggers a drawer instead
      }

      tab.value = 'filter';

      const { filter: _filter, ...query } = route.query;
      router.replace({
        path: route.path,
        query,
      });
    },
    { immediate: true }
  );
</script>

<template>
  <UTabs v-model="tab" color="neutral" variant="link" :items="tabs">
    <template #view>
      <S2MonsterViewOptions :filter="filter" :sources="sources" :modes="modes" />
    </template>

    <template #filter>
      <S2MonsterFilter
        :filter="filter"
        :sources="sources"
        showHabitatFilter
        showCatavanFilter
        showEldersLairFilter
        showHatchableFilter
      />
    </template>
  </UTabs>
</template>
