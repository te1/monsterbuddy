<template>
  <div>
    <h2 class="text-2xl font-semibold tracking-wide">Error</h2>

    <div
      v-if="error"
      class="text-lg"
    >
      <span class="font-semibold tracking-wide">{{ error.statusCode }}</span>
      <span>{{ error.message }}</span>
    </div>

    <NuxtLink to="/">Back</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: {
      error: {
        type: Object,
        required: false,
        default() {
          return null;
        },
      },
    },
  };
</script>
