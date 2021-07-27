<template>
  <div class="pt-12">
    <AppHeader />

    <Nuxt
      class="container mx-auto px-4 py-2"
      keep-alive
    />

    <AppFooter />
  </div>
</template>

<script>
  export default {
    name: 'LayoutDefault',
  };
</script>
