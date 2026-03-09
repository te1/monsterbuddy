<script lang="ts" setup>
  const isMobile = useIsMobile();
  const { value: mobileHeader } = useMobileHeaderTitle();

  // TODO implement back button
</script>

<template>
  <!--
  <UTooltip v-if="isMobile" text="Back">
    <UButton
      icon="ph:arrow-left"
      color="neutral"
      variant="ghost"
      aria-label="Back"
      @click="router.back()"
    />
  </UTooltip>
  -->

  <div class="text-lg font-medium tracking-wide dark:text-toned">
    <span v-if="mobileHeader && isMobile" v-text="mobileHeader" />

    <NuxtLink v-else to="/">Monster Buddy</NuxtLink>
  </div>
</template>
