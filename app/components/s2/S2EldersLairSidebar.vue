<script lang="ts" setup>
  import useEldersLairFilter, { modes } from '~/stores/2/eldersLairFilter';

  const router = useRouter();
  const route = useRoute();
  const isMobile = useIsMobile();

  const filter = useEldersLairFilter();

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
      <S2MonsterViewOptions :filter="filter" :modes="modes" hideSort />
    </template>

    <template #filter>
      <S2MonsterFilter :filter="filter" showEldersLairFilter showHatchableFilter />
    </template>
  </UTabs>
</template>
