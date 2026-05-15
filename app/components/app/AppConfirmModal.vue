<script lang="ts" setup generic="TValue extends string = string">
  type ConfirmModalAction<TValue extends string> = {
    label: string;
    value: TValue;
    icon?: string;
    color?: 'primary' | 'neutral' | 'success';
    variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link';
  };

  const props = defineProps<{
    title: string;
    description?: string;
    icon?: string;
    actions: ConfirmModalAction<TValue>[];
  }>();

  const emit = defineEmits<{
    close: [value: TValue];
  }>();

  const defaultAction = ref<{ $el?: unknown }>();

  function setDefaultAction(el: unknown, index: number) {
    if (index === props.actions.length - 1) {
      defaultAction.value = el as { $el?: unknown } | undefined;
    }
  }

  function getFocusableElement(value: unknown): HTMLElement | undefined {
    if (value instanceof HTMLElement) {
      return value;
    }

    if (value && typeof value === 'object' && '$el' in value && value.$el instanceof HTMLElement) {
      return value.$el;
    }

    return undefined;
  }

  function preventOutsideClose(event: Event) {
    event.preventDefault();
  }

  function focusDefaultAction() {
    getFocusableElement(defaultAction.value)?.focus();
  }
</script>

<template>
  <UModal
    :close="false"
    :dismissible="true"
    :content="{ onPointerDownOutside: preventOutsideClose }"
    :ui="{ content: 'max-w-xl', body: 'p-3 sm:p-3', footer: 'p-3 sm:p-3' }"
    @after:enter="focusDefaultAction"
  >
    <template #body>
      <UAlert
        color="neutral"
        variant="soft"
        :title="title"
        :description="description"
        :icon="icon"
        :ui="{
          root: 'bg-transparent p-0',
          title: 'text-lg font-semibold',
          description: 'text-base text-muted',
        }"
      />
    </template>

    <template #footer>
      <div class="flex w-full flex-wrap justify-end gap-2">
        <UButton
          v-for="(action, index) in actions"
          :key="action.value"
          :ref="(el) => setDefaultAction(el, index)"
          :label="action.label"
          :icon="action.icon"
          :color="action.color"
          :variant="action.variant"
          @click="emit('close', action.value)"
        />
      </div>
    </template>
  </UModal>
</template>
