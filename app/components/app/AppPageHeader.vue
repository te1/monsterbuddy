<script lang="ts" setup>
  withDefaults(
    defineProps<{
      title?: string;
      headline?: string;
      description?: string;
      hideDescription?: boolean;
    }>(),
    {
      title: undefined,
      headline: undefined,
      description: undefined,
      hideDescription: false,
    }
  );

  const slots = defineSlots<{
    default: () => VNode;
    description: () => VNode;
  }>();
</script>

<template>
  <UPageHeader
    :title="title"
    :headline="headline"
    :description="description"
    :ui="{
      root: ['py-3 lg:py-4', { 'pt-0': hideDescription }],
      headline: 'hidden lg:flex',
      title: 'hidden lg:flex',
      description: ['mt-0 lg:mt-4', { 'sr-only': hideDescription }],
    }"
  >
    <template v-if="slots.description" #description>
      <slot name="description" />
    </template>
  </UPageHeader>
</template>
