<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      element?: ElementType;
    }>(),
    {
      element: undefined,
    }
  );

  const caption = computed(() => formatElement(props.element));
</script>

<template>
  <span class="dark:brightness-150" v-text="caption" />
</template>
