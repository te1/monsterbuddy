<script lang="ts" setup>
  const canHover = useCanHover();
  const navItems = useNavItems();

  // TODO increase click area of top nav buttons and bottom nav links
</script>

<template>
  <UHeader to="/" :toggle="false" :ui="{ center: 'flex-1' }">
    <UNavigationMenu
      :items="navItems"
      variant="link"
      contentOrientation="vertical"
      :disableHoverTrigger="!canHover"
      :disablePointerLeaveClose="!canHover"
      :ui="{ content: 'w-max' }"
    />

    <template #left>
      <AppTitle />
    </template>

    <template #right>
      <AppSearchButton />
      <AppColorModeButton />
      <AppGameSelect />
    </template>
  </UHeader>
</template>
