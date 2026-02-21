<script lang="ts" setup>
  const navItems = computed(() => getNavItems(useRoute().path));
</script>

<template>
  <UHeader to="/" :toggle="false" :ui="{ center: 'flex-1' }">
    <UNavigationMenu :items="navItems" variant="link" contentOrientation="vertical" />

    <template #left>
      <NuxtLink to="/">
        <AppLogo />
      </NuxtLink>
    </template>

    <template #right>
      <UColorModeButton />
      <AppSearchButton />
      <AppGameSelect />
    </template>
  </UHeader>
</template>
