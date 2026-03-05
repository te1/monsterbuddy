<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      modelValue?: boolean;
      texts?: string[];
    }>(),
    {
      modelValue: undefined,
      texts: undefined,
    }
  );

  const emit = defineEmits<{
    'update:modelValue': [value: boolean | undefined];
  }>();

  const icon = computed(() => {
    switch (props.modelValue) {
      case undefined:
        return 'i-lucide-asterisk';

      case true:
        return 'i-lucide-check';

      case false:
        return 'i-lucide-x';

      default:
        return null;
    }
  });

  const label = computed(() => {
    const texts = props.texts ?? [];

    switch (props.modelValue) {
      case undefined:
        return texts[0] ?? 'All';

      case true:
        return texts[1] ?? 'Yes';

      case false:
        return texts[2] ?? 'No';

      default:
        return null;
    }
  });

  function toggle() {
    // cycle undefined -> true -> false -> undefined -> ...
    emit(
      'update:modelValue',
      props.modelValue === undefined ? true : props.modelValue === true ? false : undefined
    );
  }
</script>

<template>
  <UButton
    color="neutral"
    variant="soft2"
    class="w-full"
    :trailingIcon="icon"
    :label="label ?? ''"
    :ui="{ base: 'justify-between' }"
    @click="toggle"
  />
</template>
