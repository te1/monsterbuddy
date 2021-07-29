<template>
  <div>
    <h2 class="mb-4 text-3xl text-center font-semibold tracking-wide">
      Monster Buddy
    </h2>

    <h3 class="text-2xl font-semibold tracking-wide">
      <span>
        Error
      </span>

      <span
        v-if="error"
        class="text-brand-700"
      >
        {{ error.statusCode }}
      </span>
    </h3>

    <p v-if="error">
      {{ error.message }}
    </p>

    <div class="mt-4">
      <NuxtLink
        class="link"
        to="/"
      >
        Back to Start
      </NuxtLink>
    </div>
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
