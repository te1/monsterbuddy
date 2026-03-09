<script lang="ts" setup>
  withDefaults(
    defineProps<{
      disabled?: boolean;
      modalLayout?: boolean;
    }>(),
    {
      disabled: false,
      modalLayout: false,
    }
  );

  const modelValue = defineModel<string | undefined>({
    required: true,
  });

  const updateValue = (value: string) => {
    modelValue.value = value;
  };

  const input = useTemplateRef('input');

  function clear() {
    modelValue.value = undefined;

    input.value?.inputRef?.focus();
  }
</script>

<template>
  <UInput
    ref="input"
    :modelValue="modelValue"
    color="neutral"
    :variant="modalLayout ? 'soft-filter-modal' : 'soft-filter'"
    icon="ph:magnifying-glass"
    placeholder="Search..."
    :ui="{ trailing: 'pe-1' }"
    class="w-full"
    :disabled="disabled"
    @update:modelValue="updateValue"
  >
    <template v-if="modelValue?.length" #trailing>
      <UTooltip text="Clear filter">
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          icon="ph:x"
          aria-label="Clear filter"
          @click="clear"
        />
      </UTooltip>
    </template>
  </UInput>
</template>
