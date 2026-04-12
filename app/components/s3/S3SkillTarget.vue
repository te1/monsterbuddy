<script lang="ts" setup>
  import type { SkillTarget } from '~/services/3/types';
  import { formatSkillTarget } from '~/services/3/presentation';

  const props = defineProps<{ target?: SkillTarget }>();

  const caption = computed(() => (props.target ? formatSkillTarget(props.target) : ''));
</script>

<template>
  <AppTooltip
    v-if="target === 'randomEnemy'"
    :text="caption"
    tooltip="Hits one enemy multiple times if there are no other enemies."
  />

  <span v-else-if="target != null" v-text="caption" />
</template>
