<script lang="ts" setup>
  const colorMode = useColorMode();

  const tooltip = computed(() => {
    return colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  });
</script>

<template>
  <UTooltip :text="tooltip">
    <UColorModeButton />
  </UTooltip>
</template>
