<script lang="ts" setup>
  const colorMode = useColorMode();
  const { t } = useLocale();

  const tooltip = computed(() => {
    return colorMode.value === 'dark' ? t('colorMode.switchToLight') : t('colorMode.switchToDark');
  });
</script>

<template>
  <UTooltip :text="tooltip">
    <UColorModeButton />
  </UTooltip>
</template>
