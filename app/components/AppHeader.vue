<script lang="ts" setup>
  const canHover = useCanHover();
  const colorMode = useColorMode();
  const { t } = useLocale();

  const navItems = computed(() => getNavItems(useRoute().path));

  const colorModeButtonTitle = computed(() =>
    colorMode.value === 'dark' ? t('colorMode.switchToLight') : t('colorMode.switchToDark')
  );
</script>

<template>
  <UHeader to="/" :toggle="false" :ui="{ center: 'flex-1' }">
    <UNavigationMenu
      :items="navItems"
      variant="link"
      contentOrientation="vertical"
      :disableHoverTrigger="!canHover"
      :disablePointerLeaveClose="!canHover"
    />

    <template #left>
      <NuxtLink to="/">
        <AppLogo />
      </NuxtLink>
    </template>

    <template #right>
      <UColorModeButton :title="colorModeButtonTitle" />
      <AppSearchButton />
      <AppGameSelect />
    </template>
  </UHeader>
</template>
