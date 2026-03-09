<script lang="ts" setup>
  const router = useRouter();
  const route = useRoute();
  const isMobile = useIsMobile();
  const { value: mobileHeader } = useMobileHeaderTitle();

  const hasBack = computed(() => route.meta.back?.show ?? false);
  const backFallback = computed(() => route.meta.back?.fallback ?? '/');

  function goBack() {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(backFallback.value);
    }
  }
</script>

<template>
  <UTooltip v-if="hasBack" text="Back" class="md:hidden">
    <UButton
      icon="ph:arrow-left"
      color="neutral"
      variant="ghost"
      aria-label="Back"
      @click="goBack"
    />
  </UTooltip>

  <div class="text-lg font-medium tracking-wide dark:text-toned">
    <span v-if="mobileHeader && isMobile" v-text="mobileHeader" />

    <NuxtLink v-else to="/">Monster Buddy</NuxtLink>
  </div>
</template>
