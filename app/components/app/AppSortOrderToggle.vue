<script lang="ts" setup>
  withDefaults(
    defineProps<{
      noLabel?: boolean;
      disabled?: boolean;
    }>(),
    {
      noLabel: true,
      disabled: false,
    }
  );

  const model = defineModel<SortOrder>({
    required: true,
  });

  const icon = computed(() => (model.value === 'asc' ? 'ph:sort-descending' : 'ph:sort-ascending'));

  const label = computed(() => (model.value === 'asc' ? 'Ascending' : 'Descending'));
  const tooltip = computed(() =>
    model.value === 'asc' ? 'Switch to descending' : 'Switch to ascending'
  );

  function toggle() {
    model.value = model.value === 'asc' ? 'desc' : 'asc';
  }
</script>

<template>
  <UTooltip v-if="noLabel" :text="tooltip">
    <UButton
      color="neutral"
      variant="soft2"
      :icon="icon"
      :ui="{ leadingIcon: 'text-dimmed' }"
      :disabled="disabled"
      @click="toggle"
    />
  </UTooltip>

  <UButton
    v-else
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
