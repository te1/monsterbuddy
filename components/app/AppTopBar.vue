<template>
  <div class="fixed top-0 inset-x-0 h-12 z-10 shadow border-b border-gray-300 bg-white">
    <div class="container mx-auto px-4 h-full flex items-center justify-between">
      <!-- <nav class="container mx-auto px-4 h-full grid grid-flow-col items-center justify-items-center select-none"> -->
      <span class="w-6 text-xl ml-1">
        <FaIcon
          v-if="showBack"
          class="cursor-pointer select-none"
          :icon="['fas', 'arrow-left']"
          @click="goBack"
        />
        <slot
          v-else
          name="left"
        />
      </span>

      <span class="flex-1 text-lg text-center font-semibold">
        <slot />
      </span>

      <span class="w-6 mr-2 text-2xl text-right">
        <FaIcon
          v-if="showClose"
          class="cursor-pointer"
          :icon="['fas', 'times']"
          @click="$emit('close')"
        />
        <slot
          v-else
          name="right"
        />
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppTopBar',

    props: {
      showBack: {
        type: Boolean,
        required: false,
        default: false,
      },

      showClose: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    methods: {
      goBack() {
        window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/');
      },
    },
  };
</script>
