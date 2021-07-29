<template>
  <header class="fixed bottom-0 w-full z-10 shadow-top border-t border-gray-300 bg-white">
    <nav class="grid grid-flow-col auto-cols-fr select-none">
      <AppNavLink
        to="/"
        text="Start"
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
