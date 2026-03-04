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
    variant="soft2"
    class="w-full"
    :trailingIcon="
      value === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow'
    "
    :label="value === 'asc' ? 'Ascending' : 'Descending'"
    :ui="{ base: 'justify-between' }"
    @click="toggle"
  />
</template>
