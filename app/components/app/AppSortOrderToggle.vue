<script lang="ts" setup>
  const props = defineProps<{
    value: SortOrder;
  }>();

  const emit = defineEmits<{
    update: [value: SortOrder];
  }>();

  function toggle() {
    emit('update', props.value === 'asc' ? 'desc' : 'asc');
  }
</script>

<template>
  <UButton
    color="neutral"
    variant="soft"
    class="w-full"
    :ui="{
      base: 'bg-default/50 hover:bg-default focus-visible:bg-default active:bg-default disabled:bg-default/50 aria-disabled:bg-default/50',
    }"
    :icon="value === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow'"
    :label="value === 'asc' ? 'Ascending' : 'Descending'"
    @click="toggle"
  />
</template>
