<template>
  <div class="flex items-center">
    <span
      class="w-48"
      v-text="label"
    />

    <span
      class="w-8 mr-1 text-center font-semibold"
      v-text="value"
    />

    <span class="flex gap-0.5">
      <div
        v-for="n in 10"
        :key="n"
        class="w-3 h-4"
        :class="getColor(n)"
      />
    </span>
  </div>
</template>

<script>
  export default {
    name: 'StatsBar',

    props: {
      label: {
        type: String,
        required: true,
      },

      value: {
        type: Number,
        required: true,
      },
    },

    methods: {
      getColor(n) {
        if (this.value >= n) {
          return 'bg-brand-600/75 dark:bg-brand-500/75';
        }
        return 'bg-gray-500/25 dark:bg-cool-400/25';
      },
    },
  };
</script>
