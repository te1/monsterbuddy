<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      tooltip?: string;
      icon?: string;
      destructive?: boolean | string;
    }>(),
    {
      tooltip: undefined,
      icon: undefined,
      destructive: false,
    }
  );

  const emit = defineEmits<{
    click: [];
  }>();

  const pending = ref(false);
  const tooltipOpen = ref(false);

  const canHover = useCanHover();

  const resolvedTooltip = computed(() => {
    if (pending.value) {
      const action = typeof props.destructive === 'string' ? props.destructive : 'confirm';

      return canHover.value ? `Click again to ${action}` : `Tap again to ${action}`;
    }

    return props.tooltip;
  });

  let pendingTimer: ReturnType<typeof setTimeout> | undefined;

  function resetPending() {
    tooltipOpen.value = false;
    pending.value = false;

    if (pendingTimer) {
      clearTimeout(pendingTimer);
      pendingTimer = undefined;
    }
  }

  function startPending() {
    resetPending();

    pending.value = true;
    pendingTimer = setTimeout(resetPending, 3000);

    tooltipOpen.value = !!props.tooltip;
  }

  function handleClick() {
    if (!props.destructive) {
      emit('click');
      return;
    }

    if (!pending.value) {
      startPending();
      return;
    }

    resetPending();
    emit('click');
  }

  watch(
    () => props.destructive,
    (destructive) => {
      if (!destructive) {
        resetPending();
      }
    }
  );

  onBeforeUnmount(resetPending);
</script>

<template>
  <UTooltip v-model:open="tooltipOpen" :text="resolvedTooltip" :content="{ side: 'left' }">
    <UButton
      color="neutral"
      variant="fab"
      size="xl"
      :ui="{ leadingIcon: ['size-9 transition-colors', pending ? 'text-red-500' : ''] }"
      :icon="icon"
      @click="handleClick"
    />
  </UTooltip>
</template>
