<template>
  <div class="flex items-center gap-2">
    <slot>
      <span class="w-5 h-5" />
    </slot>

    <span class="flex-1 flex gap-0.5">
      <div
        v-for="n in 10"
        :key="n"
        class="flex-1 h-4"
        :class="getColor(n)"
      />
    </span>

    <span
      class="w-4 text-right font-semibold"
      v-text="value"
    />
  </div>
</template>

<script>
  export default {
    name: 'StatsBar',

    props: {
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
