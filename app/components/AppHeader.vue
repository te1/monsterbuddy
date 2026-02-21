<template>
  <UHeader :ui="{ center: 'flex-1' }" to="/">
    <!-- <AppSearchButton :collapsed="false" class="w-full" /> -->
    <AppNav />

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
  </UHeader>
</template>
