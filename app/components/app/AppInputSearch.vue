<script lang="ts" setup>
  const props = withDefaults(
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

  const canFocus = computed(() => !props.disabled);

  function focus() {
    if (!canFocus.value) {
      return;
    }

    input.value?.inputRef?.focus();
  }

  defineShortcuts({
    '/': focus,
  });

  function clear() {
    modelValue.value = undefined;
    focus();
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
    aria-label="Search"
    :ui="{ trailing: 'pe-1' }"
    class="w-full"
    :disabled="disabled"
    @update:modelValue="updateValue"
  >
    <template #trailing>
      <div class="pe-0.5">
        <UTooltip v-if="modelValue?.length" text="Clear filter">
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            icon="ph:x"
            aria-label="Clear filter"
            @click="clear"
          />
        </UTooltip>

        <UKbd
          v-else
          value="/"
          variant="soft"
          aria-hidden="true"
          class="me-0.5 hidden ps-2 pt-0.25 select-none lg:block"
        />
      </div>
    </template>
  </UInput>
</template>
