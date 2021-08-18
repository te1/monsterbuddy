<template>
  <div class="pb-10">
    <AppNav />

    <Nuxt
      class="container mx-auto px-4"
      keep-alive
      :keep-alive-props="{ include: ['PageMonsters', 'PageMonsties', 'PageEggs'] }"
    />

    <AppFooter />
  </div>
</template>

<script>
  export default {
    name: 'LayoutDefault',
  };
</script>
