<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      texts?: string[];
    }>(),
    {
      texts: undefined,
    }
  );

  const model = defineModel<boolean | undefined>({
    default: undefined,
  });

  const icon = computed(() => {
    switch (model.value) {
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

    switch (model.value) {
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
    model.value = model.value === undefined ? true : model.value === true ? false : undefined;
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
