<script lang="ts" setup>
  import type { EggPowerRequirement } from '~/services/3/types';

  const props = defineProps<{ requirement: EggPowerRequirement }>();

  const label = computed(() => {
    if ('type' in props.requirement) {
      return 'Type';
    }

    if ('element' in props.requirement) {
      return 'Element';
    }

    return '';
  });
</script>

<template>
  <div class="flex items-center justify-between gap-2">
    <div v-text="label" />
    <div v-if="'element' in requirement" class="flex items-center gap-2">
      <ElementLabel class="font-semibold" :element="requirement.element" />
      <ElementIcon class="size-8" :element="requirement.element" />
    </div>
    <div v-if="'type' in requirement" class="flex items-center gap-2">
      <AttackTypeLabel class="font-semibold" :type="requirement.type" />
      <AttackTypeIcon class="size-8" :type="requirement.type" />
    </div>
  </div>
</template>
