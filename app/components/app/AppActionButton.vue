<script lang="ts" setup>
  import type { RouteLocationRaw } from 'vue-router';
  import { useTimeout } from '@vueuse/core';

  const props = withDefaults(
    defineProps<{
      label: string;
      icon: string;
      to?: RouteLocationRaw;
      disabled?: boolean;
      destructive?: boolean | string;
    }>(),
    {
      to: undefined,
      disabled: false,
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

    return undefined;
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
  <UTooltip v-model:open="tooltipOpen" :text="resolvedTooltip" :content="{ side: 'top' }">
    <UButton
      color="neutral"
      variant="link"
      :label="label"
      :icon="icon"
      :to="to"
      :ui="{
        base: 'w-fit px-0 font-normal disabled:text-dimmed aria-disabled:text-dimmed',
        label: ['transition-colors', isPending ? 'text-red-500' : ''],
        leadingIcon: ['transition-colors', isPending ? 'text-red-500' : ''],
      }"
      :disabled="disabled"
      @click="handleClick"
    />
  </UTooltip>
</template>
