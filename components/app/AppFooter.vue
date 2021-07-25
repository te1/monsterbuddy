<template>
  <footer class="container mx-auto px-4 py-8 text-sm text-center text-gray-500">
    <div>
      All trademarks referenced herein are the properties of their respective owners.
    </div>

    <div class="flex items-center gap-2 mt-4">
      <span class="flex-1"></span>
      <span>Monster Buddy</span>
      <a
        class="hover:text-gray-700"
        href="https://github.com/te1/monsterbuddy"
        target="_blank"
      >
        <FaIcon :icon="['fab', 'github']" />
      </a>
      <span class="flex-1"></span>
    </div>

  </footer>
</template>

<script>
  export default {
    name: 'AppFooter',
  };
</script>
