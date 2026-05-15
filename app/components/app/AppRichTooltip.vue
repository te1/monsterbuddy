<script lang="ts" setup>
  import type { PopoverProps } from '@nuxt/ui';
  import type { RouteLocationRaw } from 'vue-router';

  const canHover = useCanHover();

  withDefaults(
    defineProps<{
      content?: PopoverProps['content'];
      link?: RouteLocationRaw;
      linkText?: string;
      noModal?: boolean;
    }>(),
    {
      content: () => ({ side: 'top' }),
      link: undefined,
      linkText: 'Go to details page',
      noModal: false,
    }
  );

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
  const modalOpen = ref(false);

  function closeModal() {
    modalOpen.value = false;
  }
</script>

<template>
  <UPopover
    v-if="canHover"
    mode="hover"
    :reference="reference"
    :openDelay="100"
    :closeDelay="100"
    :content="content"
    :ui="{
      content:
        'w-fit max-w-[min(calc(100vw-2rem),var(--container-md))] dark:bg-neutral-800 dark:ring-neutral-700',
    }"
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

  <UModal v-else-if="!noModal" v-model:open="modalOpen">
    <div class="contents">
      <slot />
    </div>

    <template #content>
      <div class="@container flex flex-col gap-3 px-3 py-2">
        <div>
          <slot name="content" :close="closeModal" />
        </div>

        <div v-if="link">
          <AppNuxtLink :to="link" :text="linkText" class="outline-none" />
        </div>
      </div>
    </template>
  </UModal>

  <div v-else>
    <slot />
  </div>
</template>
