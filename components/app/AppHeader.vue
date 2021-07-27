<template>
  <header class="fixed top-0 w-full z-10 bg-white shadow-md">
    <div class="container mx-auto h-12 px-4 flex items-center justify-between">
      <h1 class="text-lg font-semibold tracking-wider transition hover:text-gray-500 select-none">
        <NuxtLink to="/">
          Monster Buddy
        </NuxtLink>
      </h1>

      <nav class="grid grid-flow-col auto-cols-fr gap-2 select-none">
        <AppHeaderLink
          to="/eggs"
          text="Eggs"
        />
        <AppHeaderLink
          to="/monsters"
          text="Monsters"
        />
      </nav>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'AppHeader',
  };
</script>
