<template>
  <UHeader :ui="{ center: 'flex-1' }" to="/">
    <AppSearchButton :collapsed="false" class="w-full" />

    <template #left>
      <NuxtLink to="/">
        <AppLogo />
      </NuxtLink>
    </template>

    <template #right>
      <AppSearchButton class="lg:hidden" />
      <UColorModeButton />
      <GameMenu />
    </template>
  </UHeader>
</template>
