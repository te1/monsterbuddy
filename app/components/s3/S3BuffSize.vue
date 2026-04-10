<script lang="ts" setup>
  import type { SkillBuffSize } from '~/services/3/types';

  defineProps<{ size?: SkillBuffSize }>();
</script>

<template>
  <AppTooltip
    v-if="size === 'stacking'"
    :text="size"
    tooltip="Starts at size S. Repeated applications increase the size and refresh the duration."
  />

  <span v-else-if="size != null" class="font-semibold" v-text="size" />
</template>
