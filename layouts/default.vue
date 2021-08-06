<template>
  <div class="pb-10">
    <AppNav />

    <Nuxt
      class="container mx-auto px-4"
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
