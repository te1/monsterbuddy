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
      :popover="{ content: { side: 'top' } }"
    />
  </UHeader>
</template>
