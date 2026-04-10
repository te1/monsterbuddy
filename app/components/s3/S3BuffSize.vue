<script lang="ts" setup>
  import type { SkillBuffSize } from '~/services/3/types';

  defineProps<{ size?: SkillBuffSize }>();
</script>

<template>
  <UTooltip
    v-if="size === 'stacking'"
    text="Starts at size S. Repeated applications increase the size and refresh the duration."
  >
    <span
      class="font-semibold underline decoration-neutral-600 decoration-dotted underline-offset-4 dark:decoration-neutral-400"
      v-text="size"
    />
  </UTooltip>

  <span v-else-if="size != null" class="font-semibold" v-text="size" />
</template>
