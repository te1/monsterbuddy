<script lang="ts" setup>
  const props = defineProps<{
    value: SortOrder;
  }>();

  const emit = defineEmits<{
    update: [value: SortOrder];
  }>();

  const icon = computed(() =>
    props.value === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow'
  );

  const label = computed(() => (props.value === 'asc' ? 'Ascending' : 'Descending'));

  function toggle() {
    emit('update', props.value === 'asc' ? 'desc' : 'asc');
  }
</script>

<template>
  <UButton
    color="neutral"
    variant="soft2"
    class="w-full"
    :trailingIcon="icon"
    :label="label"
    :ui="{ base: 'justify-between' }"
    @click="toggle"
  />
</template>
