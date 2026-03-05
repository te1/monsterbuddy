<script lang="ts" setup>
  const model = defineModel<SortOrder>({
    required: true,
  });

  const icon = computed(() =>
    model.value === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow'
  );

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
    :ui="{ base: 'justify-between' }"
    @click="toggle"
  />
</template>
