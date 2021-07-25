<template>
  <footer class="container mx-auto px-4 py-8 text-sm text-center text-gray-500">
    <div>
      All trademarks referenced herein are the properties of their respective owners.
    </div>

    <div class="text-center mt-4">
      Monster Buddy
      <a
        class="hover:text-gray-700"
        href="https://github.com/te1/monsterbuddy"
        target="_blank"
      >
        <FaIcon :icon="['fab', 'github']" />
      </a>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'AppFooter',
  };
</script>
