<script lang="ts" setup>
  import useMonstieBuildSources from '~/stores/3/monstieBuildSources';
  import useMonstieBuildStore from '~/stores/3/monstieBuildStore';

  const router = useRouter();
  const route = useRoute();
  const hasSidebar = useHasSidebar();

  const sources = useMonstieBuildSources();
  const buildStore = useMonstieBuildStore();

  function newBuild() {
    buildStore.newBuild();
  }

  const tabsAction = [{ label: 'Actions', slot: 'actions' }];

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
  <UTabs color="neutral" variant="link" :items="tabsAction">
    <template #actions>
      <div class="flex flex-col gap-0">
        <UButton
          color="neutral"
          variant="link"
          label="New build"
          icon="ph:list-plus"
          :ui="{ base: 'px-0 font-normal' }"
          @click="newBuild"
        />
      </div>
    </template>
  </UTabs>

  <UTabs v-model="tab" color="neutral" variant="link" :items="tabs">
    <template #view>
      <S3MonstieBuildViewOptions :sources="sources" />
    </template>

    <template #filter>
      <S3MonstieBuildFilter :sources="sources" />
    </template>
  </UTabs>
</template>
