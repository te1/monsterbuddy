<script lang="ts" setup>
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
    variant="soft2"
    icon="i-lucide-search"
    placeholder="Search..."
    :ui="{ trailing: 'pe-1' }"
    class="w-full"
    @update:modelValue="updateValue"
  >
    <template v-if="modelValue?.length" #trailing>
      <UTooltip text="Clear filter">
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          icon="i-lucide-x"
          aria-label="Clear filter"
          @click="clear"
        />
      </UTooltip>
    </template>
  </UInput>
</template>
