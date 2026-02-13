<script lang="ts">
  export interface AppSearchButtonProps {
    /**
     * Whether the button is collapsed.
     * @defaultValue true
     */
    collapsed?: boolean;

    class?: string;
  }
</script>

<script setup lang="ts">
  defineOptions({ inheritAttrs: false });

  const props = withDefaults(defineProps<AppSearchButtonProps>(), {
    collapsed: true,
    class: undefined,
  });

  const kbds = ['meta', 'k'];

  const open = ref(false);
  const appConfig = useAppConfig();
</script>

<template>
  <UButton
    :icon="appConfig.ui.icons.search"
    :label="collapsed ? undefined : 'Search...'"
    color="neutral"
    :variant="collapsed ? 'ghost' : 'outline'"
    v-bind="{
      ...(collapsed
        ? {
            square: true,
            'aria-label': 'LABEL',
          }
        : {}),
      ...$attrs,
    }"
    :class="props.class"
    :kbds="kbds"
    @click="open = true"
  >
    <template #trailing="{ ui: uiProxy }">
      <div data-slot="trailing" class="ms-auto hidden items-center gap-0.5 lg:flex">
        <slot name="trailing" :ui="uiProxy">
          <template v-if="kbds?.length">
            <UKbd
              v-for="(kbd, index) in kbds"
              :key="index"
              variant="subtle"
              v-bind="typeof kbd === 'string' ? { value: kbd } : kbd"
            />
          </template>
        </slot>
      </div>
    </template>
  </UButton>
</template>
