<script lang="ts" setup>
  import useMonsterFilter, { modes } from '~/stores/3/monsterFilter';
  import useMonsterSources from '~/stores/3/monsterSources';

  const router = useRouter();
  const route = useRoute();
  const hasSidebar = useHasSidebar();

  const filter = useMonsterFilter();
  const sources = useMonsterSources();

  const tab = ref<'view' | 'filter'>('view');

  const tabs = [
    { label: 'View', slot: 'view', value: 'view' },
    { label: 'Filter', slot: 'filter', value: 'filter' },
  ];

  // update tab from query string
  watch(
    [() => route.query.filter, hasSidebar],
    ([filterQuery, hasSidebarNow]) => {
      if (filterQuery === undefined || !hasSidebarNow) {
        return; // without sidebar filter triggers a drawer instead
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
  <LazyUTabs v-model="tab" color="neutral" variant="link" :items="tabs" hydrateOnIdle>
    <template #view>
      <S3MonsterViewOptions :filter="filter" :sources="sources" :modes="modes" />
    </template>

    <template #filter>
      <S3MonsterFilter :filter="filter" :sources="sources" showHatchableFilter />
    </template>
  </LazyUTabs>
</template>
