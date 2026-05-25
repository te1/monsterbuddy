<script lang="ts" setup>
  import { useTimeout } from '@vueuse/core';

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

  const tooltipOpen = ref(false);

  const { start, stop, isPending } = useTimeout(3000, {
    controls: true,
    immediate: false,
    callback() {
      tooltipOpen.value = false;
    },
  });

  const canHover = useCanHover();

  const resolvedTooltip = computed(() => {
    if (isPending.value) {
      const action = typeof props.destructive === 'string' ? props.destructive : 'confirm';

      return canHover.value ? `Click again to ${action}` : `Tap again to ${action}`;
    }

    return props.tooltip;
  });

  function resetPending() {
    tooltipOpen.value = false;
    stop();
  }

  function startPending() {
    resetPending();
    start();
    tooltipOpen.value = true;
  }

  function handleClick() {
    if (!props.destructive) {
      emit('click');
      return;
    }

    if (!isPending.value) {
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
</script>

<template>
  <UTooltip v-model:open="tooltipOpen" :text="resolvedTooltip" :content="{ side: 'left' }">
    <UButton
      color="neutral"
      variant="fab"
      size="xl"
      :ui="{ leadingIcon: ['size-9 transition-colors', isPending ? 'text-red-500' : ''] }"
      :icon="icon"
      @click="handleClick"
    />
  </UTooltip>
</template>
