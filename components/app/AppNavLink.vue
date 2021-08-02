<template>
  <NuxtLink
    :to="to"
    class="font-semibold tracking-wide transition text-gray-500 hover:text-gray-700"
    :active-class="activeClasses"
    :exact-active-class="exactActiveClasses"
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

      exact: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    computed: {
      baseActiveClasses() {
        return 'text-brand-500 hover:text-brand-500 active:text-brand-500';
      },

      activeClasses() {
        if (this.exact) {
          return null;
        }
        return this.baseActiveClasses;
      },

      exactActiveClasses() {
        if (!this.exact) {
          return null;
        }
        return this.baseActiveClasses;
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
