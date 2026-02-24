<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      element?: ElementType;
      justText?: boolean;
    }>(),
    {
      element: undefined,
      justText: false,
    }
  );

  const caption = computed(() => formatElement(props.element));
  const classes = computed(() => {
    if (props.justText) {
      return undefined;
    }
    return 'dark:brightness-150';
  });
</script>

<template>
  <span :class="classes" v-text="caption" />
</template>
