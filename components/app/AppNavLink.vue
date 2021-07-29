<template>
  <NuxtLink
    :to="to"
    class="py-2 text-center font-semibold tracking-wide transition text-gray-500 hover:text-gray-700"
    exact-active-class="text-brand-500 hover:text-brand-700"
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
  };
</script>
