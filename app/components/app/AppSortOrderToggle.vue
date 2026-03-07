<script lang="ts" setup>
  withDefaults(
    defineProps<{
      disabled?: boolean;
    }>(),
    {
      disabled: false,
    }
  );

  const model = defineModel<SortOrder>({
    required: true,
  });

  const icon = computed(() => (model.value === 'asc' ? 'ph:sort-descending' : 'ph:sort-ascending'));

  const label = computed(() => (model.value === 'asc' ? 'Ascending' : 'Descending'));

  function toggle() {
    model.value = model.value === 'asc' ? 'desc' : 'asc';
  }
</script>

<template>
  <UButton
    color="neutral"
    variant="soft2"
    class="w-full"
    :trailingIcon="icon"
    :label="label"
    :ui="{ base: 'justify-between font-normal', trailingIcon: 'text-dimmed' }"
    :disabled="disabled"
    @click="toggle"
  />
</template>
