<script lang="ts" setup>
  const canHover = useCanHover();

  const reference = computed(() => {
    return {
      getBoundingClientRect() {
        return (
          anchor.value?.getBoundingClientRect() ?? {
            width: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            x: 0,
            y: 0,
          }
        );
      },
    };
  });

  const anchor = useTemplateRef('anchor');
</script>

<template>
  <UPopover
    v-if="canHover"
    mode="hover"
    :reference="reference"
    :content="{ side: 'top' }"
    :ui="{ content: 'dark:bg-neutral-800 dark:ring-neutral-700' }"
  >
    <div class="contents">
      <slot />
    </div>

    <div ref="anchor" class="absolute inset-0 -z-10" />

    <template #content>
      <div class="px-2.5 py-1 select-none dark:bg-default/50">
        <slot name="content" />
      </div>
    </template>
  </UPopover>

  <UModal v-else>
    <div class="contents">
      <slot />
    </div>

    <template #body>
      <slot name="content" />
    </template>
  </UModal>
</template>
