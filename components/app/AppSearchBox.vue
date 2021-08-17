<template>
  <div class="relative flex-1 -mt-0.5">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FaIcon
        :icon="['fas', 'search']"
        class="text-gray-500 dark:text-cool-400"
      />
    </div>

    <div
      class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer transition-opacity"
      :class="{ 'opacity-0': !value }"
    >
      <AppIconButton
        :icon="['fas', 'times']"
        class="text-gray-500 dark:text-cool-400"
        title="Clear"
        @click="clear"
      />
    </div>

    <input
      ref="input"
      type="text"
      :value="value"
      class="w-full h-8 px-10 rounded border-0 text-gray-700 placeholder-gray-500 bg-gray-300 dark:text-cool-200 dark:placeholder-cool-400 dark:bg-cool-700 focus:outline-none focus:ring-0"
      placeholder="Search"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
  export default {
    name: 'AppSearchBox',

    props: {
      value: {
        type: String,
        required: false,
        default: null,
      },
    },

    methods: {
      clear() {
        this.$emit('input', null);

        let input = this.$refs.input;
        if (input) {
          input.focus();
        }
      },
    },
  };
</script>
