<script lang="ts" setup>
  const router = useRouter();
  const route = useRoute();
  const hasSidebar = useHasSidebar();

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
  <UTabs v-model="tab" color="neutral" variant="link" :items="tabs">
    <template #view>
      <S3GeneViewOptions />
    </template>

    <template #filter>
      <S3GeneFilter />
    </template>
  </UTabs>
</template>
