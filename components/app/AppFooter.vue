<template>
  <footer class="container mx-auto px-4 py-6 text-sm text-center text-gray-500">
    <div>
      <NuxtLink
        class="link"
        to="/"
      >Monster Buddy</NuxtLink> is a companion app for
      <a
        class="link"
        href="https://www.capcom.com"
        target="_blank"
        rel="noopener"
      >Capcom</a>'s <a
        class="link"
        href="https://www.monsterhunter.com/stories2"
        target="_blank"
        rel="noopener"
      >Monster Hunter Stories 2: Wings of Ruin</a>. This project is not affiliated with or endorsed by Capcom or the Monster Hunter brand. All trademarks referenced herein are the properties of their respective owners.
    </div>

    <div class="mt-3 text-xl">
      <a
        class="text-gray-600 hover:text-gray-800"
        href="https://github.com/te1/monsterbuddy"
        target="_blank"
        rel="noopener"
        title="Source code on GitHub"
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
