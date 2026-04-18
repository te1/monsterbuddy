<script lang="ts" setup>
  import type { EggPower } from '~/services/3/types';

  const props = defineProps<{
    eggPower: EggPower;
    awakened?: boolean;
    big?: boolean;
    contrast?: boolean;
  }>();

  const bgColor = computed(() => {
    if (props.awakened) {
      switch (props.eggPower.rank) {
        case 'S':
          return 'bg-fuchsia-500/30 dark:bg-fuchsia-400/20';

        case 'A':
          return 'bg-emerald-500/30 dark:bg-emerald-400/20';

        case 'B':
          return 'bg-sky-500/30 dark:bg-sky-400/20';
      }
    }

    return props.contrast ? 'bg-accented' : 'bg-default';
  });

  const textColor = computed(() => {
    switch (props.eggPower.rank) {
      case 'S':
        return props.awakened
          ? 'text-fuchsia-700 dark:text-fuchsia-100'
          : 'text-fuchsia-500 dark:text-fuchsia-400';

      case 'A':
        return props.awakened
          ? 'text-emerald-700 dark:text-emerald-100'
          : 'text-emerald-500 dark:text-emerald-400';

      case 'B':
        if (!props.contrast) {
          return 'text-muted';
        }
        return props.awakened ? 'text-sky-700 dark:text-sky-100' : 'text-sky-500 dark:text-sky-400';
    }

    return 'text-muted';
  });
</script>

<template>
  <div
    class="flex items-center justify-center rounded font-semibold"
    :class="[big ? 'size-10 text-lg' : 'size-7 text-sm', textColor, bgColor]"
    v-text="eggPower.rank"
  />
</template>
