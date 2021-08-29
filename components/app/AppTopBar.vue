<template>
  <div>
    <div class="h-12 mb-3" />

    <div class="fixed top-0 inset-x-0 h-12 z-20 shadow border-b border-gray-300 bg-white dark:border-cool-600 dark:bg-cool-800">
      <div class="container mx-auto px-4 h-full flex items-center justify-between">
        <span class="w-10 mr-4 text-xl">
          <AppIconButton
            v-if="showBack"
            class="ml-1"
            title="Back"
            :icon="['fas', 'arrow-left']"
            @click="goBack"
          />
        </span>

        <h1
          v-if="heading"
          class="flex-1 text-lg text-center font-semibold whitespace-nowrap overflow-ellipsis overflow-hidden"
          v-text="heading"
        />

        <slot />

        <span class="w-10 ml-4 text-xl text-right">
          <AppIconButton
            v-if="showClose"
            class="mr-2"
            title="Close"
            :icon="['fas', 'times']"
            @click="$emit('close')"
          />
          <AppIconButton
            v-else
            class="mr-2"
            title="Toggle dark mode"
            :icon="['fas', 'adjust']"
            @click="toggleDarkMode"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppTopBar',

    props: {
      heading: {
        type: String,
        required: false,
        default: null,
      },

      showBack: {
        type: Boolean,
        required: false,
        default: false,
      },

      backFallback: {
        type: String,
        required: false,
        default: null,
      },

      showClose: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    methods: {
      goBack() {
        window.history.length > 2
          ? this.$router.go(-1)
          : this.$router.push(this.backFallback ?? '/');
      },

      toggleDarkMode() {
        if (this.$colorMode.value === 'dark') {
          this.$colorMode.preference = 'light';
        } else {
          this.$colorMode.preference = 'dark';
        }
      },
    },
  };
</script>
