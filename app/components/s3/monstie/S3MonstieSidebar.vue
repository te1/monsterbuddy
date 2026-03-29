<script lang="ts" setup>
  import useMonstieFilter, { modes } from '~/stores/3/monstieFilter';
  import useMonstieSources from '~/stores/3/monstieSources';

  const router = useRouter();
  const route = useRoute();
  const hasSidebar = useHasSidebar();

  const filter = useMonstieFilter();
  const sources = useMonstieSources();

  const tab = ref<'view' | 'filter'>('view');

  const tabs = [
    { label: 'View', slot: 'view', value: 'view' },
    { label: 'Filter', slot: 'filter', value: 'filter' },
  ];

  // update tab from query string
  watch(
    [() => route.query.filter, hasSidebar],
    ([filter, hasSidebar]) => {
      if (filter === undefined || !hasSidebar) {
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
  <UTabs v-model="tab" color="neutral" variant="link" :items="tabs">
    <template #view>
      <S3MonsterViewOptions :filter="filter" :sources="sources" :modes="modes" showSortByStats />
    </template>

    <template #filter>
      <S3MonsterFilter
        :filter="filter"
        :sources="sources"
        showAttackTypeFilter
        showAttackElementFilter
        showRidingActionFilter
        showEndangeredFilter
        showMutationFilter
        showDeviantFilter
      />
    </template>
  </UTabs>
</template>
