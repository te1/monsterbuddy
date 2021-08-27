<template>
  <header class="fixed bottom-0 w-full h-12 z-20 shadow-top border-t border-gray-300 bg-white dark:border-cool-600 dark:bg-cool-800">
    <nav class="container px-4 h-full grid grid-flow-col gap-4 select-none">
      <AppNavLink
        to="/"
        text="Start"
        exact
      />

      <AppNavLink
        to="/monsters/"
        text="Monsters"
      />

      <AppNavLink
        to="/monsties/"
        text="Monsties"
      />

      <AppNavLink
        to="/eggs/"
        text="Eggs"
      />

      <AppNavLink
        to="/elders-lair/"
        text="Elder's Lair"
      />
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'AppNav',
  };
</script>
