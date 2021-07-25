<template>
  <NuxtLink
    :to="to"
    class="px-2 py-2 text-center font-semibold tracking-wide transition text-gray-600 hover:text-gray-400 border-t-4 border-b-4 border-transparent hover:border-b-gray-400"
    exact-active-class="text-green-500 hover:text-green-400 border-b-green-500 hover:border-b-green-400"
  >
    {{ text }}
  </NuxtLink>
</template>

<script>
  export default {
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
