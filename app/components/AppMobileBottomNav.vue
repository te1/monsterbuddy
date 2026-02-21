<script lang="ts" setup>
  const navItems = computed(() => getNavItems(useRoute().path));
</script>

<template>
  <UHeader
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
        viewportWrapper:
          'absolute bottom-full! top-auto! left-0 right-0 flex justify-end',
        viewport:
          'left-auto! right-0! w-60 max-w-[calc(100vw-0.5rem)] sm:w-(--reka-navigation-menu-viewport-width)'
      }"
    />
  </UHeader>
</template>
