<template>
  <UHeader :ui="{ center: 'flex-1' }" to="/">
    <AppSearchButton :collapsed="false" class="w-full" />

    <template #left>
      <NuxtLink to="/">
        <AppLogo />
      </NuxtLink>

      <GameMenu />
    </template>

    <template #right>
      <AppSearchButton class="lg:hidden" />

      <UColorModeButton />
    </template>
  </UHeader>
</template>
