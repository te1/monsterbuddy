<template>
  <header class="fixed bottom-0 w-full h-12 z-10 shadow-top border-t border-gray-300 bg-white">
    <nav class="container mx-auto px-4 h-full grid grid-flow-col items-center justify-items-center select-none">
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
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'AppNav',
  };
</script>
