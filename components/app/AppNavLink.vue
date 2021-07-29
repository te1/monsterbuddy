<template>
  <NuxtLink
    :to="to"
    class="py-3 text-center font-semibold tracking-wide transition text-gray-500 hover:text-gray-700"
    exact-active-class="text-brand-500 hover:text-brand-500 active:text-brand-500"
    @mousedown.native="handleClick"
  >
    {{ text }}
  </NuxtLink>
</template>

<script>
  export default {
    name: 'AppNavLink',

    props: {
      to: {
        type: String,
        required: true,
      },

      text: {
        type: String,
        required: true,
      },
    },

    methods: {
      handleClick() {
        let route = this.$router.match(this.to);

        if (route && this.$route && route.path === this.$route.path) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
    },
  };
</script>
