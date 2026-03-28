<script lang="ts" setup>
  import useEggsDisplay from '~/stores/3/eggDisplays';
  import useEggFilter, { modes } from '~/stores/3/eggFilter';
  import useEggSources from '~/stores/3/eggSources';

  const router = useRouter();
  const route = useRoute();
  const hasSidebar = useHasSidebar();

  const displays = useEggsDisplay();
  const filter = useEggFilter();
  const sources = useEggSources();

  const tab = ref<'view' | 'filter'>('view');

  const disableSortingAndFiltering = computed(() => {
    return displays.current === 'egg';
  });

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

  // switch to source: all when entering egg finder
  watch(
    () => displays.current,
    (newValue) => {
      if (newValue === 'egg') {
        sources.setCurrent('default', filter);
      }
    }
  );

  // turn off egg finder when switching sources
  watch(
    () => sources.current,
    (newValue) => {
      if (newValue !== 'default') {
        displays.setCurrent('monstie');
      }
    }
  );
</script>

<template>
  <LazyUTabs v-model="tab" color="neutral" variant="link" :items="tabs" hydrateOnIdle>
    <template #view>
      <S3MonsterViewOptions
        :displays="displays"
        :filter="filter"
        :sources="sources"
        :modes="modes"
        :disabled="disableSortingAndFiltering"
      />
    </template>

    <template #filter>
      <S3MonsterFilter
        :displays="displays"
        :filter="filter"
        :sources="sources"
        :disabled="disableSortingAndFiltering"
        showEggColorFilter
        showAttackTypeFilter
        showAttackElementFilter
        showRidingActionFilter
      />
    </template>
  </LazyUTabs>
</template>
