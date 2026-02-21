<script lang="ts" setup>
  const path = computed(() => useRoute().path);
  const gameType = computed(() => routePathToGameType(path.value));
  const navItems = computed(() => getNavItems(path.value));
</script>

<template>
  <UHeader
    v-if="gameType !== 'none'"
    as="div"
    title=""
    :toggle="false"
    class="lg:hidden"
    :ui="{ root: 'top-auto bottom-0 border-t border-b-0', center: 'flex' }"
  >
    <UNavigationMenu
      :items="navItems"
      variant="link"
      contentOrientation="vertical"
      :ui="{
        viewportWrapper: 'absolute top-auto! right-0 bottom-full! left-0 flex justify-end',
        viewport:
          'right-0! left-auto! w-60 max-w-[calc(100vw-0.5rem)] sm:w-(--reka-navigation-menu-viewport-width)',
      }"
    />
  </UHeader>
</template>
