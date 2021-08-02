<template>
  <div class="pb-10">
    <Nuxt
      class="container mx-auto px-4 pt-3"
      keep-alive
    />

    <AppNav />
    <AppFooter />
  </div>
</template>

<script>
  export default {
    name: 'LayoutDefault',
  };
</script>
