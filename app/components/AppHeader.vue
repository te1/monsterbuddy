<script lang="ts" setup>
  const navItems = computed(() => getNavItems(useRoute().path));
  const navItemsFlat = computed(() =>
    navItems.value.flatMap((item) =>
      item.label === 'More' && item.children ? item.children : [item]
    )
  );
</script>

<template>
  <UHeader to="/" mode="drawer" toggleSide="left" :ui="{ center: 'flex-1' }">
    <!-- <AppSearchButton :collapsed="false" class="w-full" /> -->
    <UNavigationMenu :items="navItems" variant="link" contentOrientation="vertical" />

    <template #left>
      <NuxtLink to="/">
        <AppLogo />
      </NuxtLink>
    </template>

    <template #right>
      <AppSearchButton />
      <UColorModeButton />
      <GameMenu />
    </template>

    <template #body>
      <UNavigationMenu :items="navItemsFlat" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
