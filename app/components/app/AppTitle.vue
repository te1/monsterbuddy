<script lang="ts" setup>
  const router = useRouter();
  const route = useRoute();
  const { value: mobileHeader } = useMobileHeaderOverride();

  const resolvedMobileHeader = computed(() => route.meta.mobileHeaderTitle ?? mobileHeader.value);

  const hasBack = computed(() => route.meta.back?.show ?? false);
  const backFallback = computed(() => route.meta.back?.fallback ?? '/');

  function goBack() {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(backFallback.value);
    }
  }

  // TODO increase click area of title and back button
</script>

<template>
  <div class="relative grow lg:flex-1">
    <div
      class="absolute inset-y-0 -left-1.5 flex items-center transition-[transform,opacity] duration-150 ease-out will-change-transform lg:hidden"
      :class="
        hasBack ? 'translate-x-0 opacity-100' : 'pointer-events-none -translate-x-2 opacity-0'
      "
    >
      <UTooltip text="Back">
        <UButton
          icon="ph:arrow-left"
          color="neutral"
          variant="ghost"
          aria-label="Back"
          :disabled="!hasBack"
          :tabindex="hasBack ? 0 : -1"
          @click="goBack"
        />
      </UTooltip>
    </div>

    <div
      class="text-lg font-medium tracking-wide transition-transform duration-150 ease-out will-change-transform dark:text-toned"
      :class="hasBack ? 'translate-x-8 lg:translate-x-0' : 'translate-x-0'"
    >
      <span v-if="resolvedMobileHeader" class="truncate lg:hidden" v-text="resolvedMobileHeader" />
      <NuxtLink to="/" :class="resolvedMobileHeader ? 'hidden lg:inline' : 'inline'">
        Monster Buddy
      </NuxtLink>
    </div>
  </div>
</template>
