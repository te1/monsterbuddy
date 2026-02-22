<script lang="ts" setup>
  const colorMode = useColorMode();
  const { t } = useLocale();
  const isHydrated = ref(false);

  const title = computed(() => {
    if (!isHydrated.value) return 'Toggle color mode';

    return colorMode.value === 'dark' ? t('colorMode.switchToLight') : t('colorMode.switchToDark');
  });

  onMounted(() => {
    isHydrated.value = true;
  });
</script>

<template>
  <UColorModeButton :title="title" />
</template>
